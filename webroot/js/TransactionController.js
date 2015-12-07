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
        //get values from fields
        var newTransaction = {
            symbol: $("[name='symbol']").val(),
            type: $("#type").val(),
            date: $("[name='date']").val(),
            shares: $("[name='shares']").val(),
            price: $("[name='price']").val(),
            commission: $("[name='commission']").val(),
            notes: $("[name='notes']").val()
        };

        $.ajax("/transaction",
            {
                type: "POST",
                datatype: "json",
                data: {
                    newTransaction: newTransaction
                },
                success: function (result) {
					var t = $("#transactions").DataTable();
				 
					var type = parseInt(result[0].type);
					if (type == 1)
						type = "Buy";
					else
						type = "Sell";
					
					var commission = result[0].commission;
					if (commission == null || commission == 0)
						commission = "";
					else
						commission = "$" + parseFloat(commission).toFixed(2);
						
					var notes = result[0].notes;
					if (notes == null)
						notes = "";
					
					t.row.add([
						result[0].id,
						"<a class='edit'>Edit</a>&nbsp; &nbsp; <a class='delete'>Del</a>",
						result[0].companyName,
						"<a href='/company?id=" + result[0].id + "'>" + result[0].symbol + "</a>",
						type,
						result[0].date,
						parseFloat(result[0].shares).toFixed(2),
						"$" + parseFloat(result[0].price).toFixed(2),
						commission,
						notes
					]).draw(false);
					
					$("[name='symbol']").val(""),
					$("#type").val(""),
					$("[name='date']").val(""),
					$("[name='shares']").val(""),
					$("[name='price']").val(""),
					$("[name='commission']").val(""),
					$("[name='notes']").val("")
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

	getTransactionData();
});

function getTransactionData() {
	var html = "<table id='transactions' class='display' cellspacing='0'><thead><tr><th>ID</th><th>Actions</th><th>Company</th><th>Symbol</th><th>Type</th><th>Date</th><th class='formatRight'>Shares</th><th class='formatRight'>Price</th><th class='formatRight'>Commission</th><th>Notes</th></tr></thead><tbody>";
	$.ajax("/transaction", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var type = parseInt(results[i].type);
				if (type == 1)
					type = "Buy";
				else
					type = "Sell";
					
				var commission = results[i].commission;
				if (commission == null)
					commission = "";
				else
					commission = "$" + parseFloat(commission).toFixed(2);
					
				var notes = results[i].notes;
				if (notes == null)
					notes = "";
				
				html += "<tr><td class='id'>" + results[i].id + "</td>";
				html += "<td class='action'><input type='hidden' value='" + results[i].id + "'><a class='edit'>Edit</a>&nbsp; &nbsp; <a class='delete'>Del</a></td>";
				html += "<td class='company'>" + results[i].companyName + "</td>";
				html += "<td class='symbol'><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
				html += "<td class='type'>" + type + "</td>";
				html += "<td class='date'>" + results[i].date + "</td>";
				html += "<td class='shares formatRight'>" + parseFloat(results[i].shares).toFixed(2) + "</td>";
				html += "<td class='price formatRight'>$" + parseFloat(results[i].price).toFixed(2) + "</td>";
				html += "<td class='commission formatRight'>" + commission + "</td>";
				html += "<td class='notes'>" + notes + "</td></tr>";
			}
			html += "</tbody></table>";
			
			$("#results").html(html);
			//$(".formatRight").css("text-align", "right");
			
			$("#transactions").DataTable({
				"columnDefs": [
					{
						"targets": [0],
						"visible": false,
						"searchable": false
					},
					{ className: "dt-body-right", "targets": [6,7,8] }
				]
			});
			
			var table = $('#transactions').DataTable();
 
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