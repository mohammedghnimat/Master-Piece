<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if (!isset($data['studentID'])) {
        echo json_encode(["error" => "Missing required parameter 'studentID'"]);
        exit;
    }

    $studentID = $data['studentID'];

    $sql = "SELECT * FROM users WHERE UserID = $studentID AND role_id = 3"; 
    $result = $conn->query($sql);

    if ($result) {
        $student = $result->fetch_assoc();
        echo json_encode($student);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only GET requests are allowed"]);
}
?>
