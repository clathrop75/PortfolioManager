<?php
class history extends orm{
    private $companyId;
	private $historyDate;
	private $open;
	private $close;
    private $high;
    private $low;
    private $volume;
    private $adjustedClose;
    private $marketCapAtClose;

    private function __construct($id, $companyId, $historyDate, $open, $close, $high, $low, $volume, $adjustedClose, $marketCapAtClose){
        $this->id = $id;
        $this->companyId = $companyId;
		$this->historyDate = $historyDate;
		$this->open = $open;
        $this->close = $close;
        $this->high = $high;
        $this->low = $low;
        $this->volume = $volume;
        $this->adjustedClose = $adjustedClose;
        $this->marketCapAtClose = $marketCapAtClose;
    }
	
	public static function getByCompanyId($id){
        $db = new db;
        $result = $db->query("select * from history h where h.CompanyId ='$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $histories = array();

        while($row = $result->fetch_assoc()){
            $histories[] = new history($row['Id'], $row['CompanyId'], $row['HistoryDate'], $row['Open'], $row['Close'], $row['High'], $row['Low'], $row['Volume'], $row['AdjustedClose'], $row['MarketCapAtClose']);
        }

        return $histories;
    }

    public function getId(){
        return $this->id;
    }
    public function getCompanyId(){
        return $this->companyId;
    }
	public function getHistoryDate(){
        return $this->historyDate;
    }
	public function getOpen(){
        return $this->open;
    }
    public function getClose(){
        return $this->close;
    }
    public function getHigh(){
        return $this->high;
    }
    public function getLow(){
        return $this->low;
    }
    public function getVolume(){
        return $this->volume;
    }
    public function getAdjustedClose(){
        return $this->adjustedClose;
    }
    public function getMarketCapAtClose(){
        return $this->marketCapAtClose;
    }
	public function update(){
        // does nothing
    }
}
