<?php
class company{
    private $id;
    private $symbol;
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

    private function __construct($id, $symbol, $averageDailyVolume, $dayChange, $daysLow, $daysHigh, $yearLow,
                                 $yearHigh, $marketCapitalization, $lastTradePrice, $companyName, $volume,
                                 $stockExchange, $lastUpdated, $active){
        $this->id = $id;
        $this->symbol = $symbol;
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
        $result = $db->query("select * from company where id ='$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new company($result['Id'], $result['Symbol'], $result['AverageDailyVolume'], $result['DayChange'], $result['DaysLow'], $result['DaysHigh'], $result['YearLow'], $result['YearHigh'], $result['MarketCapitalization'], $result['LastTradePriceOnly'], $result['CompanyName'], $result['Volume'], $result['StockExchange'], $result['LastUpdated'], $result['Active']);
    }

    public function getId(){
        return $this->id;
    }
    public function getSymbol(){
        return $this->symbol;
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
}
