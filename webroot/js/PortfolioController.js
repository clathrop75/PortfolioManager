var symbolList = [];

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
	
	getPortfolioData();
});

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function getIdFromSymbol(symbol) {
	for (var i=0; i<symbolList.length; i++) {
		if (symbolList[i].symbol == symbol)
			return symbolList[i].id;
	}
}

function getPortfolioData() {
	var html = "<table id='portfolio' class='display' cellspacing='0'><thead><tr><th>Company</th><th>Symbol</th><th class='formatRight'>Last Price</th><th class='formatRight'>Shares</th><th class='formatRight'>Cost Basis</th><th class='formatRight'>Market Value</th><th class='formatRight'>Gain</th><th class='formatRight'>Return</th></tr></thead><tbody>";
	$.ajax("/summary", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				html += "<tr><td>" + results[i].companyName + "</td>";
				html += "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
				html += "<td class='formatRight'>$" + parseFloat(results[i].lastTradePriceOnly).toFixed(2) + "</td>";
				html += "<td class='formatRight'>" + parseFloat(results[i].totalShares).toFixed(3) + "</td>";
				html += "<td class='formatRight'>$" + parseFloat(results[i].costBasis).toFixed(2) + "</td>";
				html += "<td class='formatRight'>$" + parseFloat(results[i].marketValue).toFixed(2) + "</td>";
				html += "<td class='formatRight'>$" + parseFloat(results[i].totalGain).toFixed(2) + "</td>";
				html += "<td class='formatRight'>" + parseFloat(results[i].returnPercent).toFixed(2) + "%</td></tr>";
			}
			html += "</tbody></table>";
			$("#results").html(html);
			$("#portfolio").DataTable();
			$(".formatRight").css("text-align", "right");
		}
	});
}