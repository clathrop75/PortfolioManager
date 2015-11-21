<?php

require './php/db.php';
require './php/util.php';
require './php/router.php';
$router = new router;

require './orm/index.php';
require './api/index.php';

$router->routeRequest();
