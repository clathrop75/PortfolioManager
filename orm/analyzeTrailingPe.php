<?php
class analyzeTrailingPe extends orm{
	private $companyId;
	private $companyName;
	private $symbol;
	private $trailingPe;

    private function __construct($companyId, $companyName, $symbol, $trailingPe){
        $this->companyId = $companyId;
		$this->companyName = $companyName;
        $this->symbol = $symbol;
		$this->trailingPe = $trailingPe;
    }

    public static function getList(){
        $db = new db;
			$result = $db->query("SELECT k.CompanyId, c.CompanyName, c.Symbol, k.TrailingPe FROM keystats k INNER JOIN company c ON c.Id=k.CompanyId ORDER BY TrailingPe DESC LIMIT 50");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeTrailingPe($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['TrailingPe']);
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

	public function getTrailingPe(){
        return $this->trailingPe;
    }
}

