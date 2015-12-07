
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function addTableIndex(){
    $("#portfolioTable").tablesorter({
        // sort on the second column, order asc
        sortList: [[1, 0]]
    });
}

$(document).ready(function () {

    var symbolsList = new Array();

    $.ajax("/symbols",
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
    });


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
                    var actions = '<td class="action"><span class="editSpan"><a class="edit">Edit</a></span><a id="' + result[0].id + '" class="delete">-</a></td>';
                    var company = '<td class="company">' + result[0].companyName + '</td>';
                    var symbol = '<td class="symbol">' + newTransaction.symbol + '</td>';
                    var temp = newTransaction.type;
                    var type;
                    if (temp == 1) {
                        type = '<td class="type">' + "Buy" + '</td>';
                    }
                    else {
                        type = '<td class="type">' + "Sell" + '</td>';
                    }
                    var date = '<td class="date">' + newTransaction.date + '</td>';
                    var shares = '<td class="shares">' + round(newTransaction.shares, 2) + '</td>';
                    var price = '<td class="price">' + newTransaction.price + '</td>';
                    var commission = '<td class="commission">' + newTransaction.commission + '</td>';
                    if (newTransaction.notes == null) {
                        var notes = '<td class="notes">' + "No notes" + '</td>';
                    }
                    else {
                        var notes = '<td class="notes">' + newTransaction.notes + '</td>';
                    }
                    $("tbody").append('<tr class="summaryContainer" id="s' + result[0].id + '">' + actions + company + symbol + type + date + shares + price + commission + notes + "</tr>");
                }
            });
    });

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
            }
        });

    $(document.body).on('click', '.delete', function (e) {
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
    });

});

$(document).ajaxStop(function () {
    addTableIndex();
    $("#portfolioTable").removeAttr("hidden");

});