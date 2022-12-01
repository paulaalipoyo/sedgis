<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method){
    case "GET":
        $sql = "SELECT * FROM rsep_tourism";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $rsep_tourism = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rsep_tourism = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        }
        echo json_encode ($rsep_tourism);
    break;
    case "POST":
        $tourism = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO rsep_tourism(id, sub_indicators, year, value, created_at) VALUES (null, :sub_indicators, :year, :value, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':sub_indicators',$tourism->sub_indicators);
        $stmt->bindParam(':year',$tourism->year);
        $stmt->bindParam(':value',$tourism->value);
        $stmt->bindParam(':created_at', $created_at);
        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Record created successfully,'];
        }else{
            $response = ['status' =>0, 'message' => 'Failed to create record,'];
        }
        return json_encode($response);
    break;
    case "PUT":
        $tourism = json_decode( file_get_contents('php://input') );
        $sql = " UPDATE rsep_tourism SET sub_indicators = :sub_indicators, year = :year , value = :value , updated_at = :updated_at WHERE id = :id ";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id',$tourism->id);
        $stmt->bindParam(':sub_indicators',$tourism->sub_indicators);
        $stmt->bindParam(':sector',$tourism->sector);
        $stmt->bindParam(':year',$tourism->year);
        $stmt->bindParam(':value',$tourism->value);
        $stmt->bindParam(':updated_at', $updated_at);
        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Record updated successfully,'];
        }else{
            $response = ['status' =>0, 'message' => 'Failed to update record,'];
        }
        return json_encode($response);
    break;
    case "DELETE":
        $sql = "DELETE FROM rsep_tourism WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[4]);

        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Record deleted successfully,'];
        }else{
            $response = ['status' =>0, 'message' => 'Failed to delet record,'];
        }
        return json_encode($response);
    break;
}