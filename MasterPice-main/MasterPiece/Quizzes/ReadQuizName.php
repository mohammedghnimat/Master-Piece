<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./include.php";

if (!isset($_GET['teacherID'])) {
    header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Missing teacherID in the query parameters']);
    exit();
}

// Extract courseID and teacherID from the query parameters
$teacherID = $_GET['teacherID'];

$sql = "
    SELECT  q.*
FROM quizzes q
JOIN courses c ON q.CourseID = c.courseID
WHERE q.Teacher_Id = $teacherID";

// Execute the query
$result = mysqli_query($conn, $sql);

// Check for errors
if (!$result) {
    die('Query failed: ' . mysqli_error($conn));
}

// Fetch all rows as an associative array
$quizzes = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Set the response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust as needed

// Output the result as JSON
// Output the result as JSON
echo json_encode(['questions' => $quizzes]);

// Close the database connection
mysqli_close($conn);

?>
