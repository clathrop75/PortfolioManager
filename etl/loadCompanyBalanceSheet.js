var mysql = require("mysql");
var request = require("request");
var cheerio = require("cheerio");

var con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "portfolio_manager"});

var yUrlStart = "http://finance.yahoo.com/q/bs?s=";
var yUrlEnd = "+Balance+Sheet&annual";
var remaining = 0;
var sql = "";
var companies = [];
var numProcessed = 0;
var totalCount = 0;
var interval;
var lastRemaining = 0;

function closeCon() {
	con.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
	});
	process.exit(0);
}

function fixDate(date) {
	date = date.trim();
	return date.substr(date.length - 4);
}

function checkInactive() {
	if (lastRemaining == remaining)
		closeCon();
	else
		lastRemaining = remaining;
}

function fixNumber(number) {
	var multiplier = 1;
	
	number = number.trim();
	
	if (number == '-')
		return null;
	
	number = number.replace(/\,/g,"");
	
	if (number.substr(0,1) == '(' && number.substr(number.length - 1) == ')') {
		number = number.substr(1, number.length - 1);
		multiplier = -1;
	}
	
	number = parseFloat(number) * multiplier;
	
	return number/1000;
}

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query("SELECT s.Symbol, c.Id FROM symbol s INNER JOIN Company c ON s.Symbol=c.Symbol WHERE HasBalanceSheet=1", function(err, data){
	if(err) throw(err);
	
	remaining = data.length;
	totalCount = data.length;
	
	for (var i = 0; i < data.length; i++) {		
		var company = {};
		company.id = data[i].Id;
		company.symbol = data[i].Symbol;
		companies.push(company);
	}
	console.log(totalCount + " stock symbols queued for loading. Estimated time to complete: " + Math.round(totalCount*3/60) + " minutes");
});

interval = setInterval(function() {
	if (companies.length == 0) {
		clearInterval(interval);
		lastRemaining = remaining;
		console.log("Starting inactivity checks - Remaining: " + lastRemaining);
		setInterval(function() {
			checkInactive();
		}, 5000);
	}
	else {
		var comp = companies.pop();
		
		request.get(yUrlStart + comp.symbol + yUrlEnd, {timeout: 5000}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);
				var html = $("#yfncsumtab").html();
				var numYears = 0;

				$ = cheerio.load(html);
				//console.log(html.indexOf("There is no Balance Sheet data available for "));
				if (html.indexOf("There is no Balance Sheet data available for ") > 0) {
					sql = "UPDATE symbol SET HasBalanceSheet = 0 WHERE Symbol='" + comp.symbol + "'";
					con.query(sql, function(err, data){
						if(err) throw(err);
						remaining--;
					});
				}
				else {
					// Get number of years of balance sheets
					if (!isNaN(parseInt(fixDate($("td.yfnc_modtitle1").eq(1).text()))))
						numYears = 1;
					if (!isNaN(parseInt(fixDate($("td.yfnc_modtitle1").eq(2).text()))))
						numYears = 2;
					if (!isNaN(parseInt(fixDate($("td.yfnc_modtitle1").eq(3).text()))))
						numYears = 3;
					
					remaining += numYears - 1;
						
					//console.log("# Years: " + numYears);
					//console.log(fixDate($("td.yfnc_modtitle1").eq(1).text()));
					//console.log(fixDate($("td.yfnc_modtitle1").eq(2).text()));
					//console.log(parseInt(fixDate($("td.yfnc_modtitle1").eq(3).text())));
					
					for (var i = 1; i <= numYears; i++)
					{
						var j = numYears + i + 1;
						sql = "INSERT IGNORE INTO BalanceSheet(`CompanyId`, `YearEnding`, `Cash`, `ShortTermInvestments`, `NetReceivables`, `Inventory`, `OtherCurrentAssets`, `TotalCurrentAssets`, `LongTermInvestments`, ";
						sql += "`PropertyPlantEquipment`, `Goodwill`, `IntangibleAssets`, `AccumulatedAmortiztion`, `OtherAssets`, `DeferredLongTermAssetCharges`, `TotalAssets`, `AccountsPayable`, `ShortCurrentLongTermDebt`, ";
						sql += "`OtherCurrentLiabilities`, `TotalCurrentLiabilities`, `LongTermDebt`, `OtherLiabilities`, `DeferredLongTermLiabilityCharges`, `MinorityInterest`, `NegativeGoodwill`, `TotalLiabilities`, ";
						sql += "`MiscStocksOptionsWarrants`, `RedeemablePreferredStock`, `PreferredStock`, `CommonStock`, `RetainedEarnings`, `TreasuryStock`, `CapitalSurplus`, `OtherStockholderEquity`, `TotalStockholderEquity`, ";
						sql += "`NetTangibleAssets`) VALUES (";
						sql += comp.id + ", ";
						sql += fixDate($("td.yfnc_modtitle1").eq(i).text()) + ", ";
						for (k = 1; k <= 34; k++) {
							sql += fixNumber($("td ~ [align='right']").eq(j).text())
							if (k < 34)
								sql += ", ";
							else
								sql += ");";
							j += numYears;
						}
						//console.log(sql);
						con.query(sql, function(err, data){
							if(err) throw(err);
							remaining--;
						});
						/*sql += fixNumber($("td ~ [align='right']").eq(8).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(11).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(14).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(17).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(20).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(23).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(26).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(29).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(32).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(35).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(38).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(41).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(44).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(47).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(50).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(53).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(56).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(59).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(62).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(65).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(68).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(71).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(74).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(77).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(80).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(83).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(86).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(89).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(92).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(95).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(98).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(101).text()) + ", ";
						sql += fixNumber($("td ~ [align='right']").eq(104).text()) + ");";
						console.log(sql);
						con.query(sql, function(err, data){
							if(err) throw(err);
							remaining--;
						});*/
					}
					/*sql = "INSERT IGNORE INTO BalanceSheet(`CompanyId`, `YearEnding`, `Cash`, `ShortTermInvestments`, `NetReceivables`, `Inventory`, `OtherCurrentAssets`, `TotalCurrentAssets`, `LongTermInvestments`, ";
					sql += "`PropertyPlantEquipment`, `Goodwill`, `IntangibleAssets`, `AccumulatedAmortiztion`, `OtherAssets`, `DeferredLongTermAssetCharges`, `TotalAssets`, `AccountsPayable`, `ShortCurrentLongTermDebt`, ";
					sql += "`OtherCurrentLiabilities`, `TotalCurrentLiabilities`, `LongTermDebt`, `OtherLiabilities`, `DeferredLongTermLiabilityCharges`, `MinorityInterest`, `NegativeGoodwill`, `TotalLiabilities`, ";
					sql += "`MiscStocksOptionsWarrants`, `RedeemablePreferredStock`, `PreferredStock`, `CommonStock`, `RetainedEarnings`, `TreasuryStock`, `CapitalSurplus`, `OtherStockholderEquity`, `TotalStockholderEquity`, ";
					sql += "`NetTangibleAssets`) VALUES (";
					sql += comp.id + ", ";
					sql += fixDate($("td.yfnc_modtitle1").eq(2).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(6).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(9).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(12).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(15).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(18).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(21).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(24).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(27).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(30).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(33).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(36).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(39).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(42).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(45).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(48).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(51).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(54).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(57).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(60).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(63).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(66).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(69).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(72).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(75).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(78).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(81).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(84).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(87).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(90).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(93).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(96).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(99).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(102).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(105).text()) + ");";
					con.query(sql, function(err, data){
						if(err) throw(err);
						remaining--;
					});
					
					sql = "INSERT IGNORE INTO BalanceSheet(`CompanyId`, `YearEnding`, `Cash`, `ShortTermInvestments`, `NetReceivables`, `Inventory`, `OtherCurrentAssets`, `TotalCurrentAssets`, `LongTermInvestments`, ";
					sql += "`PropertyPlantEquipment`, `Goodwill`, `IntangibleAssets`, `AccumulatedAmortiztion`, `OtherAssets`, `DeferredLongTermAssetCharges`, `TotalAssets`, `AccountsPayable`, `ShortCurrentLongTermDebt`, ";
					sql += "`OtherCurrentLiabilities`, `TotalCurrentLiabilities`, `LongTermDebt`, `OtherLiabilities`, `DeferredLongTermLiabilityCharges`, `MinorityInterest`, `NegativeGoodwill`, `TotalLiabilities`, ";
					sql += "`MiscStocksOptionsWarrants`, `RedeemablePreferredStock`, `PreferredStock`, `CommonStock`, `RetainedEarnings`, `TreasuryStock`, `CapitalSurplus`, `OtherStockholderEquity`, `TotalStockholderEquity`, ";
					sql += "`NetTangibleAssets`) VALUES (";
					sql += comp.id + ", ";
					sql += fixDate($("td.yfnc_modtitle1").eq(3).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(7).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(10).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(13).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(16).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(19).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(22).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(25).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(28).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(31).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(34).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(37).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(40).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(43).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(46).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(49).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(52).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(55).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(58).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(61).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(64).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(67).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(70).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(73).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(76).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(79).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(82).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(85).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(88).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(91).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(94).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(97).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(100).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(103).text()) + ", ";
					sql += fixNumber($("td ~ [align='right']").eq(106).text()) + ");";
					con.query(sql, function(err, data){
						if(err) throw(err);
						remaining--;
					});*/
				}
					
				numProcessed++;
				if (numProcessed % 10 == 0)
					console.log(Math.round(numProcessed/totalCount*100) + "% complete");
			}
			
		});
	}
}, 3000);