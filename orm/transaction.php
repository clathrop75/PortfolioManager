<?php
class transaction extends orm
{
    private $companyId;
    private $userId;
    private $transactionType;
    private $transactionDate;
    private $shares;
    private $price;
    private $commission;
    private $notes;

    private function __construct($id, $companyId, $userId, $transactionType, $transactionDate, $shares, $price, $commission, $notes)
    {
        $this->id = $id;
        $this->companyId = $companyId;
        $this->userId = $userId;
        $this->transactionType = $transactionType;
        $this->transactionDate = $transactionDate;
        $this->shares = $shares;
        $this->price = $price;
        $this->commission = $commission;
        $this->notes = $notes;
    }

    public static function getById($id)
    {
        $db = new db;
        $result = $db->query("select * from transaction t where t.Id = '$id'");

        if ($result->num_rows == 0) {
            return 0;
        }
        $result = $result->fetch_assoc();

        return new transaction($result['Id'], $result['CompanyId'], $result['UserId'], $result['TransactionType'], $result['TransactionDate'], $result['Shares'], $result['Price'], $result['Commission'], $result['Notes']);
    }

    //will return array of transactions
    public static function getByUserId($userId)
    {
        $db = new db;
        $result = $db->query("select * from transaction t where t.UserId = '$userId'");

        if ($result->num_rows == 0) {
            return 0;
        }
        $transactions = array();
        while ($row = $result->fetch_assoc()) {
            $transactions[] = new transaction($row['Id'], $row['CompanyId'], $row['UserId'], $row['TransactionType'], $row['TransactionDate'], $row['Shares'], $row['Price'], $row['Commission'], $row['Notes']);
        }

        return $transactions;
    }

    public static function create($companyId, $userId, $transactionType, $transactionDate, $shares, $price, $commission, $notes)
    {
        //I do not think these actually need to be sanitized, however I will leave it in place until I know how the front end handles this
        $sanitized = sanitize([$companyId, $userId, $transactionType, $transactionDate, $shares, $price, $commission, $notes]);
        $db = new db;

        $result = $db->query("insert into transaction(Id, CompanyId, UserId, TransactionType, TransactionDate, Shares, Price, Commission, Notes) values(0, '$sanitized[0]', '$sanitized[1]', '$sanitized[2]', '$sanitized[3]', '$sanitized[4]', '$sanitized[5]', '$sanitized[6]', '$sanitized[7]')");
        if ($result) {
            $id = $db->query("select t.Id from transaction t where t.UserId = '$sanitized[1]' and t.TransactionType = '$sanitized[2]' and t.TransactionDate = '$sanitized[3]' and t.Shares = '$sanitized[4]'");
            $id = $id->fetch_assoc();
            return transaction::getById($id['Id']);
        }
        return $result;
    }

    protected function update()
    {
        $db = new db;
        return $db->query("update transaction t set t.TransactionType='$this->transactionType', t.CompanyId = '$this->companyId', t.TransactionDate='$this->transactionDate', t.Shares ='$this->shares', t.Commission = '$this->commission', t.Notes = '$this->notes' where t.Id = '$this->id'");
    }

    public function getCompanyId()
    {
        return $this->companyId;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function getTransactionType()
    {
        return $this->transactionType;
    }

    public function getTransactionDate()
    {
        return $this->transactionDate;
    }

    public function getShares()
    {
        return $this->shares;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function getCommission()
    {
        return $this->commission;
    }

    public function getNotes()
    {
        return $this->notes;
    }

    public function setCompanyId($companyId)
    {
        return $this->updateHelper($companyId, $this->companyId);
    }

    public function setUserId($userId){
        return $this->updateHelper($userId, $this->userId);
    }

    public function setTransactionType($transactionType)
    {
        return $this->updateHelper($transactionType, $this->transactionType);
    }

    public function setTransactionDate($transactionDate)
    {
        return $this->updateHelper($transactionDate, $this->transactionDate);
    }

    public function setShares($shares)
    {
        return $this->updateHelper($shares, $this->shares);
    }

    public function setPrice($price)
    {
        return $this->updateHelper($price, $this->price);
    }

    public function setCommission($commisson)
    {
        return $this->updateHelper($commisson, $this->commission);
    }

    public function setNotes($notes)
    {
        return $this->updateHelper($notes, $this->notes);
    }
}
