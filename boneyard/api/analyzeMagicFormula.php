<?php
	$router->get['/analyze/earningsyield'] = function(){
        $stocks = analyzeEarningsYield::getList();
        $stockArray = array();

        foreach($stocks as $stock){
            $stockArray[] = [
                "companyId"      => $stock->getCompanyId(),
                "companyName"    => $stock->getCompanyName(),
                "symbol"         => $stock->getSymbol(),
                "earningsYield"  => $stock->getEarningsYield()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($stockArray);
        exit();
    };
	
	$router->get['/analyze/forwardpe'] = function(){
        $stocks = analyzeForwardPe::getList();
        $stockArray = array();

        foreach($stocks as $stock){
            $stockArray[] = [
                "companyId"      => $stock->getCompanyId(),
                "companyName"    => $stock->getCompanyName(),
                "symbol"         => $stock->getSymbol(),
                "forwardPe"      => $stock->getForwardPe()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($stockArray);
        exit();
    };
	
    $router->get['/analyze/magicformula'] = function(){
        $stocks = analyzeMagicFormula::getList();
        $stockArray = array();

        foreach($stocks as $stock){
            $stockArray[] = [
                "combinedRank"   => $stock->getCombinedRank(),
                "eyRank"         => $stock->getEyRank(),
                "rocRank"        => $stock->getRoaRank(),
                "companyId"      => $stock->getCompanyId(),
                "companyName"    => $stock->getCompanyName(),
                "symbol"         => $stock->getSymbol(),
                "earningsYield"  => $stock->getEarningsYield(),
                "returnOnAssets" => $stock->getReturnOnAssets()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($stockArray);
        exit();
    };
	
	$router->get['/analyze/returnonassets'] = function(){
        $stocks = analyzeReturnOnAssets::getList();
        $stockArray = array();

        foreach($stocks as $stock){
            $stockArray[] = [
                "companyId"      => $stock->getCompanyId(),
                "companyName"    => $stock->getCompanyName(),
                "symbol"         => $stock->getSymbol(),
                "returnOnAssets" => $stock->getReturnOnAssets()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($stockArray);
        exit();
    };
	
	$router->get['/analyze/returnonequity'] = function(){
        $stocks = analyzeReturnOnEquity::getList();
        $stockArray = array();

        foreach($stocks as $stock){
            $stockArray[] = [
                "companyId"      => $stock->getCompanyId(),
                "companyName"    => $stock->getCompanyName(),
                "symbol"         => $stock->getSymbol(),
                "returnOnEquity" => $stock->getReturnOnEquity()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($stockArray);
        exit();
    };
	
	$router->get['/analyze/trailingpe'] = function(){
        $stocks = analyzeTrailingPe::getList();
        $stockArray = array();

        foreach($stocks as $stock){
            $stockArray[] = [
                "companyId"      => $stock->getCompanyId(),
                "companyName"    => $stock->getCompanyName(),
                "symbol"         => $stock->getSymbol(),
                "trailingPe"     => $stock->getTrailingPe()
            ];
        }

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($stockArray);
        exit();
    };