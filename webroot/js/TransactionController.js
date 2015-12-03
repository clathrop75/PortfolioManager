$(document).ready(function() {

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    $.ajax("http://localhost:8888/mock/user",
        {type: "GET",
            dataType: "json",
            success: function(user){
                $('#currentUser').text("Hi " + user.firstName);
            }
        });



    $.ajax("http://localhost:8888/mock/transaction",
        {type: "GET",
            dataType: "json",
            success: function(transactions){
                for(var i = 0; i < transactions.length; i++){
                	var actions = '<td class="action">' + "test" + '</td>';
                	var company = '<td class="company">' + transactions[i].companyName + '</td>';
                	var symbol = '<td class="symbol">' + transactions[i].symbol + '</td>';
                	var temp = transactions[i].type;
                	var type;
                	if (temp == 1){
                		type = '<td class="type">' + "Buy" + '</td>';
                	}
                	else {
                		type = '<td class="type">' + "Sell" + '</td>';
                	}
                	var date = '<td class="date">' + transactions[i].date + '</td>';
                	var shares = '<td class="shares">' + round(transactions[i].shares, 2) + '</td>';
                	var price = '<td class="price">' + transactions[i].price + '</td>';
					var commission = '<td class="commission">' + transactions[i].commission + '</td>';
                	var notes = '<td class="notes">' + transactions[i].notes + '</td>';
                	$("tbody").append('<tr class="summaryContainer">' + actions + company + symbol + type + date + shares + price + commission + notes + "</tr>");
                }
            }
        })
});

$(document).ajaxStop(function(){
	$("#portfolioTable").tablesorter();
	$("#portfolioTable").removeAttr("hidden");
});