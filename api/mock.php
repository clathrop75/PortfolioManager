<?php
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