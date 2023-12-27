<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Ensure the request method is PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only PUT requests are allowed"]);
    exit;
}

// Read input data from the request body
$input_data = file_get_contents("php://input");
$put_data = json_decode($input_data, true);

// Validate required parameters
if (!isset($put_data['TeacherID']) || !isset($put_data['name']) || !isset($put_data['email']) || !isset($put_data['password'])) {
    echo json_encode(["error" => "Missing required parameters"]);
    exit;
}

// Extract data from the input
$teacher_id = $put_data['TeacherID'];
$name = $put_data['name'];
$email = $put_data['email'];
$password = $put_data['password'];

// Update the user and teacher information in a single SQL query without bind_param
$sqlUpdate = "UPDATE users
              JOIN teacher ON users.UserID = teacher.user_id
              SET users.Username='{$name}', users.Email='{$email}', users.Password='{$password}'
              WHERE teacher.TeacherID={$teacher_id}";

// Perform the update
if ($conn->query($sqlUpdate)) {
    echo json_encode(["message" => "Teacher information updated successfully"]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();

?>
