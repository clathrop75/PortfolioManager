var mysql = require("mysql");
var request = require("request");
var cheerio = require("cheerio");

var con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "portfolio_manager"});

var yUrlStart = "http://finance.yahoo.com/q/ks?s=";
var yUrlEnd = "+Key+Statistics";
var remaining = 0;
var sql = "";
var companies = [];
var dateUpdated = formatDate(new Date());
var numProcessed = 0;
var totalCount = 0;
var interval;
var lastRemaining = 0;

function closeCon() {
	con.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
	});
	process.exit(0);
}

function formatDate(date) {
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();

	if (day < 10)
		day = '0' + day;
		
	if (month < 10)
		month = '0' + month;

	return year + "-" + month + "-" + day;
}

function checkInactive() {
	if (lastRemaining == remaining)
		closeCon();
	else
		lastRemaining = remaining;
}

function abbrToMillions(moneyAbbr) {
	moneyAbbr = moneyAbbr.replace(/\,/g,"");
	var abbr = moneyAbbr.substr(moneyAbbr.length - 1);
	var money = moneyAbbr.substring(0, moneyAbbr.length - 1);
	
	if (abbr == "K")
		return money/1000;
	else if (abbr == "M")
		return money;
	else if (abbr == "B")
		return money*1000;
	else
		return null;
}

function fixFloat(number) {
	number = number.replace(/\,/g,"");
	
	if (isNaN(parseFloat(number)))
		return null;
	else
		return parseFloat(number);
}

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query("SELECT s.Symbol, c.Id FROM symbol s INNER JOIN Company c ON s.Symbol=c.Symbol WHERE HasKeyStats=1", function(err, data){
	if(err) throw(err);
	
	remaining = data.length;
	totalCount = data.length;
	
	for (var i = 0; i < data.length; i++) {		
		var company = {};
		company.id = data[i].Id;
		company.symbol = data[i].Symbol;
		companies.push(company);
	}
	console.log(totalCount + " stock symbols queued for loading. Estimated time to complete: " + Math.round(totalCount*3/60) + " minutes");
});

interval = setInterval(function() {
	if (companies.length == 0) {
		clearInterval(interval);
		lastRemaining = remaining;
		console.log("Starting inactivity checks - Remaining: " + lastRemaining);
		setInterval(function() {
			checkInactive();
		}, 5000);
	}
	else {
		var comp = companies.pop();
		
		request.get(yUrlStart + comp.symbol + yUrlEnd, {timeout: 5000}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);
				var html = $("#yfncsumtab").html();
				$ = cheerio.load(html);
				//console.log(comp.symbol + ": " + $(".yfnc_tabledata1").eq(40).text());
				//console.log(html.indexOf("There is no Key Statistics data available for "));
				if (html.indexOf("There is no Key Statistics data available for ") > 0) {
					sql = "UPDATE symbol SET HasKeyStats = 0 WHERE Symbol='" + comp.symbol + "'";
					con.query(sql, function(err, data){
						if(err) throw(err);
						remaining--;
					});
				}
				else {
					sql = "INSERT IGNORE INTO KeyStats(`CompanyId`, `DateUpdated`, `EnterpriseValue`, `TrailingPe`, `ForwardPe`, `EarningsYield`, `ReturnOnAssets`, `ReturnOnEquity`, `Revenue`, `RevenuePerShare`, `GrossProfit`, `Ebitda`, `TotalCash`, `TotalDebt`, `SharesOutstanding`) VALUES (";
						sql += comp.id + ", '";
						sql += dateUpdated + "', ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(1).text()) + ", ";
						sql += fixFloat($(".yfnc_tabledata1").eq(2).text()) + ", ";
						sql += fixFloat($(".yfnc_tabledata1").eq(3).text()) + ", ";
						
						if (fixFloat($(".yfnc_tabledata1").eq(8).text()) > 0)
							sql += 1/fixFloat($(".yfnc_tabledata1").eq(8).text()) + ", ";
						else
							sql += "null, ";
						
						sql += fixFloat($(".yfnc_tabledata1").eq(13).text()) + ", ";
						sql += fixFloat($(".yfnc_tabledata1").eq(14).text()) + ", ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(15).text()) + ", ";
						sql += fixFloat($(".yfnc_tabledata1").eq(16).text()) + ", ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(18).text()) + ", ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(19).text()) + ", ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(23).text()) + ", ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(25).text()) + ", ";
						sql += abbrToMillions($(".yfnc_tabledata1").eq(40).text()) + ");";
						//console.log(sql);
						con.query(sql, function(err, data){
							if(err) throw(err);
							remaining--;
						});
				}
					
				numProcessed++;
				if (numProcessed % 10 == 0)
					console.log(Math.round(numProcessed/totalCount*100) + "% complete");
			}
			
		});
	}
}, 3000);