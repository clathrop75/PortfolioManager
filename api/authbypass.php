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
    $user = user::getByLogin($_REQUEST['login']);
    if(!$user){
        //fail to get user from login credentials
        header('HTTP/1.1 401 Unauthorized');
        die();
    } else {
        //got user test to see if pass is correct
        $auth = auth::getByUserId($user->getId());
        $options = [
            'salt' => $auth->getSalt()
        ];
        $encrypt = password_hash($_REQUEST['password'], PASSWORD_DEFAULT, $options);

        if($encrypt == $auth->getPass()){
            //pass was correct set cookie and save it to database and redirect to watchlist page
            $expiration = time()+ 3600 * 24 * 30;// set 30 day expiration
            $cookie = md5($encrypt. $_SERVER['REMOTE_ADDR']. $auth->getSalt());
            $auth->setAuthCookieExp($expiration);
            $auth->setAuthCookie($cookie);
            if(isset($_COOKIE['portfolio_manager_auth_cookie'])){
                unset($_COOKIE['portfolio_manager_auth_cookie']);
            };
            setcookie('portfolio_manager_auth_cookie', $cookie, $expiration);
            header('location: /portfolio');
            die();
        }else{
            //password incorrect
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }
};

$router->bypass->post['/signup'] = function(){
    $try = user::create($_REQUEST['login'],  $_REQUEST['fname'], $_REQUEST['lname'], $_REQUEST['email']);
    if(!$try){
        // didnt work.. user likely already registered
        header('HTTP/1.1 401 Unauthorized');
        die();
    }

    $user = user::getByLogin($_REQUEST['email']);
    $auth = auth::create($user->getId(), $_REQUEST['password']);

    if(!$auth){
        //failure, need to delete user that I just tried to put in
    }

    if(isset($_COOKIE['portfolio_manager_auth_cookie'])){
        unset($_COOKIE['portfolio_manager_auth_cookie']);
    };
    setcookie('portfolio_manager_auth_cookie', $auth[0], $auth[1]);
    header('location: /portfolio');
    die();

};