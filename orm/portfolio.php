<?php
class portfolio extends orm{
    private $companyName;
	private $symbol;
	private $lastTradePriceOnly;
	private $totalShares;
	private $costBasis;
	private $marketValue;
	private $totalGain;
	private $returnPercent;

    private function __construct($companyName, $symbol, $lastTradePriceOnly, $totalShares, $costBasis, $marketValue, $totalGain, $returnPercent){
        $this->companyName = $companyName;
        $this->symbol = $symbol;
        $this->lastTradePriceOnly = $lastTradePriceOnly;
		$this->totalShares = $totalShares;
		$this->costBasis = $costBasis;
        $this->marketValue = $marketValue;
        $this->totalGain = $totalGain;
		$this->returnPercent = $returnPercent;
    }

    public static function getByUserId($userId){
        $db = new db;
        $result = $db->query("CALL spGetPortfolioSummary('$userId')");

        if($result->num_rows == 0){
            return 0;
        }
		$items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new portfolio($row['CompanyName'], $row['Symbol'], $row['LastTradePriceOnly'], $row['TotalShares'], $row['CostBasis'], $row['MarketValue'], $row['TotalGain'], $row['ReturnPct']);
        }

        return $items;
    }

    public function getCompanyName(){
        return $this->companyName;
    }

    public function getSymbol(){
        return $this->symbol;
    }

    public function getLastTradePriceOnly(){
        return $this->lastTradePriceOnly;
    }

	public function getTotalShares(){
        return $this->totalShares;
    }
	
	public function getCostBasis(){
        return $this->costBasis;
    }

    public function getMarketValue(){
        return $this->marketValue;
    }

    public function getTotalGain(){
        return $this->totalGain;
    }

	public function getReturnPercent(){
        return $this->returnPercent;
    }
	
	public function update(){
		// does nothing
	}
}
