<?php
    $router->get['/portfolio'] = function(){
        readfile('./webroot/portfolio.html');
        die();
    };    
    $router->get['/transactions'] = function(){
        readfile('./webroot/transactions.html');
        die();
    };
