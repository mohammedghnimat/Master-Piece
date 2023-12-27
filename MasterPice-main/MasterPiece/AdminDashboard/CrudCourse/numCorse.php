<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../include.php";

// SQL query to count the number of students
$query = "SELECT COUNT(*) AS courseCount FROM courses";

// Execute the query
$result = $conn->query($query);
if ($result === false) {
    die("Error executing the query: " . $conn->error);
}

// Fetch the result
$row = $result->fetch_assoc();
$courseCount = $row['courseCount'];

// Close the database connection
$conn->close();

// Echo only the numeric value
echo json_encode ($courseCount);
?>
