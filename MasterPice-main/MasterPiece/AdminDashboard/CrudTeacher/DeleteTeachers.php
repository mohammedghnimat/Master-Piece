<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // This handles the preflight requests
    header("HTTP/1.1 200 OK");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only DELETE requests are allowed"]);
    exit;
}

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if (!isset($data['teacher_id'])) {
    echo json_encode(["error" => "Missing required parameters"]);
    exit;
}

$teacher_id = $data['teacher_id'];

$selectQuery = "SELECT * FROM teacher WHERE TeacherID = $teacher_id";

$result = $conn->query($selectQuery);

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Teacher not found"]);
    exit;
}

$row = $result->fetch_assoc();

$user_id = $row['user_id'];

$deleteUserQuery = "DELETE FROM users WHERE UserID = $user_id";

if ($conn->query($deleteUserQuery)) {
    echo json_encode(["message" => "Teacher and user deleted successfully"]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>