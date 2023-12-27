<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
class UserAuthentication {
    private $pdo;

    public function __construct($db) {
        $this->pdo = $db;
    }

    public function authenticateUser($json_data) {
        $data = json_decode($json_data, true);


        if ($data && isset($data["email"]) && isset($data["password"])) {
    $email = $data["email"];
    $password = $data["password"];

    $query = "SELECT *,UserID , role_id FROM users WHERE Email = :Email AND Password = :Password";
    $stmt = $this->pdo->prepare($query);
    $stmt->bindParam(':Email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':Password', $password, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) > 0) {  
        $user = $result[0];
        $response = array('STATUS' => true, 'USER' => $user,'ROLE' => $user['role_id'], 'USER_ID' => $user['UserID']);
    } else {
        $response = array('STATUS' => false);
    }
} else {
    $response = array('error' => 'Invalid JSON data');
}


        return $response;
    }
}

include "connect.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $json_data = file_get_contents('php://input');
    $authenticator = new UserAuthentication($pdo);
    $response = $authenticator->authenticateUser($json_data);
} else {
    $response = array('error' => 'Invalid request method');
}

echo json_encode($response);

$pdo = null;

?>
