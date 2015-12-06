$(document).ready(function() {

    $.ajax("http://localhost/user",
        {type: "GET",
            dataType: "json",
            success: function(user){
                $('#currentUser').text("Hi " + user.firstName);
            }
    });
	
	/*$.ajax("http://localhost/sector", {
		type: "GET",
        dataType: "json",
        success: function(sectors){
			for(var i = 0; i < sectors.length; i++){
				var id = sectors[i].id;
                var sector = sectors[i].sector;
                $("#sector").append($("<option></option>").attr("value",id).text(sector));
            }
        }
    });*/

    $("#search").on('click', function(e){
    	getStockData();
    });
	
	$("#btnMF").on('click', function(e){
		$("#btnMF").addClass("btn-primary");
		$("#btnMF").removeClass("btn-default");
		
		$("#btnROA").addClass("btn-default");
		$("#btnROA").removeClass("btn-primary");
		
		$("#btnROE").addClass("btn-default");
		$("#btnROE").removeClass("btn-primary");
		
		$("#btnEY").addClass("btn-default");
		$("#btnEY").removeClass("btn-primary");
		
		$("#btnTPE").addClass("btn-default");
		$("#btnTPE").removeClass("btn-primary");
		
		$("#btnFPE").addClass("btn-default");
		$("#btnFPE").removeClass("btn-primary");
    	
		getMfData("magicformula");
    });
	
	$("#btnROA").on('click', function(e){
		$("#btnMF").addClass("btn-default");
		$("#btnMF").removeClass("btn-primary");
		
		$("#btnROA").addClass("btn-primary");
		$("#btnROA").removeClass("btn-default");
		
		$("#btnROE").addClass("btn-default");
		$("#btnROE").removeClass("btn-primary");
		
		$("#btnEY").addClass("btn-default");
		$("#btnEY").removeClass("btn-primary");
		
		$("#btnTPE").addClass("btn-default");
		$("#btnTPE").removeClass("btn-primary");
		
		$("#btnFPE").addClass("btn-default");
		$("#btnFPE").removeClass("btn-primary");
		
    	getRoaData("returnonassets");
    });
	
	$("#btnROE").on('click', function(e){
		$("#btnMF").addClass("btn-default");
		$("#btnMF").removeClass("btn-primary");
		
		$("#btnROA").addClass("btn-default");
		$("#btnROA").removeClass("btn-primary");
		
		$("#btnROE").addClass("btn-primary");
		$("#btnROE").removeClass("btn-default");
		
		$("#btnEY").addClass("btn-default");
		$("#btnEY").removeClass("btn-primary");
		
		$("#btnTPE").addClass("btn-default");
		$("#btnTPE").removeClass("btn-primary");
		
		$("#btnFPE").addClass("btn-default");
		$("#btnFPE").removeClass("btn-primary");
		
    	getRoeData("returnonequity");
    });
	
	$("#btnEY").on('click', function(e){
		$("#btnMF").addClass("btn-default");
		$("#btnMF").removeClass("btn-primary");
		
		$("#btnROA").addClass("btn-default");
		$("#btnROA").removeClass("btn-primary");
		
		$("#btnROE").addClass("btn-default");
		$("#btnROE").removeClass("btn-primary");
		
		$("#btnEY").addClass("btn-primary");
		$("#btnEY").removeClass("btn-default");
		
		$("#btnTPE").addClass("btn-default");
		$("#btnTPE").removeClass("btn-primary");
		
		$("#btnFPE").addClass("btn-default");
		$("#btnFPE").removeClass("btn-primary");
		
    	getEyData("earningsyield");
    });
	
	$("#btnTPE").on('click', function(e){
		$("#btnMF").addClass("btn-default");
		$("#btnMF").removeClass("btn-primary");
		
		$("#btnROA").addClass("btn-default");
		$("#btnROA").removeClass("btn-primary");
		
		$("#btnROE").addClass("btn-default");
		$("#btnROE").removeClass("btn-primary");
		
		$("#btnEY").addClass("btn-default");
		$("#btnEY").removeClass("btn-primary");
		
		$("#btnTPE").addClass("btn-primary");
		$("#btnTPE").removeClass("btn-default");
		
		$("#btnFPE").addClass("btn-default");
		$("#btnFPE").removeClass("btn-primary");
		
    	getTpeData("trailingpe");
    });
	
	$("#btnFPE").on('click', function(e){
		$("#btnMF").addClass("btn-default");
		$("#btnMF").removeClass("btn-primary");
		
		$("#btnROA").addClass("btn-default");
		$("#btnROA").removeClass("btn-primary");
		
		$("#btnROE").addClass("btn-default");
		$("#btnROE").removeClass("btn-primary");
		
		$("#btnEY").addClass("btn-default");
		$("#btnEY").removeClass("btn-primary");
		
		$("#btnTPE").addClass("btn-default");
		$("#btnTPE").removeClass("btn-primary");
		
		$("#btnFPE").addClass("btn-primary");
		$("#btnFPE").removeClass("btn-default");
		
    	getFpeData("forwardpe");
    });

	getMfData();
});

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function getMfData() {
	var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Score</th><th>Company</th><th>Symbol</th><th>Earnings Yield</th><th>Return on Assets</th></tr></thead><tbody>";
	$.ajax("http://localhost/analyze/magicformula", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				html += "<tr><td>" + (i+1) + "</td>"
				html += "<td>" + results[i].combinedRank + "</td>";
				html += "<td>" + results[i].companyName + "</td>";
				html += "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
				html += "<td>" + results[i].earningsYield + "</td>";
				html += "<td>" + results[i].returnOnAssets + "</td></tr>";
				
				/*var rank = "<td>" + (i+1) + "</td>";
				var score = "<td>" + results[i].combinedRank + "</td>";
				var company = "<td>" + results[i].companyName + "</td>";
				var symbol = "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
				var earningsYield = "<td>" + results[i].earningsYield + "</td><td>" + results[i].returnOnAssets + "</td>";

				html += "<tr>" + rank + company + symbol + data + "</tr>";*/
			}
			html += "</tbody></table>";
			$("#results").html(html);
			$("#stockRank").DataTable();
		}
	});
}

function getRoaData() {
	var html = "<table id='stockRank' class='display' cellspacing='0'><thead><tr><th>Rank</th><th>Company</th><th>Symbol</th><th>Return on Assets</th></tr></thead></tbody>";
	$.ajax("http://localhost/analyze/returnonassets", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var rank = "<td>" + (i+1) + "</td>";
				var company = "<td>" + results[i].companyName + "</td>";
				var symbol = "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
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
	$.ajax("http://localhost/analyze/returnonequity", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var rank = "<td>" + (i+1) + "</td>";
				var company = "<td>" + results[i].companyName + "</td>";
				var symbol = "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
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
	$.ajax("http://localhost/analyze/earningsyield", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var rank = "<td>" + (i+1) + "</td>";
				var company = "<td>" + results[i].companyName + "</td>";
				var symbol = "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
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
	$.ajax("http://localhost/analyze/trailingpe", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var rank = "<td>" + (i+1) + "</td>";
				var company = "<td>" + results[i].companyName + "</td>";
				var symbol = "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
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
	$.ajax("http://localhost/analyze/forwardpe", {
		type: "GET",
		datatype: "json",
		success: function(results) {
			for(var i = 0; i < results.length; i++) {
				var rank = "<td>" + (i+1) + "</td>";
				var company = "<td>" + results[i].companyName + "</td>";
				var symbol = "<td><a href='/company/" + results[i].companyId + "'>" + results[i].symbol + "</a></td>";
				var data = "<td>" + results[i].forwardPe + "</td>";
				
				html += "<tr>" + rank + company + symbol + data + "</tr>";
			}
			html += "</tbody></table>";
			$("#results").html(html);
			$("#stockRank").DataTable();
		}
	});
}