$(document).ready(function() {

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    $.ajax("http://localhost:8888/mock/user",
        {type: "GET",
            dataType: "json",
            success: function(user){
                $('#currentUser').text(user.firstName);
            }
        });



    $.ajax("http://localhost:8888/mock/transaction",
        {type: "GET",
            dataType: "json",
            success: function(transactions){
                var companies = Array();
                for(var i = 0; i < transactions.length; i++){
                    var name = transactions[i].companyName;
                    if(companies.indexOf(name) == -1){
                        companies.push(name);
                    }
                }

                var portfolioSummary = Array();

                for(i = 0; i < companies.length; i++){
                    var totalShares = 0;
                    var companyTransactions = transactions.filter(function(transaction){
                        return (transaction.companyName == companies[i]);
                    });

                    for(var j = 0; j < companyTransactions.length; j++){
                        if(companyTransactions[j].type == '1'){
                            totalShares += parseFloat(companyTransactions[j].shares);
                        } else {
                            totalShares -= parseFloat(companyTransactions[j].shares);
                        }
                    }
                    portfolioSummary.push({
                        "company" : companyTransactions[i],
                        "totalShares" : totalShares
                    })
                }

                for(i = 0; i < portfolioSummary.length; i++){
                    (function(summary){
                        $.ajax("http://dev.markitondemand.com/Api/v2/Quote/jsonp",{
                            dataType: "jsonp",
                            data: { symbol : summary.company.symbol, jsoncallback: "callback"},
                            success: function(quote){
                                var companyName = '<div class="companyName">'+ summary.company.companyName +'</div>';
                                var totalShares = '<div class="totalShares">'+ round(summary.totalShares, 2) +'</div>';
                                var open = '<div class="openPrice">'+ round(quote.Open, 2) +'</div>';
                                var lastPrice = '<div class="lastPrice">'+ round(quote.LastPrice, 2) +'</div>';
                                var currentValue = '<div class="currentValue">' + round(quote.LastPrice * summary.totalShares, 2) + '</div>';
                                $('#portFolioSummary').append("<div class='summaryContainer'>" + companyName + totalShares + open + lastPrice + currentValue + "</div>");
                            }
                         })
                    }(portfolioSummary[i]));
                }
            }
        });
});