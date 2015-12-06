<?php
class industry extends orm{
    private $industry;

    private function __construct($id, $industry){
        $this->id = $id;
        $this->industry = $industry;
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select * from Sector s where s.Id = '$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new industry($result['Id'], $result['Industry']);
    }

    public static function getBySectorId($sectorId){
        $db = new db;
        $result = $db->query("select * from Industry i where i.SectorId = '$sectorId'");

        if($result->num_rows == 0){
            return 0;
        }
        $industries = array();

        while($row = $result->fetch_assoc()){
            $industries[] = new industry($row['Id'], $row['Industry']);
        }

        return $industries;
    }
	
	public static function getAllIndustries(){
        $db = new db;
        $result = $db->query("select * from Industry i ORDER BY i.Industry");

        if($result->num_rows == 0){
            return 0;
        }
        $industries = array();

        while($row = $result->fetch_assoc()){
            $industries[] = new industry($row['Id'], $row['Industry']);
        }

        return $industries;
    }

    public function getId(){
        return $this->id;
    }

    public function getIndustry(){
        return $this->industry;
    }
	
	protected function update(){
		//Does nothing required by abstract class orm
	}
}

