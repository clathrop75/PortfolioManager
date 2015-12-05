$(document).ready(function(){

    $.ajax("http://localhost:8888/user",
        {type: "GET",
            dataType: "json",
            success: function(user){
                $('#currentUser').text("Hi " + user.firstName);
            }
    });
    
});