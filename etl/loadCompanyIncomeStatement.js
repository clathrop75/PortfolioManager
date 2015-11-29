var mysql = require("mysql");
var request = require("request");
var cheerio = require("cheerio");

var con = mysql.createConnection({host: "localhost", user: "root", password: "", database: "portfolio_manager"});

var yUrlStart = "http://finance.yahoo.com/q/is?s=";
var yUrlEnd = "+Income+Statement&annual";
var remaining = 0;
var sql = "";
var companies = [];
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

function fixDate(date) {
	date = date.trim();
	return date.substr(date.length - 4);
}

function checkInactive() {
	if (lastRemaining == remaining)
		closeCon();
	else
		lastRemaining = remaining;
}

function fixNumber(number) {
	var multiplier = 1;
	
	number = number.trim();
	
	if (number == '-')
		return null;
	
	number = number.replace(/\,/g,"");
	
	if (number.substr(0,1) == '(' && number.substr(number.length - 1) == ')') {
		number = number.substr(1, number.length - 1);
		multiplier = -1;
	}
	
	number = parseFloat(number) * multiplier;
	
	return number/1000;
}

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query("SELECT s.Symbol, c.Id FROM symbol s INNER JOIN Company c ON s.Symbol=c.Symbol WHERE HasIncomeStatement=1", function(err, data){
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
				var numYears = 0;

				$ = cheerio.load(html);
				//console.log(html.indexOf("There is no Balance Sheet data available for "));
				if (html.indexOf("There is no Income Statement data available for ") > 0) {
					sql = "UPDATE symbol SET HasIncomeStatement = 0 WHERE Symbol='" + comp.symbol + "'";
					con.query(sql, function(err, data){
						if(err) throw(err);
						remaining--;
					});
				}
				else {
					// Get number of years of income statements
					if (!isNaN(parseInt(fixDate($("tr.yfnc_modtitle1 th").eq(0).text()))))
						numYears = 1;
					if (!isNaN(parseInt(fixDate($("tr.yfnc_modtitle1 th").eq(1).text()))))
						numYears = 2;
					if (!isNaN(parseInt(fixDate($("tr.yfnc_modtitle1 th").eq(2).text()))))
						numYears = 3;
					
					//console.log($("tr.yfnc_modtitle1 th").eq(1).text());
					//console.log($("tr.yfnc_modtitle1 th").eq(1).text());
					//console.log($("tr.yfnc_modtitle1 th").eq(1).text());
					//console.log(html);
					//console.log(numYears);
					remaining += numYears - 1;
					
					for (var i = 1; i <= numYears; i++)
					{
						var j = i + 1;
						sql = "INSERT IGNORE INTO IncomeStatement(`CompanyId`, `YearEnding`, `TotalRevenue`, `CostOfRevenue`, `GrossProfit`, `ResearchDevelopment`, `SellingGeneralAdministrative`, `NonRecurring`, ";
						sql += "`OtherOpsExpenses`, `TotalOperatingExpenses`, `OperatingIncome`, `TotalOtherNetIncomeExpenses`, `EBITDA`, `InterestExpense`, `IncomeBeforeTax`, `IncomeTaxExpense`, `MinorityInterest`, ";
						sql += "`NetContinuingOpsIncome`, `DiscontinuedOps`, `ExtraItems`, `AccountingChanges`, `OtherItems`, `NetIncome`, `PreferredStockAdjustments`, `NetIncomeToCommonShares`) VALUES (";
						sql += comp.id + ", ";
						sql += fixDate($("tr.yfnc_modtitle1 th").eq(i-1).text()) + ", ";
						for (k = 1; k <= 23; k++) {
							sql += fixNumber($("td ~ [align='right']").eq(j).text())
							if (k < 23)
								sql += ", ";
							else
								sql += ");";
							j += numYears;
						}
						//console.log(sql);
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