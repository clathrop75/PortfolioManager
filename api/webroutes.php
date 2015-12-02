<?php
    $router->get['/portfolio'] = function(){
        readfile('./webroot/portfolio.html');
        die();
    };
