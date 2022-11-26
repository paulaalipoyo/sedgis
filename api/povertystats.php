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
        $sql = "SELECT * FROM rsep_poverty_statistics";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $rsep_poverty_statistics = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $rsep_poverty_statistics = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
        }
        echo json_encode ($rsep_poverty_statistics);
    break;
    case "POST":
        $povertystat = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO rsep_poverty_statistics(id, location, sub_indicators, sector, year, value, unit, created_at) VALUES (null, :location, :sub_indicators, :sector, :year, :value, :unit, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':location',$povertystat->location);
        $stmt->bindParam(':sub_indicators',$povertystat->sub_indicators);
        $stmt->bindParam(':sector',$povertystat->sector);
        $stmt->bindParam(':year',$povertystat->year);
        $stmt->bindParam(':value',$povertystat->value);
        $stmt->bindParam(':unit',$povertystat->unit);
        $stmt->bindParam(':created_at', $created_at);
        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Record created successfully,'];
        }else{
            $response = ['status' =>0, 'message' => 'Failed to create record,'];
        }
        return json_encode($response);
    break;
    case "PUT":
        $povertystat = json_decode( file_get_contents('php://input') );
        $sql = " UPDATE rsep_poverty_statistics SET location = :location, sub_indicators = :sub_indicators, sector = :sector , year = :year , value = :value , unit = :unit ,  updated_at = :updated_at WHERE id = :id ";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id',$povertystat->id);
        $stmt->bindParam(':location',$povertystat->location);
        $stmt->bindParam(':sub_indicators',$povertystat->sub_indicators);
        $stmt->bindParam(':sector',$povertystat->sector);
        $stmt->bindParam(':year',$povertystat->year);
        $stmt->bindParam(':value',$povertystat->value);
        $stmt->bindParam(':unit',$povertystat->unit);
        $stmt->bindParam(':updated_at', $updated_at);
        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Record updated successfully,'];
        }else{
            $response = ['status' =>0, 'message' => 'Failed to update record,'];
        }
        return json_encode($response);
    break;
    case "DELETE":
        $sql = "DELETE FROM rsep_poverty_statistics WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' =>1, 'message' => 'Record deleted successfully,'];
        }else{
            $response = ['status' =>0, 'message' => 'Failed to delet record,'];
        }
        return json_encode($response);
    break;
}