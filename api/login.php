<?php
$router->get['/login'] = function(){
    readfile('./webroot/login.html');
};
