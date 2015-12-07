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
	require 'portfolio.php';
    require 'auth.php';
    require 'company.php';
	require 'history.php';
	require 'symbol.php';
	require 'analyzeEarningsYield.php';
	require 'analyzeForwardPe.php';
	require 'analyzeMagicFormula.php';
	require 'analyzeReturnOnAssets.php';
	require 'analyzeReturnOnEquity.php';
	require 'analyzeTrailingPe.php';
	require 'sector.php';
	require 'industry.php';

