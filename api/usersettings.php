<?php
    $router->get['/usersettings'] = function(){
        $u = $GLOBALS['USER'];
        $user = [
            "lastName" => $u->getLastName(),
            "firstName" => $u->getFirstName(),
            "eMail" => $u->getEmail()
        ];

        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        print json_encode($user);
        exit();
    };

    $router->post['/usersettings'] = function(){
        $u = $GLOBALS['USER'];
        $auth = auth::getByUserId($u->getId());

        $options = [
            'salt' => $auth->getSalt()
        ];
        $encrypt = password_hash($_REQUEST['oldpass'], PASSWORD_DEFAULT, $options);

        if($encrypt == $auth->getPass()){
            $u->setLastName($_POST['lname']);
            $u->setFirstName($_POST['fname']);
            $u->seteMail($_POST['email']);
            if(!($_POST['newpass'] == '')){
                $newencrypt = password_hash($_REQUEST['newpass'], PASSWORD_DEFAULT, $options);
                $auth->setPass($newencrypt);
            }
            header('location: /portfolio');
        }else{
            header('HTTP/1.1 401 Unauthorized');
            die();
        }
    };
