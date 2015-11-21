<?php
$router->get['/mock/user'] = function(){
    $user = json_decode('{
        "user": {
            "username": "testperson",
		    "firstName": "Test",
		    "lastName": "Person"
	        }
	    }');

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($user);
    exit();
};


$router->get['/mock/transaction'] = function(){
    $transaction = json_decode('{
        "transaction": [
            {
                "companyName": "Microsoft Corporation",
                "symbol": "MSFT",
                "type": "Buy",
                "date": "2011-04-15",
                "shares": "39.417",
                "price": "25.37",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Alphabet Inc.",
                "symbol": "GOOG",
                "type": "Buy",
                "date": "2011-06-15",
                "shares": "20.638",
                "price": "242.27",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Apple Inc.",
                "symbol": "AAPL",
                "type": "Buy",
                "date": "2011-11-04",
                "shares": "43.722",
                "price": "57.18",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Microsoft Corporation",
                "symbol": "MSFT",
                "type": "Sell",
                "date": "2012-04-28",
                "shares": "39.417",
                "price": "31.98",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Yahoo! Inc.",
                "symbol": "YHOO",
                "type": "Buy",
                "date": "2012-07-02",
                "shares": "67.024",
                "price": "14.92",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Alphabet Inc.",
                "symbol": "GOOG",
                "type": "Buy",
                "date": "2012-08-17",
                "shares": "14.783",
                "price": "338.23",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Apple Inc.",
                "symbol": "AAPL",
                "type": "Sell",
                "date": "2012-09-21",
                "shares": "25",
                "price": "100.04",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Microsoft Corporation",
                "symbol": "MSFT",
                "type": "Buy",
                "date": "2013-02-03",
                "shares": "35.804",
                "price": "27.93",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Yahoo! Inc.",
                "symbol": "YHOO",
                "type": "Buy",
                "date": "2013-03-01",
                "shares": "45.579",
                "price": "21.94",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Apple Inc.",
                "symbol": "AAPL",
                "type": "Buy",
                "date": "2013-03-15",
                "shares": "39.445",
                "price": "63.38",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Alphabet Inc.",
                "symbol": "GOOG",
                "type": "Buy",
                "date": "2014-06-20",
                "shares": "8.987",
                "price": "556.36",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Apple Inc.",
                "symbol": "AAPL",
                "type": "Buy",
                "date": "2014-08-22",
                "shares": "24.674",
                "price": "101.32",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Microsoft Corporation",
                "symbol": "MSFT",
                "type": "Buy",
                "date": "2014-08-22",
                "shares": "33.223",
                "price": "45.15",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Yahoo! Inc.",
                "symbol": "YHOO",
                "type": "Sell",
                "date": "2014-11-28",
                "shares": "25",
                "price": "51.47",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Alphabet Inc.",
                "symbol": "GOOG",
                "type": "Sell",
                "date": "2015-05-25",
                "shares": "39.408",
                "price": "532.11",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Yahoo! Inc.",
                "symbol": "YHOO",
                "type": "Buy",
                "date": "2015-09-04",
                "shares": "31.666",
                "price": "31.58",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Apple Inc.",
                "symbol": "AAPL",
                "type": "Sell",
                "date": "2015-09-25",
                "shares": "75",
                "price": "114.71",
                "commission": "",
                "notes": ""
            },
            {
                "companyName": "Microsoft Corporation",
                "symbol": "MSFT",
                "type": "Sell",
                "date": "2015-10-23",
                "shares": "50",
                "price": "52.87",
                "commission": "",
                "notes": ""
            }
        ]
    }');

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($transaction);
    exit();
};

$router->get['/mock/portfolio'] = function(){
    $portfolio = json_decode('{
        "portfolio": {
            "stockSummary": [
                {
                    "companyName": "Yahoo! Inc.",
                    "symbol": "YHOO",
                    "lastTradePriceOnly": "32.19",
                    "shares": "119.269",
                    "costBasis": "2627.01",
                    "marketValue": "3839.27",
                    "gain": "1212.26",
                    "return": "46.15"
                },
                {
                    "companyName": "Apple Inc.",
                    "symbol": "AAPL",
                    "lastTradePriceOnly": "112.34",
                    "shares": "7.841",
                    "costBasis": "794.45",
                    "marketValue": "880.86",
                    "gain": "86.41",
                    "return": "10.88"
                },
                {
                    "companyName": "Alphabet Inc.",
                    "symbol": "GOOG",
                    "lastTradePriceOnly": "717",
                    "shares": "5",
                    "costBasis": "2781.8",
                    "marketValue": "3585",
                    "gain": "803.2",
                    "return": "28.87"
                },
                {
                    "companyName": "Microsoft Corporation",
                    "symbol": "MSFT",
                    "lastTradePriceOnly": "52.84",
                    "shares": "19.027",
                    "costBasis": "859.07",
                    "marketValue": "1005.39",
                    "gain": "146.32",
                    "return": "17.03"
                }
              ]
            }
    }');
    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: *");
    print json_encode($portfolio);
    exit();
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