<?php
class analyzeReturnOnEquity extends orm{
	private $companyId;
	private $companyName;
	private $symbol;
	private $returnOnEquity;

    private function __construct($companyId, $companyName, $symbol, $returnOnEquity){
        $this->companyId = $companyId;
		$this->companyName = $companyName;
        $this->symbol = $symbol;
		$this->returnOnEquity = $returnOnEquity;
    }
	
	public static function getList(){
        $db = new db;
		$result = $db->query("SELECT k.CompanyId, c.CompanyName, c.Symbol, k.ReturnOnEquity FROM keystats k INNER JOIN company c ON c.Id=k.CompanyId ORDER BY ReturnOnEquity DESC LIMIT 250");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeReturnOnEquity($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['ReturnOnEquity']);
        }

        return $items;
    }

    public static function getByYearList($year){
        $db = new db;
		$result = $db->query("SELECT c.Id, c.CompanyName, c.Symbol, i.Ebitda, b.TotalStockholderEquity, (i.Ebitda/b.TotalStockholderEquity) AS ReturnOnEquity FROM company c INNER JOIN incomestatement i ON c.Id=i.CompanyId INNER JOIN balancesheet b ON i.Id=b.CompanyId WHERE i.YearEnding=$year AND b.YearEnding=$year ORDER BY (i.Ebitda/b.TotalStockholderEquity) DESC LIMIT 250");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeReturnOnEquity($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['ReturnOnEquity']);
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

	public function getReturnOnEquity(){
        return $this->returnOnEquity;
    }
	
	protected function update(){
		//Does nothing required by abstract class orm
	}
}

