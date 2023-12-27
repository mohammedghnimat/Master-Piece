<?php
include "../include.php";

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if (!isset($data['courseID'])) {
        echo json_encode(["error" => "Missing required parameters"]);
        exit;
    }

    $courseID = $data['courseID'];

    $deleteQuery = "DELETE FROM courses WHERE courseID = $courseID";

    if ($conn->query($deleteQuery) === TRUE) {
        echo json_encode(["message" => "Course deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $deleteQuery . "<br>" . $conn->error]);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Only DELETE requests are allowed"]);
}
?>
