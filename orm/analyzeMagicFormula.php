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

    public static function getByUserNamePortfolio($userName){
        $db = new db;
        $result = $db->query("CALL spGetPortfolioSummary('$userName')");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new portfolio($result['Id'], $result['UserId'], $result['WatchListName']);
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
}

