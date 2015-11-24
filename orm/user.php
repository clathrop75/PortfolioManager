<?php
class user extends orm{
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

    public static function getByEmail($email){
        $db = new db;
        $result = $db->query("select s.Id, s.UserName, s.LastName, s.FirstName, s.Email from user s where s.Email ='$email'");

        if($result->num_rows == 0){
            return 0;
        }
        $result = $result->fetch_assoc();

        return new user($result['Id'], $result['UserName'], $result['LastName'], $result['FirstName'], $result['Email']);
    }

    public static function create($username, $lName, $fName, $email){
        $db = new db;
        $sanitizedArray = sanitize([$username, $lName, $fName, $email]);
        return $db->query("insert into user (UserName, FirstName, LastName, Email) values('$sanitizedArray[0]', '$sanitizedArray[1]', '$sanitizedArray[2]', '$sanitizedArray[3]')");
    }

    protected function update(){
        $db = new db;
        return $db->query("update user s set s.UserName='$this->username', s.LastName='$this->lName', s.FirstName='$this->fName', s.Email='$this->email' where s.Id = '$this->id'");
    }

    public function getId(){
        return $this->id;
    }

    public function getUserName(){
        return $this->username;
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
        return $this->updateHelper($newName, $this->fName);
    }

    public function setLastName($newLName){
        return $this->updateHelper($newLName, $this->lName);
    }

    public function setFirstName($newFName){
        return $this->updateHelper($newFName, $this->fName);
    }

    public function setEmail($newEmail){
        return $this->updateHelper($newEmail, $this->email);
    }
}
