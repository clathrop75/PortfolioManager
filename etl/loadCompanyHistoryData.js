var mysql = require("mysql");
var request = require("request");

var con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "portfolio_manager"});

var yqlStart = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22";
var yqlEnd = "%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
var resultCount = 0;
var remaining = 0;
var jsonData = "";
var sql = "";
var companies = [];
var dateStart = "";
var dateEnd = formatDate(new Date());
var numProcessed = 0;
var totalCount = 0;
var interval;
var lastRemaining = 0;

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

function monthStart(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

function today() {
	return formatDate(new Date());
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
	if (lastRemaining == remaining) {
		console.log("No detectable progress made. Closing connection.");
		closeCon();
	}
	else {
		console.log((lastRemaining - remaining) + " updates made since last check.");
		lastRemaining = remaining;
	}
}

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query("SELECT c.Id, c.Symbol, DATE_ADD(MAX(h.HistoryDate), INTERVAL 1 DAY) AS StartDate FROM Company c LEFT JOIN History h ON c.Id=h.CompanyId GROUP BY c.Id, c.Symbol HAVING StartDate < '" + today() + "' OR StartDate IS NULL", function(err, data){
//con.query("SELECT c.Id, c.Symbol, DATE_ADD(MAX(h.HistoryDate), INTERVAL 1 DAY) AS StartDate FROM Company c LEFT JOIN History h ON c.Id=h.CompanyId WHERE c.Symbol < 'SNMX' GROUP BY c.Id, c.Symbol HAVING StartDate < '" + today() + "' OR StartDate IS NULL", function(err, data){
	if(err) throw(err);
	
	remaining = data.length;
	totalCount = data.length;
	
	for (var i = 0; i < data.length; i++) {
		if (data[i].StartDate != null)
			dateStart = data[i].StartDate;
		else
			dateStart = monthStart(new Date());
		
		var company = {};
		company.id = data[i].Id;
		company.symbol = data[i].Symbol;
		company.start = dateStart;
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
		request.get(yqlStart + comp.symbol + "%22%20and%20startDate%20%3D%20%22" + formatDate(comp.start) + "%22%20and%20endDate%20%3D%20%22" + dateEnd + yqlEnd, {timeout: 5000}, function (error, response, body) {
		//request.get(yqlStart + comp.symbol + "%22%20and%20startDate%20%3D%20%22" + "2013-01-01" + "%22%20and%20endDate%20%3D%20%22" + "2013-12-31" + yqlEnd, {timeout: 5000}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				jsonData = JSON.parse(body);
				resultCount = jsonData.query.count;
				console.log(resultCount + " records found for " + comp.symbol);
				if (resultCount == 1) {
					sql = "INSERT IGNORE INTO History(`CompanyId`, `HistoryDate`, `Open`, `High`, `Low`, `Close`, `Volume`, `AdjustedClose`) VALUES (";
					sql += comp.id + ", '";
					sql += jsonData.query.results.quote.Date + "', ";
					sql += jsonData.query.results.quote.Open + ", ";
					sql += jsonData.query.results.quote.High + ", ";
					sql += jsonData.query.results.quote.Low + ", ";
					sql += jsonData.query.results.quote.Close + ", ";
					sql += jsonData.query.results.quote.Volume + ", ";
					sql += jsonData.query.results.quote.Adj_Close + ");";
					console.log(sql);
					con.query(sql, function(err, data){
						if(err) throw(err);
						remaining--;
					});
				}
				else if (resultCount > 1) {
					remaining += resultCount - 1;
					for (var i = 0; i < resultCount; i++) {
						sql = "INSERT IGNORE INTO History(`CompanyId`, `HistoryDate`, `Open`, `High`, `Low`, `Close`, `Volume`, `AdjustedClose`) VALUES (";
						sql += comp.id + ", '";
						sql += jsonData.query.results.quote[i].Date + "', ";
						sql += jsonData.query.results.quote[i].Open + ", ";
						sql += jsonData.query.results.quote[i].High + ", ";
						sql += jsonData.query.results.quote[i].Low + ", ";
						sql += jsonData.query.results.quote[i].Close + ", ";
						sql += jsonData.query.results.quote[i].Volume + ", ";
						sql += jsonData.query.results.quote[i].Adj_Close + ");";
						con.query(sql, function(err, data){
							if(err) throw(err);
							remaining--;
						});
					}
				}
				numProcessed++;
				if (numProcessed % 10 == 0)
					console.log(Math.round(numProcessed/totalCount*100) + "% complete");
			}
			
		});
	}
}, 3000);