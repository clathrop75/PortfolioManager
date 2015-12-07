<?php
    $router->get['/symbol'] = function(){
        $items = symbol::getSymbols();
		
		foreach($items as $item){
			$symbolList[] = [
				"id"     => $item->getId(),
				"symbol" => $item->getSymbol(),
				"companyName" => $item->getCompanyName()
			];
		}

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($symbolList);
        die();
    };