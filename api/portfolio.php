<?php
    $router->get['/summary'] = function(){
        $u = $GLOBALS['USER'];
        $items = portfolio::getByUserId($u->getId());
        $transactionArray = array();

        foreach($items as $item){
            $transactionArray[] = [
                "id"                 => $item->getId(),
                "companyName"        => $item->getCompanyName(),
                "symbol"             => $item->getSymbol(),
                "lastTradePriceOnly" => $item->getLastTradePriceOnly(),
                "totalShares"        => $item->getTotalShares(),
                "costBasis"          => $item->getCostBasis(),
                "marketValue"        => $item->getMarketValue(),
                "totalGain"          => $item->getTotalGain(),
                "returnPercent"      => $item->getReturnPercent()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($transactionArray);
        exit();
    };