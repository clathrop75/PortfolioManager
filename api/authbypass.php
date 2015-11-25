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
            setcookie('portfolio_manager_auth_cookie', $cookie, $expiration);
            header('location: http://localhost:8888/watchlist');
            die();
        }else{
            //password incorrect
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    }
};
