<?php

/////////////////////////////////////////////////////////////////
 // {
    // "student_id":7
// }
    //  This api displays the student that participate in any quiz

////////////////////////////////////////////////////////////////

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";


$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Extract the student_user_id from the JSON data
$student_user_id = $data['student_id'];  // You should validate and sanitize user input

// SQL query
$sql = "SELECT DISTINCT q.QuizID, q.CourseID, u.Username, c.coursename 
        FROM quizzes q 
        JOIN courses_users cu ON q.CourseID = cu.CoursesID 
        JOIN users u ON cu.UserID = u.UserID 
        JOIN courses c ON c.courseID = cu.CoursesID 
        WHERE cu.UserID = $student_user_id";

$result = $conn->query($sql);

if ($result === false) {
    die("Error: " . $conn->error);
}

// Fetch data and convert to JSON
$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

// Return JSON response
echo json_encode($rows);

// Close connection
$conn->close();

?>