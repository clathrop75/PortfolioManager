<?php
	$router->get['/history/#id'] = function($id){
        $items = history::getByCompanyId($id['id']);
		
		foreach($items as $item){
			$historyData[] = [
				"id"               => $item->getId(),
				"companyId"        => $item->getCompanyId(),
				"historyDate"      => $item->getHistoryDate(),
				"open"             => $item->getOpen(),
				"close"            => $item->getClose(),
				"high"             => $item->getHigh(),
				"low"              => $item->getLow(),
				"volume"           => $item->getVolume(),
				"adjustedClose"    => $item->getAdjustedClose(),
				"marketCapAtClose" => $item->getMarketCapAtClose()
			];
		}

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($historyData);
        die();
    };