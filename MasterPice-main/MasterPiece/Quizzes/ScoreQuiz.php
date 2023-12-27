<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = array("status" => "error", "message" => "Invalid request method");
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Check if JSON decoding was successful
if ($data === null) {
    $response = array("status" => "error", "message" => "Error decoding JSON data");
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Extract data from JSON
$quizID = $data['quizID'];
$score = $data['score'];
$userID = $data['userID'];

// Update quiz scores
$sql = "INSERT INTO `quiz_user`(`quiz_id`, `user_id`, `score`) VALUES ('$quizID','$userID','$score')";

if ($conn->query($sql) === TRUE) {
    $response = array("status" => "success", "message" => "Quiz scores updated successfully");
} else {
    $response = array("status" => "error", "message" => "Error updating quiz scores: " . $conn->error);
}

// Close the connection
$conn->close();

// Return the response as JSON
echo json_encode($response);
?>
