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
        $sql = "SELECT period_groups.name AS 'group', period_items.value, period_items.label FROM period_groups INNER JOIN period_items ON period_groups.id = period_items.group_id ORDER BY period_groups.id, period_items.id ";
        $result = $conn->query($sql);

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode ($items);

        $items = array();

        // if ($result->rowCount() > 0) {
        //     // Output data of each row
        //     while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        //         $groupName = $row['group'];
        //         $value = $row['value'];
        //         $label = $row['label'];
        //         if (!isset($items[$groupName])) {
        //             $items[$groupName] = array();
        //         }
        //         array_push($items[$groupName], ['value' => $value, 'label' => $label]);
        //     }
        // }
        
        echo json_encode(array_map(function($group) {
            return ['group' => $group, 'options' => $items[$group]];
        }, array_keys($items)));

    break;
}