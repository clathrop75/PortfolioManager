<?php
class symbol extends orm{
    private $symbol;
	private $companyName;

    private function __construct($id, $symbol, $companyName){
        $this->id = $id;
        $this->symbol = $symbol;
		$this->companyName = $companyName;
    }
	
	public static function getSymbols(){
        $db = new db;
        $result = $db->query("select c.id, c.symbol, c.companyname from company c order by c.symbol");

        if($result->num_rows == 0){
            return 0;
        }

        $symbolList = array();
        while ($row = $result->fetch_assoc()) {
            $symbol = new symbol($row['id'], $row['symbol'], $row['companyname']);
            $symbolList[] = $symbol;
        }

        return $symbolList;
    }

    public function getId(){
        return $this->id;
    }
	
    public function getSymbol(){
        return $this->symbol;
    }
	
    public function getCompanyName(){
        return $this->companyName;
    }
	
	public function update() {
		// Does nothing - included only due to requirement of abstract class orm
	}
}
