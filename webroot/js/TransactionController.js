$(document).ready(function () {
	$.ajax("/symbols", {
		type: "GET",
		dataType: "json",
		success: function(symbols){
			symbolsList = symbols;
		}
	});

	getUser();
	getTypeAheadSymbols();


	var symbols1 = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: '/symbols'
	});

	$('#prefetch, #symbolInput').typeahead(null, {
		name: 'symbols',
		source: symbols1
	});

	$('#symbolInput').on('typeahead:selected', function(event, symbol) {
		$('#symbolInput').val(symbol);
	});

	var input = $('#symbolInput');
	input.blur(function(){
		if($.inArray(input.val(), symbolsList)===-1){
			input.val('');
		}
	});



    $("#add").on('click', function (e) {
        //get values from fields
        var newTransaction = {
            symbol: $("[name='symbol']").val(),
            date: $("[name='date']").val(),
            shares: $("[name='shares']").val(),
            price: $("[name='price']").val(),
            commission: $("[name='commission']").val(),
            notes: $("[name='notes']").val(),
        };

        $.ajax("/transaction",
            {
                type: "POST",
                datatype: "json",
                data: {
                    newTransaction: newTransaction
                },
                success: function (result) {
					var t = $("#transactions").DataTable();
				 
					var type = parseInt(result[0].type);
					if (type == 1)
						type = "Buy";
					else
						type = "Sell";
					
					var commission = result[0].commission;
					if (commission == null || commission == 0)
						commission = "";
					else
						commission = "$" + parseFloat(commission).toFixed(2);
						
					var notes = result[0].notes;
					if (notes == null)
						notes = "";
					
					t.row.add([
						result[0].id,
						"&nbsp; &nbsp; &nbsp; &nbsp; <a class='delete'>Del</a>",
						result[0].companyName,
						"<a href='/company?id=" + result[0].id + "'>" + result[0].symbol + "</a>",
						type,
						result[0].date,
						parseFloat(result[0].shares).toFixed(2),
						"$" + parseFloat(result[0].price).toFixed(2),
						commission,
						notes
					]).draw(false);
					
					$("[name='symbol']").val(""),
					$("#type").val(""),
					$("[name='date']").val(""),
					$("[name='shares']").val(""),
					$("[name='price']").val(""),
					$("[name='commission']").val(""),
					$("[name='notes']").val("")
                }
            }).error(function(){alert('error')});
    });
	getTransactionData();
});

