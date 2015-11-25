<?php
$router->bypass->get['/login'] = function(){
    readfile('./webroot/login.html');
    die();
};

$router->bypass->get['/'] = function(){
    readfile('./webroot/home.html');
    die();
};

$router->bypass->get['/signup'] = function(){
    readfile('./webroot/signup.html');
    die();
};

$router->bypass->post['/login'] = function(){
    $user = user::getByEmail($_REQUEST['login']);
    if(!$user){
        //redirect to errors incorrect pass or email
    } else {
        $authInfo = $user->getUserAuth();
        $options = [
            'salt' => $authInfo['Salt']
        ];
        $testing = password_hash($_REQUEST['password'], PASSWORD_DEFAULT, $options);

        if($testing == $authInfo['Pass']){
            echo 'WEEEEE';
            //set cookie then redirect to user page
            die();
        }
    }
};
