<?php
    $router->get['/sector'] = function(){
        $items = sector::getAllSectors();
		
		foreach($items as $item){
			$sectorList[] = [
				"id"     => $item->getId(),
				"sector" => $item->getSector()
			];
		}

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($sectorList);
        die();
    };