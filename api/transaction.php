<?php
    $router->get['/transaction'] = function(){
        $u = $GLOBALS['USER'];
        $transactions = transaction::getByUserId($u->getId());
        $transactionArray = array();

        foreach($transactions as $transaction){
            $company = company::getById($transaction->getCompanyId());
            $transactionArray[] = [
                "id"          => $transaction->getId(),
                "companyName" => $company->getCompanyName(),
                "symbol"      => $company->getSymbol(),
                "type"        => $transaction->getTransactionType(),
                "date"        => $transaction->getTransactionDate(),
                "shares"      => $transaction->getShares(),
                "price"       => $transaction->getPrice(),
                "commission"  => $transaction->getCommission(),
                "notes"       => $transaction->getNotes()
            ];
        }


        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($transactionArray);
        exit();
    };

    $router->post['/transaction'] = function(){
        $u = $GLOBALS['USER'];
        $transaction = $_REQUEST['newTransaction'];

        $company = company::getBySymbol($transaction['symbol']);

        $transaction = transaction::create($company->getId(), $u->getId(), $transaction['type'], $transaction['date'], $transaction['shares'], $transaction['price'], $transaction['commission'], $transaction['notes']);

        $newTransaction[] = [
            "id"          => $transaction->getId(),
            "companyName" => $company->getCompanyName(),
            "symbol"      => $company->getSymbol(),
            "type"        => $transaction->getTransactionType(),
            "date"        => $transaction->getTransactionDate(),
            "shares"      => $transaction->getShares(),
            "price"       => $transaction->getPrice(),
            "commission"  => $transaction->getCommission(),
            "notes"       => $transaction->getNotes()
        ];


        header('HTTP/1.1 200');
        header('Content-type: application/json');

        print json_encode($newTransaction);
        die();;
    };

    $router->delete['/transaction/#id'] = function($id){
        $result = transaction::deleteById($id);

        if($result){
            header('HTTP/1.1 200');
        }else{
            header('HTTP/1.1 500');
        }

        die();
    };