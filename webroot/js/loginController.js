$(document).ready(function () {
    getUser();
    getTypeAheadSymbols();

    $( "#loginForm" ).submit(function( event ) {
        var test = $( "#loginForm" ).serialize();
        $.post( "/login", $( "#loginForm" ).serialize()).error(function(){
            $('.loginBox').attr('style', "border-radius: 5px; border:#FF0000 1px solid;");
            $('.lb1').attr('placeholder', 'Incorrect E-mail or').val('');
            $('.lb2').val('');
        }).success(function(){
            window.location.replace("./portfolio");
        });


        event.preventDefault();
    });
});