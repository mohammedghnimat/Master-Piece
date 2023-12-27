<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'include.php';
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    $userId = $data['id'];

    $image = $data['image'] ??'';
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $update_profile_query = "UPDATE users SET ";
    $setClauses = [];

    if (!empty($username)) {
        $setClauses[] = "Username = '$username'";
    }
    if (!empty($image)) {
        $setClauses[] = "image = '$image'";
    }

    if (!empty($email)) {
        $setClauses[] = "Email = '$email'";
    }

    if (!empty($password)) {
        $setClauses[] = "Password = '$password'";
    }

    $update_profile_query .= implode(", ", $setClauses);
    $update_profile_query .= " WHERE UserID = $userId";

    mysqli_query($conn, $update_profile_query);

    $response = array(
        'success' => 'Profile updated successfully.'
    );
    echo json_encode($response);
} else {
    $response = array(
        'error' => 'Please use post'
    );
    echo json_encode($response);
}
mysqli_close($conn);
?>