<?php
class Database{
    
    // CHANGE THE DB INFO ACCORDING TO YOUR DATABASE
    private $db_host = '127.0.0.1:3306';
    private $db_name = 'socioeconomic';
    private $db_username = 'root';
    private $db_password = '';
    
    public function dbConnection(){
        
        try{
            $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_username,$this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        }
        catch(PDOException $e){
            echo "Connection error ".$e->getMessage(); 
            exit;
        }
        
    }
}