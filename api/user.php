<?php
$router->get['/user'] = function(){
    $user = json_decode('{
        "user": {
            "username": "testperson",
		    "firstName": "Test",
		    "lastName": "Person"
	        }
	    }');

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($user);
    exit();
};

$router->get['/home/#id'] = function($req){
    echo  $req['id'];
};