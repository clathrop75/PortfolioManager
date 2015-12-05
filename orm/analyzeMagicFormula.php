<?php
class analyzeMagicFormula extends orm{
    private $combinedRank;
	private $eyRank;
	private $roaRank;
	private $companyId;
	private $companyName;
	private $symbol;
	private $earningsYield;
	private $returnOnAssets;

    private function __construct($combinedRank, $eyRank, $roaRank, $companyId, $companyName, $symbol, $earningsYield, $returnOnAssets){
        $this->combinedRank = $combinedRank;
        $this->eyRank = $eyRank;
        $this->roaRank = $roaRank;
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
            $items[] = new analyzeMagicFormula($row['CombinedRank'], $row['EyRank'], $row['RoaRank'], $row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['EarningsYield'], $row['ReturnOnAssets']);
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
            $items[] = new analyzeMagicFormula($row['CombinedRank'], $row['EyRank'], $row['RoaRank'], $row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['EarningsYield'], $row['ReturnOnAssets']);
        }

        return $items;
    }

    public function getCombinedRank(){
        return $this->combinedRank;
    }

    public function getEyRank(){
        return $this->eyRank;
    }

    public function getRoaRank(){
        return $this->roaRank;
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

	public function getReturnOnAssets(){
        return $this->returnOnAssets;
    }
}

