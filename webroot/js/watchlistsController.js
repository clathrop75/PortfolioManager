function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function addTableIndex(){
    $("#watchlistTables").tablesorter({
        // sort on the second column, order asc
        sortList: [[1, 0]]
    });
}

$(document).ready(function(){

    $.ajax("http://localhost:8888/user",
        {type: "GET",
            dataType: "json",
            success: function(user){
                $('#currentUser').text("Hi " + user.firstName);
            }
    });
    
    $.ajax("http://localhost:8888/watchlist",
    	{type: "GET",
    		dataType: "json",
    		success: function(watchlists){
    			//build watchlist tables
    			for (var i = 0; i < watchlists.length; i++){
    				var table = '<table id="' + watchlists[i].id + '"><thead class="topContainer"><tr><th class="top">Actions</th><th class="companyName top">Company</th><th class="top">Symbol</th><th class="top">Last Price</th><th class="top">Change</th><th class="top">Change %</th></tr></thead>';
    				$("#watchlistTables").append(table);
    				for (var j = 0; j < watchlists[i].items.length; j++){
    				    var actions = '<td class="action"><a id="' + watchlists[i].id + watchlists[i].items[j].symbol + '" class="delete">-</a></td>';
    					var company = '<td class="company">' + watchlists[i].items[j].companyName + '</td>';
    					var symbol = '<td class="symbol">' + watchlists[i].items[j].symbol + '</td>';
    					var lastPrice = '<td class="lastPrice">' + watchlists[i].items[j].lastTradePrice + '</td>';
    					var dayChange = '<td class="dayChange">' + watchlists[i].items[j].dayChange + '</td>';
    					var temp = round(parseFloat(watchlists[i].items[j].dayChange) / (parseFloat(watchlists[i].items[j].lastTradePrice) + parseFloat(watchlists[i].items[j].dayChange)), 2);
    					if (temp < 0){
    						var percentChange = '<td class="percentChange negative">' + temp + '</td>';
    					}
    					else {
    						var percentChange = '<td class="percentChange">' + temp + '</td>';
    					}
    					var newRow = '<tr class="summaryContainer" id="s' + watchlists[i].id + watchlists[i].items[j].symbol + '">' + actions + company + symbol + lastPrice + dayChange + percentChange + "</tr>";
    					$("#" + watchlists[i].id).append(newRow);
    				}
    			}
    		}
    });
    	
    
});