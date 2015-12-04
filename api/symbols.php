<?php
    $router->get['/symbols'] = function(){
        $db = new db;
        $result = $db->query("select symbol from symbol");

        if($result->num_rows == 0){
            return 0;
        }

        $list = array();
        while ($row = $result->fetch_assoc()){
            $list[] = $row['symbol'];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($list);
        die();
    };

    $router->get['/companies'] = function(){
        $companies = company::getCompanies();

        $companyList = array();
        foreach($companies as $company){
            $companyArray = [
                "id"    => $company->getId(),
                "symbol" => $company->getSymbol(),
                "sector" => $company->getSector(),
                "industry" => $company->getIndustry(),
                "averageDailyVolum" => $company->getAverageDailyVolume(),
                "dayChange" => $company->getDayChange(),
                "daysLow" => $company->getDaysLow(),
                "daysHigh" => $company->getDaysHigh(),
                "yearLow" => $company->getYearLow(),
                "yearHigh" => $company->getYearHigh(),
                "marketCapitalization" => $company->getMarketCapitalization(),
                "lastTradePrice" => $company->getLastTradePriceOnly(),
                "companyName" => $company->getCompanyName(),
                "volume" => $company->getVolume(),
                "stockExchange" => $company->getStockExchange(),
                "lastUpdated" => $company->getLastUpdated(),
                "active" => $company->getActive()
            ];

            $companyList[] = $companyArray;
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($companyList);
        die();
    };
