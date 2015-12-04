<?php
class analyzeMagicFormula extends orm{
    private $combinedRank;
	private $eyRank;
	private $rocRank;
	private $companyId;
	private $companyName;
	private $symbol;
	private $earningsYield;
	private $returnOnAssets;

    private function __construct($combinedRank, $eyRank, $rocRank, $companyId, $companyName, $symbol, $earningsYield, $returnOnAssets){
        $this->combinedRank = $combinedRank;
        $this->eyRank = $eyRank;
        $this->rocRank = $rocRank;
		$this->companyId = $companyId;
		$this->companyName = $companyName;
        $this->symbol = $symbol;
        $this->earningsYield = $earningsYield;
		$this->returnOnAssets = $returnOnAssets;
    }

	public static function getList(){
        $db = new db;
        $result = $db->query("CALL spGetMagicFormulaList()");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeMagicFormula($row['CombinedRank'], $row['EyRank'], $row['RocRank'], $row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['EarningsYield'], $row['ReturnOnAssets']);
        }

        return $items;
    }
	
    public static function getByYearList($year){
        $db = new db;
        $result = $db->query("CALL spGetMagicFormulaListHistory('$year')");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeMagicFormula($row['CombinedRank'], $row['EyRank'], $row['RocRank'], $row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['EarningsYield'], $row['ReturnOnAssets']);
        }

        return $items;
    }

    public function getCombinedRank(){
        return $this->combinedRank;
    }

    public function getEyRank(){
        return $this->eyRank;
    }

    public function getRocRank(){
        return $this->rocRank;
    }

	public function getCompanyId(){
        return $this->companyId;
    }
	
	public function getCompanyName(){
        return $this->companyName;
    }

    public function getSymbol(){
        return $this->symbol;
    }

    public function getEarningsYield(){
        return $this->earningsYield;
    }

	public function getReturnOnCapital(){
        return $this->returnOnCapital;
    }
}

