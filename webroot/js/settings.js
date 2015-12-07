$(document).ready(function(){
	$.ajax("/usersettings",
        {type: "GET",
            dataType: "json",
            success: function(user){
            	document.forms["myForm"]["fname"].value = user.firstName;
            	document.forms["myForm"]["lname"].value = user.lastName;
            	document.forms["myForm"]["email"].value = user.eMail;
            }
    });
});