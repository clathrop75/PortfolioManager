var symbolList = {};
var symbol;

$(document).ready(function() {

    $.ajax("/user",
        {type: "GET",
            dataType: "json",
            success: function(user){
                $('#currentUser').text("Hi " + user.firstName);
            }
    });
	
	$.ajax("/symbol", {
		type: "GET",
        dataType: "json",
        success: function(symbols){
			symbolList = symbols;
        }
    });
	
	var symbols = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.whitespace,
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/symbols'
	});
	
	$('#prefetch .typeahead').typeahead(null, {
	  name: 'symbols',
	  source: symbols
	});
	
	$('.typeahead').on('typeahead:selected', function(event, symbol) {
		window.location.href = "/company?id=" + getIdFromSymbol(symbol);
	});
	
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

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function getIdFromQueryString() {
	var url = window.location.href
	return url.substring(window.location.href.indexOf('=') + 1);
}

function getIdFromSymbol(symbol) {
	for (var i=0; i<symbolList.length; i++) {
		if (symbolList[i].symbol == symbol)
			return symbolList[i].id;
	}
}

function drawChart() {
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%d-%b-%y").parse;

    var x = techan.scale.financetime()
            .range([0, width])
            .outerPadding(0);

    var y = d3.scale.linear()
            .range([height, 0]);

    var close = techan.plot.close()
            .xScale(x)
            .yScale(y);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("/history/" + getIdFromQueryString(), function(error, data) {
        alert("got json");
		var accessor = close.accessor();

        data = data.slice(0, 200).map(function(d) {
            return {
                date: parseDate(d.historyDate),
                open: +d.open,
                high: +d.high,
                low: +d.low,
                close: +d.close,
                volume: +d.volume
            };
        }).sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });

        x.domain(data.map(accessor.d));
        y.domain(techan.scale.plot.ohlc(data, accessor).domain());

        svg.append("g")
                .datum(data)
                .attr("class", "close")
                .call(close);

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");
    });
}