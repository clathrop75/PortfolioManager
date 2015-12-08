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
    $router->get['/company'] = function(){
        readfile('./webroot/company.html');
        die();
    };    
    $router->get['/analyze'] = function(){
        readfile('./webroot/analyze.html');
        die();
    };
    $router->get['/settings'] = function(){
        readfile('./webroot/settings.html');
        die();
    };