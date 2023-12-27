<?php

$conn = mysqli_connect('localhost','root','','elearning');
if($conn){
    // echo "Successfully Connection";
}else{
    echo"connection failed"; 
    die();
}
?>