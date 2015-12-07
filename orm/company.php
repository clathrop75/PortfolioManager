<?php
class company extends orm{
    private $symbol;
	private $sector;
	private $industry;
    private $averageDailyVolume;
    private $dayChange;
    private $daysLow;
    private $daysHigh;
    private $yearLow;
    private $yearHigh;
    private $marketCapitalization;
    private $lastTradePrice;
    private $companyName;
    private $volume;
    private $stockExchange;
    private $lastUpdated;
    private $active;

    private function __construct($id, $symbol, $sector, $industry, $averageDailyVolume, $dayChange, $daysLow,
                                 $daysHigh, $yearLow, $yearHigh, $marketCapitalization, $lastTradePrice,
                                 $companyName, $volume, $stockExchange, $lastUpdated, $active){
        $this->id = $id;
        $this->symbol = $symbol;
		$this->sector = $sector;
		$this->industry = $industry;
        $this->averageDailyVolume = $averageDailyVolume;
        $this->dayChange = $dayChange;
        $this->daysLow = $daysLow;
        $this->daysHigh = $daysHigh;
        $this->yearLow = $yearLow;
        $this->yearHigh = $yearHigh;
        $this->marketCapitalization = $marketCapitalization;
        $this->lastTradePrice = $lastTradePrice;
        $this->companyName = $companyName;
        $this->volume = $volume;
        $this->stockExchange = $stockExchange;
        $this->lastUpdated = $lastUpdated;
        $this->active = $active;
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select c.Id, c.Symbol, s.Sector, i.Industry, c.AverageDailyVolume, c.DayChange, c.DaysLow, c.DaysHigh, c.YearLow, c.YearHigh, c.MarketCapitalization, c.LastTradePriceOnly, c.CompanyName, c.Volume, c.StockExchange, c.LastUpdated, c.Active from company c LEFT JOIN sector s ON s.Id=c.SectorId LEFT JOIN industry i ON i.Id=c.IndustryId where c.id ='$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new company($result['Id'], $result['Symbol'], $result['Sector'], $result['Industry'], $result['AverageDailyVolume'], $result['DayChange'], $result['DaysLow'], $result['DaysHigh'], $result['YearLow'], $result['YearHigh'], $result['MarketCapitalization'], $result['LastTradePriceOnly'], $result['CompanyName'], $result['Volume'], $result['StockExchange'], $result['LastUpdated'], $result['Active']);
    }

    public static function getBySymbol($symbol){
        $db = new db;
        $sanitized = sanitize([$symbol]);
        $result = $db->query("select c.id, c.symbol, s.Sector, i.Industry, c.AverageDailyVolume, c.DayChange, c.DaysLow, c.DaysHigh, c.YearLow, c.YearHigh, c.marketcapitalization, c.lasttradepriceonly, c.companyname, c.volume, c.stockexchange, c.lastupdated, c.active from company c, sector s, industry i where c.Symbol = '$sanitized[0]' AND s.Id=c.SectorId AND i.Id=c.IndustryId");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();
        return new company($result['id'], $result['symbol'], $result['Sector'], $result['Industry'], $result['AverageDailyVolume'], $result['DayChange'], $result['DaysLow'], $result['DaysHigh'], $result['YearLow'], $result['YearHigh'], $result['marketcapitalization'], $result['lasttradepriceonly'], $result['companyname'], $result['volume'], $result['stockexchange'], $result['lastupdated'], $result['active']);
    }

    public static function getCompanies(){
        $db = new db;
        $result = $db->query("select c.id, c.symbol, s.Sector, i.Industry, c.AverageDailyVolume, c.DayChange, c.DaysLow, c.DaysHigh, c.YearLow, c.YearHigh, c.marketcapitalization, c.lasttradepriceonly, c.companyname, c.volume, c.stockexchange, c.lastupdated, c.active from company c, sector s, industry i where s.Id=c.SectorId AND i.Id=c.IndustryId");

        if($result->num_rows == 0){
            return 0;
        }

        $companiesList = array();
        while ($row = $result->fetch_assoc()) {
            $company = new company($row['id'], $row['symbol'], $row['Sector'], $row['Industry'], $row['AverageDailyVolume'], $row['DayChange'], $row['DaysLow'], $row['DaysHigh'], $row['YearLow'], $row['YearHigh'], $row['marketcapitalization'], $row['lasttradepriceonly'], $row['companyname'], $row['volume'], $row['stockexchange'], $row['lastupdated'], $row['active']);
            $companiesList[] = $company;
        }

        return $companiesList;
    }

    public function getId(){
        return $this->id;
    }
    public function getSymbol(){
        return $this->symbol;
    }
	public function getSector(){
        return $this->sector;
    }
	public function getIndustry(){
        return $this->industry;
    }
    public function getAverageDailyVolume(){
        return $this->averageDailyVolume;
    }
    public function getDayChange(){
        return $this->dayChange;
    }
    public function getDaysLow(){
        return $this->daysLow;
    }
    public function getDaysHigh(){
        return $this->daysHigh;
    }
    public function getYearHigh(){
        return $this->yearHigh;
    }
    public function getYearLow(){
        return $this->yearLow;
    }
    public function getMarketCapitalization(){
        return $this->marketCapitalization;
    }
    public function getVolume(){
        return $this->volume;
    }
    public function getLastTradePriceOnly(){
        return $this->lastTradePrice;
    }
    public function getCompanyName(){
        return $this->companyName;
    }
    public function getStockExchange(){
        return $this->stockExchange;
    }
    public function getLastUpdated(){
        return $this->lastUpdated;
    }
    public function getActive(){
        return $this->active;
    }
	public function update(){
        // does nothing
    }
}
