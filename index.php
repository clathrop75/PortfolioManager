<?php
require './php/router.php';
$router = new router;

require './api/index.php';


$router->routeRequest();


