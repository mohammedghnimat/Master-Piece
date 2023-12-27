<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "./include.php";

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file']) && isset($_FILES['course_pdf'])) {
        $file_name = $_FILES['file']['name'];
        $temp_name = $_FILES['file']['tmp_name'];
        $file_size = $_FILES['file']['size'];
        $file_type = $_FILES['file']['type'];

        $pdf_name = $_FILES['course_pdf']['name'];
        $pdf_temp_name = $_FILES['course_pdf']['tmp_name'];
        $pdf_size = $_FILES['course_pdf']['size'];
        $pdf_type = $_FILES['course_pdf']['type'];

        // Define the destination directory for the video and PDF
        $video_destination =  'C:\Users\q23ex\OneDrive\Desktop\MasterFrontEnd\dashbordTeacher\vedio\\' . $file_name;
        $pdf_destination = 'C:\Users\q23ex\OneDrive\Desktop\MasterFrontEnd\dashbordTeacher\pdf\\' . $pdf_name;
       
        // Additional data for insertion
        $coursename = $_POST['coursename'] ?? "";

        if (move_uploaded_file($temp_name, $video_destination) && move_uploaded_file($pdf_temp_name, $pdf_destination)) {
            $sql = "INSERT INTO `courses` (`coursename`, `course_video`, `course_pdf`) VALUES ('$coursename', '$file_name', '$pdf_name')";

            if (mysqli_query($conn, $sql)) {
                $response['success'] = true;
                $response['message'] = "Video and PDF uploaded successfully";
            } else {
                $response['error'] = true;
                $response['message'] = "Error inserting data into the database: " . mysqli_error($conn);
            }
        } else {
            $response['error'] = true;
            $response['message'] = "Error moving the video or PDF file";
        }
    } else {
        $response['error'] = true;
        $response['message'] = "Both video and PDF files are required";
    }
} else {
    $response['error'] = true;
    $response['message'] = "Invalid request method";
}

echo json_encode($response);
?>