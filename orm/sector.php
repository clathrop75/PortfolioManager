<?php
class sector extends orm{
    private $sector;

    private function __construct($id, $sector){
        $this->id = $id;
        $this->sector = $sector;
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select * from Sector s where s.Id = '$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new sector($result['Id'], $result['Sector']);
    }

    public static function getBySector($sector){
        $db = new db;
        $result = $db->query("select * from Sector s where s.Sector = '$sector'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new sector($result['Id'], $result['Sector']);
    }
	
	public static function getAllSectors(){
        $db = new db;
        $result = $db->query("select * from Sector s ORDER BY s.Sector");

        if($result->num_rows == 0){
            return 0;
        }
        $sectors = array();

        while($row = $result->fetch_assoc()){
            $sectors[] = new sector($row['Id'], $row['Sector']);
        }

        return $sectors;
    }

    public function getId(){
        return $this->id;
    }

    public function getSector(){
        return $this->sector;
    }
	
	protected function update(){
		//Does nothing required by abstract class orm
	}
}

