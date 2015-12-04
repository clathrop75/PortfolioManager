<?php
    $router->get['/watchlist'] = function(){
        $u = $GLOBALS['USER'];

        $lists = watchList::getByUserId($u->getId());

        $watchLists = array();

		foreach($lists as $list){
            $watchList = array();
            $watchListItems = array();
			$items = watchListItem::getByWatchListId($list->getId());
            foreach($items as $item){
                $company = company::getById($item->getCompanyId());
                $watchListItem = [
                    "companyName" => $company->getCompanyName(),
                    "symbol"       => $company->getSymbol(),
                    "lastTradePrice" => $company->getLastTradePriceOnly(),
                    "dayChange" => $company->getDayChange(),
                    "dayLow" => $company->getDaysLow(),
                    "dayHigh" => $company->getDaysHigh(),
                    "yearLow" => $company->getYearLow(),
                    "yearHigh" => $company->getYearHigh()
                ];
                $watchListItems[] = $watchListItem;
            }
            $watchList['name'] = $list->getWatchListName();
            $watchList['items'] = $watchListItems;
            $watchLists[] = $watchList;
		}

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($watchLists);
        die();
    };
