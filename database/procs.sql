DELIMITER //

CREATE PROCEDURE spGetPortfolioSummary(varUsername VARCHAR(50))
BEGIN
	DECLARE varUserId INT;
	DECLARE varRunningSold FLOAT;
	DECLARE varCurrentStock INT;
	DECLARE varStockCount INT;
	DECLARE varCompanyId INT;
	DECLARE varCompanyName VARCHAR(100);
	DECLARE varSymbol VARCHAR(10);
	DECLARE varLastTradePriceOnly FLOAT;
	DECLARE varTotalShares FLOAT;
	DECLARE varCostBasis FLOAT;
	DECLARE varMarketValue FLOAT;
	DECLARE varTotalGain FLOAT;
	DECLARE varReturnPct FLOAT;
	
	CREATE TEMPORARY TABLE portfolio(CompanyName VARCHAR(100), Symbol VARCHAR(10), LastTradePriceOnly FLOAT, TotalShares FLOAT, CostBasis FLOAT, MarketValue FLOAT, TotalGain FLOAT, ReturnPct FLOAT);
	CREATE TEMPORARY TABLE stocks(CompanyId INT);
	
	SELECT u.Id INTO varUserId FROM User u WHERE u.UserName=varUsername;
    INSERT INTO stocks SELECT DISTINCT t.CompanyId FROM transaction t WHERE t.UserId=varUserId;
	SELECT COUNT(*) INTO varStockCount FROM stocks;
	
	IF varStockCount > 0 THEN BEGIN
		DECLARE stocks_csr CURSOR FOR SELECT CompanyId FROM stocks;
		OPEN stocks_csr;
	
		SET varCurrentStock = 1;
		WHILE varCurrentStock <= varStockCount DO
			SET varTotalShares = 0;
			SET varCostBasis = 0;
			FETCH stocks_csr INTO varCompanyId;
			SELECT c.CompanyName, c.Symbol, c.LastTradePriceOnly INTO varCompanyName, varSymbol, varLastTradePriceOnly FROM Company c WHERE c.Id=varCompanyId; 
			SELECT SUM(t.Shares) INTO varRunningSold FROM Transaction t WHERE t.UserId=varUserId AND t.CompanyId=varCompanyId AND t.TransactionType=0;
			
			IF varRunningSold > 0 THEN BEGIN
				DECLARE varXactCount INT;
				DECLARE varCurrentXact INT;
				DECLARE varCurrentShares FLOAT;
				DECLARE varCurrentPrice FLOAT;
				DECLARE xact_csr CURSOR FOR SELECT t.Shares, t.Price FROM Transaction t WHERE t.UserId=varUserId AND t.CompanyId=varCompanyId AND t.TransactionType=1 ORDER BY t.TransactionDate;
				
				SELECT COUNT(*) INTO varXactCount FROM Transaction t WHERE t.UserId=varUserId AND t.CompanyId=varCompanyId AND t.TransactionType=1;
				
				OPEN xact_csr;
				
				SET varCurrentXact = 1;
				WHILE varCurrentXact <= varXactCount DO
					FETCH xact_csr INTO varCurrentShares, varCurrentPrice;
					IF varRunningSold >= varCurrentShares THEN SET varRunningSold = varRunningSold - varCurrentShares;
					ELSE
						IF varRunningSold > 0 THEN
							SET varCurrentShares = varCurrentShares - varRunningSold;
							SET varRunningSold = 0;
						END IF;
						SET varTotalShares = varTotalShares + varCurrentShares;
						SET varCostBasis = varCostBasis + (varCurrentShares * varCurrentPrice);
					END IF;
					SET varCurrentXact = varCurrentXact + 1;
				END WHILE;
				
				CLOSE xact_csr;
			END; END IF;
			
			SET varMarketValue = varLastTradePriceOnly * varTotalShares;
			SET varTotalGain = varMarketValue - varCostBasis;
			SET varReturnPct = varMarketValue / varCostBasis * 100;
			INSERT INTO portfolio(CompanyName, Symbol, LastTradePriceOnly, TotalShares, CostBasis, MarketValue, TotalGain, ReturnPct) VALUES (varCompanyName, varSymbol, varLastTradePriceOnly, varTotalShares, varCostBasis, varMarketValue, varTotalGain, varReturnPct);
			SET varCurrentStock = varCurrentStock + 1;
		END WHILE;
	
		CLOSE stocks_csr;
	END; END IF;
	
	SELECT * FROM portfolio;
END//

CREATE PROCEDURE spGetTransactionsPaged(varUsername VARCHAR(50), varPageSize INT, varPageNum INT)
BEGIN
	DECLARE varUserId INT;
	DECLARE varOffset INT;
	
	SELECT u.Id INTO varUserId FROM User u WHERE u.UserName=varUsername;
	
	SET varOffset = (varPageNum - 1) * varPageSize;
	SELECT c.CompanyName, c.Symbol, t.TransactionType, t.TransactionDate, t.Shares, t.Price FROM Transaction t INNER JOIN Company c ON c.Id=t.CompanyId WHERE t.UserId=varUserId ORDER BY t.TransactionDate, t.Id LIMIT varPageSize OFFSET varOffset;
	
END//

CREATE PROCEDURE spInsertOrUpdateCompany(varSymbol VARCHAR(10),
	varAverageDailyVolume INT(10) UNSIGNED,
	varDayChange FLOAT,
	varDaysLow FLOAT,
	varDaysHigh FLOAT,
	varYearLow FLOAT,
	varYearHigh FLOAT,
	varMarketCapitalization VARCHAR(10),
	varLastTradePriceOnly FLOAT,
	varCompanyName VARCHAR(100),
	varVolume INT(11),
	varStockExchange CHAR(3),
	varLastUpdated DATE)
BEGIN
	DECLARE varCompanyId INT;
	
	SELECT c.Id INTO varCompanyId FROM Company c WHERE c.Symbol=varSymbol;
	
	IF varCompanyId > 0 THEN
		UPDATE Company SET
			AverageDailyVolume=varAverageDailyVolume,
			DayChange=varDayChange,
			DaysLow=varDaysLow,
			DaysHigh=varDaysHigh,
			YearLow=varYearLow,
			YearHigh=varYearHigh,
			MarketCapitalization=varMarketCapitalization,
			LastTradePriceOnly=varLastTradePriceOnly,
			CompanyName=varCompanyName,
			Volume=varVolume,
			StockExchange=varStockExchange,
			LastUpdated=varLastUpdated
		WHERE Id=varCompanyId;
	ELSE
		INSERT INTO Company (Symbol, AverageDailyVolume, DayChange, DaysLow, DaysHigh, YearLow, YearHigh, MarketCapitalization, LastTradePriceOnly, CompanyName, Volume, StockExchange, LastUpdated, Active)
		VALUES (varSymbol, varAverageDailyVolume, varDayChange, varDaysLow, varDaysHigh, varYearLow, varYearHigh, varMarketCapitalization, varLastTradePriceOnly, varCompanyName, varVolume, varStockExchange, varLastUpdated, 1);
	END IF;
	
END//

DELIMITER ;