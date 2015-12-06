<?php
    $router->get['/portfolio'] = function(){
        readfile('./webroot/portfolio.html');
        die();
    };    
    $router->get['/transactions'] = function(){
        readfile('./webroot/transactions.html');
        die();
    };    
    $router->get['/watchlists'] = function(){
        readfile('./webroot/watchlists.html');
        die();
    };    
    $router->get['/research'] = function(){
        readfile('./webroot/research.html');
        die();
    };    
    $router->get['/analyze'] = function(){
        readfile('./webroot/analyze.html');
        die();
    };
    $router->get['/home'] = function(){
        readfile('./webroot/home.html');
        die();
    };
