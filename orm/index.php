<?php

abstract class orm{
    protected $id;

    protected function updateHelper($newData, &$field){
        $sanitized = sanitize([$newData]);
        $oldData = $field;
        $field = $sanitized[0];
        $result = $this->update();

        if($result){
            return $result;
        }

        $field = $oldData;
        return $result;
    }

    abstract protected function update();

    public function getId(){
        return $this->id;
    }
}

require 'user.php';
require 'watchlist.php';
require 'watchlistItem.php';
require 'transaction.php';
require 'auth.php';

