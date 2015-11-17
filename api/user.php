<?php
$router->get['/home'] = function(){
    echo "hello from home";
};

$router->get['/home/#id'] = function($req){
    echo  $req['id'];
};