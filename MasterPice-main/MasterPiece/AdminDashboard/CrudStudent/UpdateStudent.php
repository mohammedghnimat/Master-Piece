<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include("../include.php");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only PUT requests are allowed"]);
    exit;
}

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

$userID = $data['UserID'];
$username = $data['Username'];
$email = $data['Email'];
$password = $data['Password'];
$image = $data['Image'];

if (!empty($image)) {
    $sql = "UPDATE `users` SET `Username` = '$username', `Email` = '$email', `Password` = '$password', `Image` = '$image' WHERE `UserID` = $userID AND `role_id` = 3";
} else {
    $sql = "UPDATE `users` SET `Username` = '$username', `Email` = '$email', `Password` = '$password' WHERE `UserID` = $userID AND `role_id` = 3";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Record updated successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>