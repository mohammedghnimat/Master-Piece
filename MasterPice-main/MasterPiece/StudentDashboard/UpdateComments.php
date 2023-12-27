<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'include.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    $CommentID = $data['CommentID'];
    $UserID = $data['UserID'];
    $CourseID = $data['CourseID'];
    $CommentText = $data['CommentText'];
    $Rating = $data['Rating'];

    $roleCheckSql = "SELECT role_id FROM users WHERE UserID = $UserID";
    $roleCheckResult = $conn->query($roleCheckSql);

    if ($roleCheckResult->num_rows > 0) {
        $user = $roleCheckResult->fetch_assoc();
        if ($user['role_id'] == 3) {

            $commentCheckSql = "SELECT * FROM comments WHERE CommentID = $CommentID AND UserID = $UserID";
            $commentCheckResult = $conn->query($commentCheckSql);

            if ($commentCheckResult->num_rows > 0) {
                
                $updateCommentSql = "UPDATE comments SET CommentText = '$CommentText', Rating = $Rating WHERE CommentID = $CommentID";
                if ($conn->query($updateCommentSql) === TRUE) {
                    echo json_encode(["message" => "Comment updated successfully"]);
                } else {
                    echo json_encode(["error" => "Error: " . $updateCommentSql . "<br>" . $conn->error]);
                }
            } else {
             
                echo json_encode(["error" => "User does not have permission to update this comment"]);
            }
        } else {
           
            echo json_encode(["error" => "User does not have the required role for updating comments"]);
        }
    } else {
        
        echo json_encode(["error" => "User not found"]);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
