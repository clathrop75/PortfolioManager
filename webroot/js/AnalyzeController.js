var symbolList = [];

$(document).ready(function() {
	getUser();
	getTypeAheadSymbols();

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



