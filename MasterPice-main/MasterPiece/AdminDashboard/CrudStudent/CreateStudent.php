<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../include.php");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only POST requests are allowed"]);
    exit;
}

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

$sql = "INSERT INTO `users` (`Username`, `Email`, `Password`, `role_id`)
        VALUES ('$username', '$email', '$password', 3)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("message" => "Record created successfully"));
} else {
    echo json_encode(array("error" => "Error: " . $sql . "<br>" . $conn->error));
}

$conn->close();
?>
