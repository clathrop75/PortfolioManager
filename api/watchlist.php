<?php
    $router->get['/watchlist'] = function(){
        $u = $GLOBALS['USER'];

        $lists = watchList::getByUserId($u->getId());

        $watchLists = array();

		foreach($lists as $list){
            $watchList = array();
            $watchListItems = array();
			$items = watchListItem::getByWatchListId($list->getId());

            if($items) {
                foreach ($items as $item) {
                    $company = company::getById($item->getCompanyId());
                    $watchListItem = [
                        "id" => $item->getId(),
                        "companyName" => $company->getCompanyName(),
                        "symbol" => $company->getSymbol(),
                        "lastTradePrice" => $company->getLastTradePriceOnly(),
                        "dayChange" => $company->getDayChange(),
                        "dayLow" => $company->getDaysLow(),
                        "dayHigh" => $company->getDaysHigh(),
                        "yearLow" => $company->getYearLow(),
                        "yearHigh" => $company->getYearHigh()
                    ];
                    $watchListItems[] = $watchListItem;
                }
            }
            $watchList['id'] = $list->getId();
            $watchList['name'] = $list->getWatchListName();
            $watchList['items'] = $watchListItems;
            $watchLists[] = $watchList;
		}

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($watchLists);
        die();
    };

    $router->post['/watchlist'] = function() {
        watchList::create($GLOBALS['USER']->getId(), $_POST['wlname']);
        die();
    };

    $router->post['/watchlist/#id'] = function($id) {
        $company = company::getBySymbol($_POST['symbol']);
        watchListItem::create($id['id'], $company->getId(), null);
        die();
    };

    $router->delete['/watchlistitem/#id'] = function($id){
        watchListItem::deleteByid($id['id']);
    };

