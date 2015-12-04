<?php
    $router->get['/transaction'] = function(){
        $u = $GLOBALS['USER'];
        $transactions = transaction::getByUserId($u->getId());
        $transactionArray = array();

        foreach($transactions as $transaction){
            $company = company::getById($transaction->getCompanyId());
            $transactionArray[] = [
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

        $result = transaction::create($company->getId(), $u->getId(), $transaction['type'], $transaction['date'], $transaction['shares'], $transaction['price'], $transaction['commission'], $transaction['notes']);

        header('HTTP/1.1 200');
        die();;
    };