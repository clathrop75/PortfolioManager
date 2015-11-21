<?php

class router
{
    public $get = array();
    public $post = array();
    public $put = array();
    public $delete = array();

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
    }

    function routeRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $baseUrl = $this->getCurrentUri();
        $urlEnd = explode('/', $baseUrl);
        $urlEnd = end($urlEnd);

        if($baseUrl == '/'){
            readfile('./webroot/home.html');
            exit();
        }

        $requestInfo = array();
        if($this->isId($urlEnd)){
            $baseUrl = substr($baseUrl, 0, strpos($baseUrl, $urlEnd)) . '#id';
            $requestInfo['id'] = $urlEnd;
        }

        switch($method){
            case "GET":
                if($this->get[$baseUrl] != null){
                    $this->get[$baseUrl]($requestInfo);
                }else{
                    $this->error($baseUrl);
                }
                break;
            case "POST":
                if($this->post[$baseUrl] != null){
                    $this->post[$baseUrl]($requestInfo);
                }else{
                    $this->error($baseUrl);
                }
                break;
            case "PUT":
                if($this->put[$baseUrl] != null){
                    $this->put[$baseUrl]($requestInfo);
                }else{
                    $this->error($baseUrl);
                }
                break;
            case "DELETE":
                if($this->delete[$baseUrl] != null){
                    $this->delete[$baseUrl]($requestInfo);
                }else{
                    $this->error($baseUrl);
                }
                break;

        }
    }

}

