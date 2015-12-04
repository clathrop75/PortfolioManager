<?php
class analyzeReturnOnAssets extends orm{
	private $companyId;
	private $companyName;
	private $symbol;
	private $returnOnAssets;

    private function __construct($companyId, $companyName, $symbol, $returnOnAssets){
        $this->companyId = $companyId;
		$this->companyName = $companyName;
        $this->symbol = $symbol;
		$this->returnOnAssets = $returnOnAssets;
    }
	
	public static function getList(){
        $db = new db;
		$result = $db->query("SELECT k.CompanyId, c.CompanyName, c.Symbol, k.ReturnOnAssets FROM keystats k INNER JOIN company c ON c.Id=k.CompanyId ORDER BY ReturnOnAssets DESC LIMIT 50");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeReturnOnAssets($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['ReturnOnAssets']);
        }

        return $items;
    }

    public static function getByYearList($year){
        $db = new db;
		$result = $db->query("SELECT c.Id, c.CompanyName, c.Symbol, i.Ebitda, b.TotalAssets, (i.Ebitda/b.TotalAssets) AS ReturnOnAssets FROM company c INNER JOIN incomestatement i ON c.Id=i.CompanyId INNER JOIN balancesheet b ON i.Id=b.CompanyId WHERE i.YearEnding=$year AND b.YearEnding=$year ORDER BY (i.Ebitda/b.TotalAssets) DESC LIMIT 50");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeReturnOnAssets($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['ReturnOnAssets']);
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

	public function getReturnOnAssets(){
        return $this->returnOnAssets;
    }
}

