<?php	
	$router->get['/company/#id'] = function($id){
		$company = company::getById($id['id']);
		
		$companyData[] = [
                "id"                   => $company->getId(),
                "companyName"          => $company->getCompanyName(),
                "symbol"               => $company->getSymbol(),
				"sector"               => $company->getSector(),
				"industry"             => $company->getIndustry(),
                "averageDailyVolume"   => $company->getAverageDailyVolume(),
                "dayChange"            => $company->getDayChange(),
                "daysLow"              => $company->getDaysLow(),
                "daysHigh"             => $company->getDaysHigh(),
                "yearLow"              => $company->getYearLow(),
                "yearHigh"             => $company->getYearHigh(),
				"marketCapitalization" => $company->getMarketCapitalization(),
                "lastTradePriceOnly"   => $company->getLastTradePriceOnly(),
                "volume"               => $company->getVolume(),
                "stockExchange"        => $company->getStockExchange()
            ];
		
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($companyData);
        die();
    };