<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if (!isset($data['teacherID'])) {
        echo json_encode(["error" => "Missing required parameter 'teacherID'"]);
        exit;
    }

    $teacherID = $data['teacherID'];

    $sql = "SELECT * FROM teacher WHERE TeacherID = $teacherID";
    $result = $conn->query($sql);

    if ($result) {
        $teacher = $result->fetch_assoc();
        echo json_encode($teacher);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only GET requests are allowed"]);
}
?>
