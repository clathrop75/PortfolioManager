<?php

function sanitize($array){
    $db = new db;
    $conn = $db->connect();
    $returnArray = array();
    foreach($array as $string){
         $returnArray[] = mysqli_real_escape_string($conn, $string);
    }
    mysqli_close($conn);
    return $returnArray;
}