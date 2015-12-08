$(document).ready(function () {

    getUser();
    getTypeAheadSymbols();

    $(".addButton").on('click', function (e) {
        $.ajax("/watchlist",
            {
                type: "POST",
                datatype: "json",
                data: {
                    wlname: $("[name='wlname']").val(),
                },
                success: function (result) {
                	location.reload(); 
                }
            });
    });

	getWatchListData()

});
