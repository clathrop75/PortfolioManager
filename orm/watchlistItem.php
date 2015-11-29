<?php
class watchListItem extends orm{
    private $watchlistId;
    private $companyId;
    private $notes;

    private function __construct($id, $watchlistId, $companyId, $notes){
        $this->id = $id;
        $this->watchlistId = $watchlistId;
        $this->companyId = $companyId;
        $this->notes = $notes;
    }

    public static function create($watchlistId, $companyId, $notes){
        $db = new db;
        $sanitizedArray = sanitize([$watchlistId, $companyId, $notes]);
        $result = $db->query("insert into watchlistitems values(0, '$sanitizedArray[0]', '$sanitizedArray[1]', '$sanitizedArray[2]')");
        if($result){
            $watchList = self::getByWatchListItemIdCompanyId($watchlistId, $companyId);
            return $watchList;
        }
        return $result;
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select * from watchlistitems w where w.Id = '$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();
        return new watchListItem($result['Id'], $result['WatchListId'], $result['CompanyId'], $result['Notes']);
    }

    private static function getByWatchListItemIdCompanyId($watchlistId, $companyId){
        $db = new db;
        $result =  $db->query("select * from watchlistitems w where w.WatchListId = '$watchlistId' and w.CompanyId = '$companyId'");
        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();
        return new watchListItem($result['Id'], $result['WatchListId'], $result['CompanyId'], $result['Notes']);
    }

    protected function update(){
        $db = new db;
        return $db->query("update watchlistitems w set w.WatchListId = '$this->watchlistId', w.CompanyId = '$this->companyId', w.Notes = '$this->notes' where w.Id = '$this->id'");
    }

    public function getId(){
        return $this->id;
    }

    public function getWatchListId(){
        return $this->watchlistId;
    }

    public function getCompanyId(){
        return $this->companyId;
    }

    public function getNotes(){
        return $this->notes;
    }

    public function setWatchlistId($newWatchListId){
        return $this->updateHelper($newWatchListId, $this->watchlistId);
    }

    public function setCompanyId($newCompanyId){
        return $this->updateHelper($newCompanyId, $this->companyId);
    }

    public function setNotes($newNotes){
        return $this->updateHelper($newNotes, $this->companyId);
    }
}
