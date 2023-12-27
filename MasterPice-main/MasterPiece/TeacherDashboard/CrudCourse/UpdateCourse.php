<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("./include.php");

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only PUT requests are allowed"]);
    exit;
}

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

$courseID = $data['courseID'] ?? null;
$coursename = $data['coursename'] ?? "";
$course_video = $data['course_video'] ?? "";
$course_pdf = $data['course_pdf'] ?? "";

if ($courseID === null) {
    echo json_encode(["error" => "Invalid or missing courseID"]);
    exit;
}

$sql = "UPDATE `courses` SET `coursename` = '$coursename', `course_video` = '$course_video', `course_pdf` = '$course_pdf' WHERE `courseID` = $courseID";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Record updated successfully"]);
} else {
    echo json_encode(["error" => "Error updating record: " . $conn->error]);
}

$conn->close();
?>
