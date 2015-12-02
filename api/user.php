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
    print json_encode($user);
    exit();
};

$router->get['/home/#id'] = function($req){
    echo  $req['id'];
};

$router->get['/watchlist'] = function(){
    readfile('./webroot/watchlist.html');
    die();
};