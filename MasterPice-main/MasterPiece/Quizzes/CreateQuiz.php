<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./include.php";

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
$courseID = $data['courseID'];
$teacherUserID = $data['teacherUserID'];
$quizName = $data['quizName'];
// Assuming this is the user_id of the teacher

// Insert quiz details into the database
$sqlInsertQuiz = "INSERT INTO quizzes (CourseID,Teacher_Id,Quiz_Name) VALUES ('$courseID', '$teacherUserID','$quizName')";

if ($conn->query($sqlInsertQuiz) === TRUE) {
    $quizID = $conn->insert_id; // Get the last inserted ID (quiz ID)
    
    $response = array("status" => "success", "message" => "Quiz created successfully", "quizID" => $quizID);
} else {
    $response = array("status" => "error", "message" => "Error creating quiz: " . $conn->error);
}

// Return the response as JSON
echo json_encode($response);

// Close the connection
$conn->close();

?>