var symbolList = {};
var symbolsList = [];
var symbol;

function getUser(){
    $.ajax("/user", {
        type: "GET",
        dataType: "json",
        success: function (user) {
            if (user) {
                $('#currentUser').text("Hi " + user.firstName);
                $('#ln a').attr('href', './settings');
                $('#textSymbol').prop('disabled', false);
            }
        },
        complete: function(){
            $('#currentUser').css('visibility', 'visible');
        }
    })
}



function getIdFromSymbol(symbol) {
    for (var i=0; i<symbolList.length; i++) {
        if (symbolList[i].symbol == symbol)
            return symbolList[i].id;
    }
}

function getWatchListData() {
    $.ajax("/watchlist", {
        type: "GET",
        datatype: "json",
        success: function(results) {

            for(var i = 0; i < results.length; i++) {

                var html = "<table class='display watchlists' cellspacing='0'><thead><tr><th>Actions</th><th>Watch List</th><th>Company</th><th>Symbol</th><th>Last Price</th><th>Change</th><th>Change%</th></tr></thead><tbody>";

                for(var j = 0; j < results[i].items.length; j++){

                    html += "<td class='action'><input type='hidden'>&nbsp; &nbsp; <a data-id="+results[i].items[j].id+" class='delete'>Del</a></td>";
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

                html += '</tbody></table><br><form id="addForm" class="addForm"><input id="addForm'+results[i].id+'" class="input add" type="text" name="symbol" value="" placeholder="Symbol" class="input"> <input type="submit" class="addWlItem btn-xs" value="add" data-table="'+results[i].id+'" ></form>';
                $("#results").append(html);
            }


            $(".watchlists").DataTable({
                "columnDefs": [
                    {
                        "targets": [],
                        "visible": false,
                        "searchable": false
                    },
                ]
            });

            $(".addWlItem").on('click', function(event){
                event.preventDefault();
                var table = $(this).attr('data-table');
                var symbol = $('#addForm'+table).val();
                var test = 1234;

                $.ajax("/watchlist/"+table, {
                    type: "POST",
                    data:{
                        id : table,
                        symbol: symbol
                    },
                    success: function(test){
                        location.reload();
                    }
                })
            })

            $('.watchlists tbody').on( 'click', 'a.delete', function (event) {
                var id = $(this).attr('data-id');
                $.ajax("/watchlistitem/"+id, {
                    type: "DELETE",
                    success: function(test){
                        location.reload();
                    }
                });
            });
        }
    });
}

function deleteTransaction(id) {
    var url = "/transaction/" + id;
    $.ajax(url, {
        type: "DELETE",
        success: function () {
        }
    });
}

function getRoaData() {
    var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Company</th><th>Symbol</th><th>Return on Assets</th></tr></thead></tbody>";
    $.ajax("/analyze/returnonassets", {
        type: "GET",
        datatype: "json",
        success: function(results) {
            for(var i = 0; i < results.length; i++) {
                var rank = "<td>" + (i+1) + "</td>";
                var company = "<td>" + results[i].companyName + "</td>";
                var symbol = "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
                var data = "<td>" + results[i].returnOnAssets + "</td>";

                html += "<tr>" + rank + company + symbol + data + "</tr>";
            }
            html += "</tbody></table>";
            $("#results").html(html);
            $("#stockRank").DataTable();
        }
    });
}

function getRoeData() {
    var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Company</th><th>Symbol</th><th>Return on Equity</th></tr></thead></tbody>";
    $.ajax("/analyze/returnonequity", {
        type: "GET",
        datatype: "json",
        success: function(results) {
            for(var i = 0; i < results.length; i++) {
                var rank = "<td>" + (i+1) + "</td>";
                var company = "<td>" + results[i].companyName + "</td>";
                var symbol = "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
                var data = "<td>" + results[i].returnOnEquity + "</td>";

                html += "<tr>" + rank + company + symbol + data + "</tr>";
            }
            html += "</tbody></table>";
            $("#results").html(html);
            $("#stockRank").DataTable();
        }
    });
}

function getEyData() {
    var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Company</th><th>Symbol</th><th>Earnings Yield</th></tr></thead></tbody>";
    $.ajax("/analyze/earningsyield", {
        type: "GET",
        datatype: "json",
        success: function(results) {
            for(var i = 0; i < results.length; i++) {
                var rank = "<td>" + (i+1) + "</td>";
                var company = "<td>" + results[i].companyName + "</td>";
                var symbol = "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
                var data = "<td>" + results[i].earningsYield + "</td>";

                html += "<tr>" + rank + company + symbol + data + "</tr>";
            }
            html += "</tbody></table>";
            $("#results").html(html);
            $("#stockRank").DataTable();
        }
    });
}

function getTpeData() {
    var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Company</th><th>Symbol</th><th>Trailing P/E</th></tr></thead></tbody>";
    $.ajax("/analyze/trailingpe", {
        type: "GET",
        datatype: "json",
        success: function(results) {
            for(var i = 0; i < results.length; i++) {
                var rank = "<td>" + (i+1) + "</td>";
                var company = "<td>" + results[i].companyName + "</td>";
                var symbol = "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
                var data = "<td>" + results[i].trailingPe + "</td>";

                html += "<tr>" + rank + company + symbol + data + "</tr>";
            }
            html += "</tbody></table>";
            $("#results").html(html);
            $("#stockRank").DataTable();
        }
    });
}

function getFpeData() {
    var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Company</th><th>Symbol</th><th>Forward P/E</th></tr></thead></tbody>";
    $.ajax("/analyze/forwardpe", {
        type: "GET",
        datatype: "json",
        success: function(results) {
            for(var i = 0; i < results.length; i++) {
                var rank = "<td>" + (i+1) + "</td>";
                var company = "<td>" + results[i].companyName + "</td>";
                var symbol = "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
                var data = "<td>" + results[i].forwardPe + "</td>";

                html += "<tr>" + rank + company + symbol + data + "</tr>";
            }
            html += "</tbody></table>";
            $("#results").html(html);
            $("#stockRank").DataTable();
        }
    });
}

function getTypeAheadSymbols(){
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
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}



function getMfData() {
    var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Score</th><th>Company</th><th>Symbol</th><th>Earnings Yield</th><th>Return on Assets</th></tr></thead><tbody>";
    $.ajax("/analyze/magicformula", {
        type: "GET",
        datatype: "json",
        success: function(results) {
            for(var i = 0; i < results.length; i++) {
                html += "<tr><td>" + (i+1) + "</td>"
                html += "<td>" + results[i].combinedRank + "</td>";
                html += "<td>" + results[i].companyName + "</td>";
                html += "<td><a href='/company?id=" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
                html += "<td>" + results[i].earningsYield + "</td>";
                html += "<td>" + results[i].returnOnAssets + "</td></tr>";
            }
            html += "</tbody></table>";
            $("#results").html(html);
            $("#stockRank").DataTable();
        }
    });
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
                html += "<td class='action'><input type='hidden' value='" + results[i].id + "'>&nbsp; &nbsp; &nbsp; &nbsp; <a class='delete'>Del</a></td>";
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
        }
    });
}

function getIdFromQueryString() {
    var url = window.location.href
    return url.substring(window.location.href.indexOf('=') + 1);
}
