var symbolList = [];

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function getIdFromSymbol(symbol) {
	for (var i=0; i<symbolList.length; i++) {
		if (symbolList[i].symbol == symbol)
			return symbolList[i].id;
	}
}

$(document).ready(function () {

    var symbolsList = new Array();

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
	
	/*$("[name='symbol']").typeahead(null, {
	  name: 'symbols',
	  source: symbols
	});*/
	
	$('.typeahead').on('typeahead:selected', function(event, symbol) {
		window.location.href = "/company?id=" + getIdFromSymbol(symbol);
	});
	
    /*$.ajax("/symbols",
        {
            type: "GET",
            dataType: "json",
            success: function (symbols) {
                symbolsList = symbols;
            }
        }).done(function () {
        $("[name='symbol']").autocomplete({
            lookup: symbolsList,
            onSelect: function (suggestion) {
            }
        });
    });*/


    $.ajax("/user",
        {
            type: "GET",
            dataType: "json",
            success: function (user) {
                $('#currentUser').text("Hi " + user.firstName);
            }
        });

    $("#add").on('click', function (e) {
        $.ajax("/watchlist",
            {
                type: "POST",
                datatype: "json",
                data: {
                    symbol: $("[name='symbol']").val(),
            		list: $("[name='list']").val()
                },
                success: function (result) {
                	location.reload(); 
                }
            });
    });

    /*$(document.body).on('click', '.delete', function (e) {
        $("table").remove();
        $("#portFolioSummary").append('<table hidden id="portfolioTable"><thead class="topContainer"><tr><th class="top">Actions</th><th class="companyName top">Company</th><th class="top">Symbol</th><th class="top">Type</th><th class="top">Date</th><th class="top">Shares</th><th class="top">Price</th><th class="top">Commission</th><th class="top">Notes</th></tr></thead><tbody></tbody></table>');
        var url = "/transaction/" + $(this).attr("id");
        $.ajax(url,
            {
                type: "DELETE",
                success: function () {
                    $.ajax("/transaction",
                        {
                            type: "GET",
                            dataType: "json",
                            success: function (transactions) {
                                for (var i = 0; i < transactions.length; i++) {
                                    var actions = '<td class="action"><span class="editSpan"><a class="edit">Edit</a></span><a id="' + transactions[i].id + '" class="delete">-</a></td>';
                                    var company = '<td class="company">' + transactions[i].companyName + '</td>';
                                    var symbol = '<td class="symbol">' + transactions[i].symbol + '</td>';
                                    var temp = transactions[i].type;
                                    var type;
                                    if (temp == 1) {
                                        type = '<td class="type">' + "Buy" + '</td>';
                                    }
                                    else {
                                        type = '<td class="type">' + "Sell" + '</td>';
                                    }
                                    var date = '<td class="date">' + transactions[i].date + '</td>';
                                    var shares = '<td class="shares">' + round(transactions[i].shares, 2) + '</td>';
                                    var price = '<td class="price">' + transactions[i].price + '</td>';
                                    var commission = '<td class="commission">' + transactions[i].commission + '</td>';
                                    if (transactions[i].notes == null) {
                                        var notes = '<td class="notes">' + "No notes" + '</td>';
                                    }
                                    else {
                                        var notes = '<td class="notes">' + transactions[i].notes + '</td>';
                                    }
                                    $("tbody").append('<tr class="summaryContainer" id="s' + transactions[i].id + '">' + actions + company + symbol + type + date + shares + price + commission + notes + "</tr>");
                                }
                                addTableIndex();
                            }
                        });
                }
            });
    });*/

	getWatchListData();
});

function getWatchListData() {
	var html = "<table id='watchlists' class='display' cellspacing='0'><thead><tr><th>Actions</th><th>Watch List</th><th>Company</th><th>Symbol</th><th>Last Price</th><th>Change</th><th>Change%</th></tr></thead><tbody>";
	$.ajax("/watchlist", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				for(var j = 0; j < results[i].items.length; j++){
					
					html += "<td class='action'><input type='hidden'>&nbsp; &nbsp; <a class='delete'>Del</a></td>";
					html += "<td class='watchlist'>" + results[i].name + "</td>";
					html += "<td class='company'>" + results[i].items[j].companyName + "</td>";
					html += "<td class='symbol'>" + results[i].items[j].symbol + "</td>";
					html += "<td class='lasttrade'>" + results[i].items[j].lastTradePrice + "</td>";
					html += "<td class='change'>" + results[i].items[j].dayChange + "</td>";
					var temp = round(parseFloat(results[i].items[j].dayChange) / (parseFloat(results[i].items[j].lastTradePrice) + parseFloat(results[i].items[j].dayChange)), 2);
    					if (temp < 0){
    						var percentChange = '<td class="change">' + temp + '</td>';
    					}
    					else {
    						var percentChange = '<td class="change">' + temp + '</td>';
    					}
					html += percentChange+"</tr>";	
				}
			}
			html += "</tbody></table>";
			
			$("#results").html(html);
			//$(".formatRight").css("text-align", "right");
			
			$("#watchlists").DataTable({
				"columnDefs": [
					{
						"targets": [],
						"visible": false,
						"searchable": false
					},
				]
			});
			
			var table = $('#watchlists').DataTable();
 
			/*$('#transactions tbody').on( 'click', 'tr', function () {
				if ( $(this).hasClass('selected') ) {
					$(this).removeClass('selected');
				}
				else {
					table.$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
				}
			});*/
			
			$('#transactions tbody').on( 'click', 'a.delete', function () {
				var row = table.row( $(this).parents('tr') );
				var id = row.node().cells[0].innerHTML;
				id = id.substring(id.indexOf("value=") + 7);
				id = id.substring(0, id.indexOf(">") - 1);
				
				table
					.row( $(this).parents('tr') )
					.remove()
					.draw(false);
					
				deleteTransaction(id);
			} );
		}
	});
}

function deleteTransaction(id) {
	var url = "/transaction/" + id;
	$.ajax(url, {
		type: "DELETE",
		success: function () {
			// do nothing
		}
    });
}