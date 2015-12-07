<?php
    $router->get['/industry/#id'] = function($id){
        $items = industry::getBySectorId($id['id']);
		
		foreach($items as $item){
			$industryList[] = [
				"id"     => $item->getId(),
				"industry" => $item->getIndustry()
			];
		}

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($industryList);
        die();
    };
	
	$router->get['/industry'] = function(){
        $items = industry::getAllIndustries();
		


        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($items);
        die();
    };