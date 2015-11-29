var mysql = require("mysql");
var request = require("request");

var con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "portfolio_manager"});

var yqlStart = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%22";
var yqlEnd = "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
var resultCount = 0;
var remaining = 0;
var jsonData = "";
var sql = "";
var symbols = [];
var numProcessed = 0;
var totalCount = 0;
var interval;

function today() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();

	if (day < 10)
		day = '0' + day;
		
	if (month < 10)
		month = '0' + month;

	return year + "-" + month + "-" + day;
}

function closeCon() {
	con.end(function(err) {
		  // The connection is terminated gracefully
		  // Ensures all previously enqueued queries are still
		  // before sending a COM_QUIT packet to the MySQL server.
	});
	process.exit(0);
}

function checkInactive() {
	if (lastRemaining == remaining)
		closeCon();
	else
		lastRemaining = remaining;
}

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query("SELECT Symbol FROM Symbol", function(err, data){
	if(err) throw(err);
	
	remaining = data.length;
	totalCount = data.length;
	
	for (var i = 0; i < data.length; i++) {
		symbols.push(data[i].Symbol);
	}
	console.log(totalCount + " stock symbols queued for loading. Estimated time to complete: " + Math.round(totalCount*3/60) + " minutes");
});

interval = setInterval(function() {
	if (symbols.length == 0) {
		clearInterval(interval);
		lastRemaining = remaining;
		console.log("Starting inactivity checks - Remaining: " + lastRemaining);
		setInterval(function() {
			checkInactive();
		}, 5000);
	}
	else {
		var symbol = symbols.pop();
		request.get(yqlStart + symbol + yqlEnd, {timeout: 5000}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				jsonData = JSON.parse(body);
				resultCount = jsonData.query.count;
				if (resultCount > 0 && jsonData.query.results.quote.Name != null) {
					sql = "CALL spInsertOrUpdateCompany('";
					sql += jsonData.query.results.quote.Symbol + "', ";
					sql += jsonData.query.results.quote.AverageDailyVolume + ", ";
					sql += jsonData.query.results.quote.Change + ", ";
					sql += jsonData.query.results.quote.DaysLow + ", ";
					sql += jsonData.query.results.quote.DaysHigh + ", ";
					sql += jsonData.query.results.quote.YearLow + ", ";
					sql += jsonData.query.results.quote.YearHigh + ", '";
					sql += jsonData.query.results.quote.MarketCapitalization + "', ";
					sql += jsonData.query.results.quote.LastTradePriceOnly + ", '";
					sql += jsonData.query.results.quote.Name.replace("'", "''") + "', ";
					sql += jsonData.query.results.quote.Volume + ", '";
					sql += jsonData.query.results.quote.StockExchange + "', '";
					sql += today() + "');";
					con.query(sql, function(err, data){
						if(err) throw(err);
					});
					numProcessed++;
					if (numProcessed % 10 == 0)
						console.log(Math.round(numProcessed/totalCount*100) + "% complete");
				}
			}
			remaining--;
			/*if (remaining < 1)
				closeCon();*/
		});
	}
}, 3000);