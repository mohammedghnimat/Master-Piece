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
$quizID = $data['quizID']; 
$courseID = $data['courseID']; 
// $questions = $data['questions']; 
$questionText = $data['question'];
$answer1 = $data['answer1'];
$answer2 = $data['answer2'];
$answer3 = $data['answer3'];
$answer4 = $data['answer4'];
$correctAnswer = $data['correctAnswer'];

// Insert quiz details into the database
$sql = "INSERT INTO questions (quiz_id, question, answer1, answer2, answer3, answer4,  correctAnswer) VALUES ";

// foreach ($questions as $question) {
//     $questionText = $question['question'];
//     $answer1 = $question['answer1'];
//     $answer2 = $question['answer2'];
//     $answer3 = $question['answer3'];
//     $answer4 = $question['answer4'];
//     $correctAnswer = $question['correctAnswer'];

    // Add the current question to the SQL query
    $sql .= "('$quizID', '$questionText', '$answer1', '$answer2', '$answer3','$answer4', '$correctAnswer'),";
// }

// Remove the trailing comma
$sql = rtrim($sql, ',');

// Execute the SQL query
if ($conn->query($sql) === TRUE) {
    $response = array("status" => "success", "message" => "Quiz created successfully");
} else {
    $response = array("status" => "error", "message" => "Error creating quiz: " . $conn->error);
}

// Return the response as JSON
echo json_encode($response);

// Close the connection
$conn->close();

?>
