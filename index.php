<?php

require './php/db.php';
require './php/util.php';
require './php/router.php';
require './orm/index.php';
require './api/index.php';

$router = new router;
$router->routeRequest();
