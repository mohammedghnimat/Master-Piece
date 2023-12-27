<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only POST requests are allowed"]);
    exit;
}

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if (!isset($data['course_id']) || !isset($data['Username']) || !isset($data['Email']) || !isset($data['Password'])) {
    echo json_encode(["error" => "Missing required parameters"]);
    exit;
}

$course_id = $data['course_id'];
$Username = $data['Username'];
$Email = $data['Email'];
$Password = $data['Password'];

// Check if the course_id exists in the referenced table
$courseCheckQuery = "SELECT * FROM courses WHERE courseID = $course_id";

if ($conn->query($courseCheckQuery)->num_rows === 0) {
    echo json_encode(["error" => "Course not found"]);
    exit;
}


$sql = "INSERT INTO `users` (Username, Email, Password, role_id) VALUES ('$Username', '$Email', '$Password', 2)";

if ($conn->query($sql) === TRUE) {
   
    $user_id = $conn->insert_id;

    $sql2 = "INSERT INTO teacher (user_id, course_id) VALUES ('$user_id', '$course_id')";

    if ($conn->query($sql2) === TRUE) {
        echo json_encode(["message" => "Teacher added successfully"]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();

?>
