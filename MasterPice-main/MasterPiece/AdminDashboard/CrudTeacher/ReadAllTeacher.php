<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only GET requests are allowed"]);
    exit;
}

include "../include.php";

$sql = "SELECT u.Username AS TeacherUsername,u.Email AS Email,u.Password AS Password, c.coursename AS CourseTeaching , t.TeacherID AS ID
        FROM teacher t
        JOIN users u ON t.user_id = u.UserID
        JOIN courses c ON t.course_id = c.courseID";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);

$conn->close();

?>


