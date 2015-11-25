<?php
class auth extends orm{
    private $userId;
    private $pass;
    private $salt;
    private $authCookie;
    private $authCookieExpiration;

    private function __construct($id, $userId, $pass, $salt, $authCookie, $authCookieExpiration){
        $this->id = $id;
        $this->userId = $userId;
        $this->pass = $pass;
        $this->salt = $salt;
        $this->authCookie = $authCookie;
        $this->authCookieExpiration = $authCookieExpiration;
    }


    public static function getByUserId($UserId){
        $db = new db;
        $result = $db->query("select * from auth a where a.UserId ='$UserId'");

        if($result->num_rows == 0){
            return 0;
        }

        $result = $result->fetch_assoc();

        return new auth($result['Id'], $result['UserId'], $result['Pass'], $result['Salt'], $result['AuthCookie'], $result['AuthCookieExp']);
    }

    protected function update(){
        $db = new db;
        return $db->query("update auth a set a.Pass='$this->pass', a.Salt='$this->salt', a.AuthCookie='$this->authCookie', a.AuthCookieExp='$this->authCookieExpiration' where a.Id = '$this->id'");
    }

    public function getUserId(){
        return $this->userId;
    }
    public function getPass(){
        return $this->pass;
    }
    public function getSalt(){
        return $this->salt;
    }
    public function getAuthCookie(){
        return $this->authCookie;
    }
    public function getAuthCookieExp(){
        return $this->authCookieExpiration;
    }
    public function setPass($newPass){
        return $this->updateHelper($newPass, $this->pass);
    }
    public function setSalt($newSalt){
        return $this->updateHelper($newSalt, $this->salt);
    }
    public function setAuthCookie($newAuthCookie){
        return $this->updateHelper($newAuthCookie, $this->authCookie);
    }
    public function setAuthCookieExp($newAuthCookieExp){
        return $this->updateHelper($newAuthCookieExp, $this->authCookieExpiration);
    }
}
