<?php
    $router->get['/symbols'] = function(){
        $db = new db;
        $result = $db->query("select symbol from symbol");

        if($result->num_rows == 0){
            return 0;
        }

        $list = array();
        while ($row = $result->fetch_assoc()){
            $list[] = $row['symbol'];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($list);
        die();
    };
