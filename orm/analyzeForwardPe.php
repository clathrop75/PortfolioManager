<?php
class analyzeForwardPe extends orm{
	private $companyId;
	private $companyName;
	private $symbol;
	private $forwardPe;

    private function __construct($companyId, $companyName, $symbol, $forwardPe){
        $this->companyId = $companyId;
		$this->companyName = $companyName;
        $this->symbol = $symbol;
		$this->forwardPe = $forwardPe;
    }

    public static function getList(){
        $db = new db;
			$result = $db->query("SELECT k.CompanyId, c.CompanyName, c.Symbol, k.ForwardPe FROM keystats k INNER JOIN company c ON c.Id=k.CompanyId ORDER BY ForwardPe DESC LIMIT 250");

        if($result->num_rows == 0){
            return 0;
        }
        $items = array();

        while($row = $result->fetch_assoc()){
            $items[] = new analyzeForwardPe($row['CompanyId'], $row['CompanyName'], $row['Symbol'], $row['ForwardPe']);
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

	public function getForwardPe(){
        return $this->forwardPe;
    }
	
	protected function update(){
		//Does nothing required by abstract class orm
	}
}

