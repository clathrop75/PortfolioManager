$(document).ready(function() {

    getUser();

    getTypeAheadSymbols();
	
	$.ajax("/company/" + getIdFromQueryString(), {
		type: "GET",
        dataType: "json",
        success: function(results){
			$("#header").html("$" + results[0].lastTradePriceOnly);
			$("#lead").html(results[0].companyName + " (" + results[0].stockExchange + ": " + results[0].symbol + ")");
			$("#dayChange").html(results[0].dayChange);
			$("#marketCapitalization").html(results[0].marketCapitalization);
			$("#sector").html(results[0].sector);
			$("#industry").html(results[0].industry);
			$("#volume").html(results[0].volume);
			$("#averageDailyVolume").html(results[0].averageDailyVolume);
			$("#daysHigh").html("$" + results[0].daysHigh);
			$("#daysLow").html("$" + results[0].daysLow);
			$("#yearHigh").html("$" + results[0].yearHigh);
			$("#yearLow").html("$" + results[0].yearLow);
			
			if (results[0].dayChange.substring(0, 1) == "-")
				$("#dayChange").addClass("text-danger");
			else
				$("#dayChange").addClass("text-success");
			
			symbol = results[0].symbol;
        }
    });
	
	$.getJSON('/history/' + getIdFromQueryString(), function (data) {
		var dataSeries = [];
		
		for(var i=0; i<data.length; i++) {
			var date = new Date(data[i].historyDate);
			dataSeries.push({x:date.getTime(),y:parseFloat(data[i].close)});
		}
		
        $('#chart').highcharts('StockChart', {
            rangeSelector : {
                selected : 1
            },
            title : {
                text : symbol + ' Stock Price'
            },
            series : [{
                name : symbol,
                data : dataSeries,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        });
    });
});
