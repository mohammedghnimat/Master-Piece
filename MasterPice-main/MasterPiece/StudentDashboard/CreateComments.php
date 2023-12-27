<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'include.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    $UserID = $data['UserID'];
    $CourseID = $data['CourseID'];
    $CommentText = $data['CommentText'];
    $Rating = $data['Rating'];

    
    $roleCheckSql = "SELECT role_id FROM users WHERE UserID = $UserID";
    $roleCheckResult = $conn->query($roleCheckSql);

    if ($roleCheckResult->num_rows > 0) {
        $user = $roleCheckResult->fetch_assoc();
        if ($user['role_id'] == 3) { 
            
            $insertCommentSql = "INSERT INTO comments (UserID, CourseID, CommentText, Rating) VALUES ($UserID, $CourseID, '$CommentText', $Rating)";
            if ($conn->query($insertCommentSql) === TRUE) {
                echo json_encode(["message" => "Comment added successfully"]);
            } else {
                echo json_encode(["error" => "Error: " . $insertCommentSql . "<br>" . $conn->error]);
            }
        } else {
            echo json_encode(["error" => "User does not have the required role for adding comments"]);
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
