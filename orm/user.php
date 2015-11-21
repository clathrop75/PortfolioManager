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

    public static function create($username, $lName, $fName, $email){
        $db = new db;
        $sanitzedArray = sanitize([$username, $lName, $fName, $email]);
        return $db->query("insert into user (UserName, FirstName, LastName, Email) values('$sanitzedArray[0]', '$sanitzedArray[1]', '$sanitzedArray[2]', '$sanitzedArray[3]')");
    }

    private function update(){
        $db = new db;
        return $db->query("update user s set s.UserName='$this->username', s.LastName='$this->lName', s.FirstName='$this->fName', s.Email='$this->email' where s.Id = '$this->id'");
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

    public function setUserName($newName){
        $sanitized = sanitize([$newName]);
        $userName = $this->username;
        $this->username = $sanitized[0];
        $result = $this->update();

        if($result){
            return $result;
        }

        $this->username = $userName;
        return $result;
    }

    public function setLastName($newLName){
        $sanitized = sanitize([$newLName]);
        $lastName = $this->lName;
        $this->lName = $sanitized[0];
        $result = $this->update();

        if($result){
            return $result;
        }

        $this->lName = $lastName;
        return $result;
    }

    public function setFirstName($newFName){
        $sanitized = sanitize([$newFName]);
        $firstName = $this->fName;
        $this->fName = $sanitized[0];
        $result = $this->update();

        if($result){
            return $result;
        }

        $this->lName = $firstName;
        return $result;
    }

    public function setEmail($newEmail){
        $sanitized = sanitize([$newEmail]);
        $email = $this->email;
        $this->email = $sanitized[0];
        $result = $this->update();

        if($result){
            return $result;
        }

        $this->email = $email;
        return $result;
    }
}
