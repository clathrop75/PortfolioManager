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

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query("SELECT Symbol FROM Symbol", function(err, data){
	remaining = data.length;
	if(err) throw(err);
	
	for (var i = 0; i < data.length; i++) {
		console.log(data[i].Symbol);
		symbols.push(data[i].Symbol);
	}
});

setInterval(function() {
	var symbol = symbols.shift();
	request.get(yqlStart + symbol + yqlEnd, {timeout: 1500}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			jsonData = JSON.parse(body);
			resultCount = jsonData.query.count;
			if (resultCount > 0) {
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
				sql += jsonData.query.results.quote.Name + "', ";
				sql += jsonData.query.results.quote.Volume + ", '";
				sql += jsonData.query.results.quote.StockExchange + "', '";
				sql += today() + "');";
				con.query(sql, function(err, data){
					if(err) throw(err);
					remaining--;
					if (remaining < 1)
						closeCon();
				});
			}
		}
	});
}, 3000);