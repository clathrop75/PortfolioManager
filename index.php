<?php
require './php/router.php';
$router = new router;

require './orm/index.php';
require './api/index.php';

$router->routeRequest();


