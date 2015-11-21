<?php

class db{
    //set these to whatever you need to connect to your database
    private $host = "localhost:8889";
    private $username = "root";
    private $password = "root";
    private $db = "portfolioManager";

    public function connect(){
        $conn = mysqli_connect($this->host, $this->username, $this->password, $this->db);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
            return 0;
        }
        return $conn;
    }

    public function query($sql){
        $connection = $this->connect();
        $result = $connection->query($sql);

        mysqli_close($connection);
        return $result;
    }
};

