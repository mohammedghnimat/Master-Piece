<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "include.php";

// Read JSON file to get quiz ID
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if (!$data || !isset($data['quizID'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}


$quizID = $data['quizID'];
$questions = [];

// Fetch questions related to the specified quiz without displaying quiz ID
$sql = "SELECT q.*, c.* , qs.* FROM `quizzes` q
JOIN courses c ON c.courseID = q.CourseID
JOIN questions qs ON qs.quiz_id = q.QuizID 
WHERE  q.QuizID = $quizID";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
}

echo json_encode(['questions' => $questions]);

$conn->close();

?>
