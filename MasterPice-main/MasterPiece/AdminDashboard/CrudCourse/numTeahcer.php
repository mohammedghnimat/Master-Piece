<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

// SQL query to count the number of students
$query = "SELECT COUNT(*) AS teacherCount FROM users WHERE role_id = 2";

// Execute the query
$result = $conn->query($query);

if ($result === false) {
    die("Error executing the query: " . $conn->error);
}

// Fetch the result
$row = $result->fetch_assoc();
$teacherCount = $row['teacherCount'];

// Close the database connection
$conn->close();

// Echo the numeric value in JSON format
echo json_encode($teacherCount);
?>
