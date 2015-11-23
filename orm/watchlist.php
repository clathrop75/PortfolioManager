<?php
class watchList{
    private $id;
    private $userId;
    private $watchListName;

    private function __construct($id, $userId, $watchlistName){
        $this->id = $id;
        $this->userId = $userId;
        $this->watchListName = $watchlistName;
    }

    private function update(){
        $db = new db;
        return $db->query("update watchlist w set w.UserId = '$this->userId', w.WatchListName = '$this->watchListName' where w.Id = '$this->id'");
    }

    public static function create($userId, $watchListName){
        $db = new db;
        $sanitizedArray = sanitize($userId, $watchListName);
        $result = $db->query("insert into WatchList values(0, '$sanitizedArray[0]', '$sanitizedArray[1]')");
        if($result){
            $watchList = self::getByUserIdWatchListName($userId, $watchListName);
            return $watchList;
        }
        return $result;
    }

    public static function getByUserIdWatchListName($userId, $watchListName){
        $db = new db;
        $result = $db->query("select * from WatchList w where w.UserId = '$userId' and w.WatchListName = '$watchListName'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new watchlist($result['Id'], $result['UserId'], $result['WatchListName']);
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select * from watchlist w where w.id = '$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new watchlist($result['Id'], $result['UserId'], $result['WatchListName']);
    }

    public static function getByUserId($userId){
        $db = new db;
        $result = $db->query("select * from watchlist w where w.UserId = '$userId'");

        if($result->num_rows == 0){
            return 0;
        }
        $watchLists = array();

        while($row = $result->fetch_assoc()){
            $watchLists[] = new watchlist($row['Id'], $row['UserId'], $row['WatchListName']);
        }

        return $watchLists;
    }

    public function id(){
        return $this->id;
    }

    public function getUserId(){
        return $this->userId;
    }

    public function getWatchListName(){
        return $this->watchListName;
    }

    public function setWatchListName($newName){
        $sanitized = sanitize($newName);
        $watchListName = $this->watchListName;
        $this->watchListName = $sanitized[0];
        $result = $this->update();

        if($result){
            return $result;
        }
        $this->watchListName = $watchListName;
        return $result;
    }

}
