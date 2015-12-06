<?php
class analyzeEarningsYield extends orm{
	private $companyId;
	private $companyName;
	private $symbol;
	private $earningsYield;

    private function __construct($companyId, $companyName, $symbol, $earningsYield){
        $this->companyId = $companyId;
		$this->companyName = $companyName;
        $this->symbol = $symbol;
		$this->earningsYield = $earningsYield;
    }

	public static function getList(){
        $db = new db;
		$result = $db->query("SELECT k.CompanyId, c.CompanyName, c.Symbol, k.EarningsYield FROM keystats k INNER JOIN company c ON c.Id=k.CompanyId ORDER BY EarningsYield DESC LIMIT 250");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeEarningsYield($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['EarningsYield']);
        }

        return $items;
    }
	
    public static function getByYearList($year){
        $db = new db;
			$result = $db->query("SELECT k.CompanyId, c.CompanyName, c.Symbol, k.EarningsYield FROM keystats k INNER JOIN company c ON c.Id=k.CompanyId ORDER BY EarningsYield DESC LIMIT 250");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeEarningsYield($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['EarningsYield']);
        }

        return $items;
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
	
	protected function update(){
		//Does nothing required by abstract class orm
	}
}