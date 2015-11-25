<?php

class router {
    public $user;
    public $auth = true;
    public $get = array();
    public $post = array();
    public $put = array();
    public $delete = array();
    public $bypass;

    public function __construct(){
        $this->bypass = new bypass();
    }

    private function isId($string){
        if (ctype_digit($string)) {
            return true;
        } else {
            return false;
        }
    }

    private function getCurrentUri()
    {
        $basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
        $uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
        if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
        $uri = '/' . trim($uri, '/');
        return $uri;
    }

    private function error($url){
        header("HTTP/1.0 400 Bad Request");
        print("Did not understand URL");
        die();
    }

    private function login(){
        header('location: http://localhost:8888/login');
        die();
    }

    public function authenticateRequest(){
        if(isset($_COOKIE['portfolio_manager_auth_cookie'])){
            $user = user::getByCookie($_COOKIE['portfolio_manager_auth_cookie']);
            if($user)
                $this->user = $user;
        }
    }

    public function routeRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $baseUrl = $this->getCurrentUri();
        $urlEnd = explode('/', $baseUrl);
        $urlEnd = end($urlEnd);

        if (!$this->user && $this->auth) {
            switch ($method) {
                case "GET":
                    if (isset($this->bypass->get[$baseUrl])) {
                        $this->bypass->get[$baseUrl]();
                    } else {
                        $this->login();
                    }
                    break;
                case "POST":
                    if (isset($this->bypass->post[$baseUrl])) {
                        $this->bypass->post[$baseUrl]();
                    } else {
                        $this->login();
                    }
                    break;
                case "PUT":
                    if (isset($this->bypass->put[$baseUrl])) {
                        $this->bypass->put[$baseUrl]();
                    } else {
                        $this->login();
                    }
                    break;
            }

        } else {

            $requestInfo = array();
            if ($this->isId($urlEnd)) {
                $baseUrl = substr($baseUrl, 0, strpos($baseUrl, $urlEnd)) . '#id';
                $requestInfo['id'] = $urlEnd;
            }

            switch ($method) {
                case "GET":
                    if (isset($this->get[$baseUrl])) {
                        $this->get[$baseUrl]($requestInfo);
                    }
                    elseif(isset($this->bypass->get[$baseUrl])){
                            $this->bypass->get[$baseUrl]();
                    } else {
                        $this->error($baseUrl);
                    }
                    break;
                case "POST":
                    if (isset($this->post[$baseUrl])) {
                        $this->post[$baseUrl]($requestInfo);
                    }
                    elseif(isset($this->bypass->post[$baseUrl])){
                        $this->bypass->post[$baseUrl]();
                    } else {
                        $this->error($baseUrl);
                    }
                    break;
                case "PUT":
                    if (isset($this->put[$baseUrl])) {
                        $this->put[$baseUrl]($requestInfo);
                    }
                    elseif(isset($this->bypass->put[$baseUrl])){
                        $this->bypass->put[$baseUrl]();
                    } else {
                        $this->error($baseUrl);
                    }
                    break;
                case "DELETE":
                    if ($this->delete[$baseUrl] != null) {
                        $this->delete[$baseUrl]($requestInfo);
                    } else {
                        $this->error($baseUrl);
                    }
                    break;
            }
        }
    }
}

