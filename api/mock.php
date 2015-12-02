<?php
$router->get['/mock/user'] = function(){
    $u = $GLOBALS['USER'];
    $user = [
        "userName" => $u->getUserName(),
        "lastName" => $u->getLastName(),
        "firstName" => $u->getFirstName(),
        "eMail" => $u->getEmail()
    ];

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($user);
    exit();
};


$router->get['/mock/transaction'] = function(){
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

$router->get['/mock/portfolio'] = function(){


};

$router->get['/mock/watchlist'] = function(){
    $watchlist = json_decode('{
        "watchList": [
                {
                    "watchListName": "Tech Stocks"
                }
            ]
        }');
    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($watchlist);
    exit();

};

$router->get['/mock/watchlistitems'] = function(){
    $watchListItem = json_decode('{
        "watchListItems": {
		"watchListName": "Tech Stocks",
		"stockOverview": [
			{
				"companyName": "Amazon.com, Inc.",
				"symbol": "AMZN",
				"lastTradePriceOnly": "642.35",
				"dayChange": "-23.25",
				"dayLow": "640.45",
				"dayHigh": "667",
				"yearLow": "285.25",
				"yearHigh": "675.96"
			},
			{
				"companyName": "LinkedIn Corporation Class A Co",
				"symbol": "LNKD",
				"lastTradePriceOnly": "243",
				"dayChange": "-9.96",
				"dayLow": "242.62",
				"dayHigh": "253.69",
				"yearLow": "165.57",
				"yearHigh": "276.18"
			},
			{
				"companyName": "Twitter, Inc. Common Stock",
				"symbol": "TWTR",
				"lastTradePriceOnly": "25.18",
				"dayChange": "-0.95",
				"dayLow": "25.16",
				"dayHigh": "26.16",
				"yearLow": "21.01",
				"yearHigh": "53.49"
			},
			{
				"companyName": "EMC Corporation Common Stock",
				"symbol": "EMC",
				"lastTradePriceOnly": "25.03",
				"dayChange": "0.01",
				"dayLow": "24.89",
				"dayHigh": "25.2",
				"yearLow": "22.66",
				"yearHigh": "30.92"
			}
		]
	    }
    }');
    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($watchListItem);
    exit();
};