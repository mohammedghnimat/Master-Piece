<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./include.php";

$jsonData = file_get_contents('php://input');
$requestData = json_decode($jsonData, true);

// Extract teacher ID from JSON
$teacherID = isset($requestData['teacherID']) ? $requestData['teacherID'] : null;

// SQL query with parameter
$sql = "SELECT u.Username AS TeacherName, u.UserID, c.coursename AS CourseName, s.UserID, s.Username AS StudentName, s.Email AS StudentEmail
        FROM courses c 
        JOIN teacher t ON t.course_id = c.courseID 
        JOIN courses_users cu ON c.courseID = cu.CoursesID
        JOIN users s ON cu.UserID = s.UserID 
        JOIN users u ON u.UserID = t.user_id
        WHERE u.UserID = ?";

// Prepare and bind the statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $teacherID);

// Execute the query
$result = $stmt->execute();

// Check if the query was successful
if ($result) {
    // Fetch the result as an associative array
    $data = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $response = ["success" => true, "data" => $data];
} else {
    $response = ["success" => false, "message" => "Error executing query: " . $conn->error];
}

// Close the connection
$stmt->close();
$conn->close();

// Output the response as JSON
echo json_encode($response);
?>