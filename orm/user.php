<?php
class user{
    private $id;
    private $username;
    private $lName;
    private $fName;
    private $email;

    private function __construct($id, $username, $lName, $fName, $email){
        $this->id = $id;
        $this->username = $username;
        $this->lName = $lName;
        $this->fName = $fName;
        $this->email = $email;
    }

    public static function getById($id){
        $db = new db;
        $result = $db->query("select s.Id, s.UserName, s.LastName, s.FirstName, s.Email from user s where s.id ='$id'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new user($result['Id'], $result['UserName'], $result['LastName'], $result['FirstName'], $result['Email']);
    }

    public static function createUser($username, $lName, $fName, $email){
        $db = new db;
        //need to sanitize inputs here
        return $db->query("insert into user (UserName, FirstName, LastName, Email) values('$username', '$lName', '$fName', '$email')");
    }

    public function update(){
        $db = new db;
        //need to sanitize inputs here or before setting them
        return $db->query("update user s set s.Id = '$this->id', s.UserName='$this->username', s.LastName='$this->lName', s.FirstName='$this->fName', s.Email='$this->email'");
    }

    public function getId(){
        return $this->id;
    }

    public function getUserName(){
        return $this->id;
    }

    public function getLastName(){
        return $this->lName;
    }

    public function getFirstName(){
        return $this->fName;
    }

    public function getEmail(){
        return $this->email;
    }

    public function setUserName($userName){
        $this->username = $userName;
    }

    public function setLastName($lName){
        $this->lName = $lName;
    }

    public function setFirstName($fName){
        $this->fName = $fName;
    }

    public function setEmail($email){
        $this->email = $email;
    }
}
