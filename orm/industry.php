<?php
class industry extends orm{
    private $id;
    private $sectorId;
	private $industry;

    private function __construct($id, $sectorId, $industry){
        $this->id = $id;
        $this->sectorId = $sectorId;
		$this->industry = $industry;
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select * from Industry i where i.Id = '$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new industry($result['Id'], $result['SectorId'], $result['Industry']);
    }

    public static function getBySectorId($sectorId){
        $db = new db;
        $result = $db->query("select * from Industry i where i.SectorId = '$sectorId'");

        if($result->num_rows == 0){
            return 0;
        }
        $industries = array();

        while($row = $result->fetch_assoc()){
            $industries[] = new industry($row['Id'], $row['SectorId'], $result['Industry']);
        }

        return $industries;
    }
	
	public static function getByIndustry($industry){
        $db = new db;
        $result = $db->query("select * from Industry i where i.Industry = '$industry'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new industry($result['Id'], $result['SectorId'], $result['Industry']);
    }

    public function getId(){
        return $this->id;
    }

    public function getSectorId(){
        return $this->sectorId;
    }

	public function getIndustry(){
        return $this->industry;
    }
}

