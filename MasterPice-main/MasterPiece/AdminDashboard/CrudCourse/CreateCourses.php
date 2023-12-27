<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if (!isset($data['coursename'])) {
        echo json_encode(["error" => "Missing required parameters"]);
        exit;
    }

    $coursename = $data['coursename'];
    $course_video = ""; 
    $course_pdf = ""; 

    $sql = "INSERT INTO courses (coursename, course_video, course_pdf) VALUES ('$coursename', '$course_video', '$course_pdf')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Course added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only POST requests are allowed"]);
}
?>
