<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../include.php");

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

$userID = $data['userID'];

$sql = "DELETE FROM `users` WHERE `UserID` = $userID";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("message" => "Record deleted successfully"));
} else {
    echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
}

$conn->close();
?>