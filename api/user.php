<?php
    $router->get['/user'] = function(){
        $u = $GLOBALS['USER'];
        $user = [
            "userName" => $u->getUserName(),
            "lastName" => $u->getLastName(),
            "firstName" => $u->getFirstName(),
            "eMail" => $u->getEmail()
        ];

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($user);
        exit();
    };


    $router->get['/logout'] = function(){
        if(isset($_COOKIE['portfolio_manager_auth_cookie'])){
            setcookie('portfolio_manager_auth_cookie',"", time()-3600);
        };
        header('location: /');
        die();
    };

    $router->get['/home/#id'] = function($req){
        echo  $req['id'];
    };

    $router->get['/watchlist'] = function(){
        readfile('./webroot/watchlist.html');
        die();
    };