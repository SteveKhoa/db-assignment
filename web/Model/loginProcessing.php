<!-- 
    Retrieve the information about the username and password for login. Two parameters:
        $_POST['username']
        $_POST['password']
-->
<!-- If there is 1 user then dont need to create user table in database to check ? -->
<?php

session_start();
function loginVerification($Username, $Password)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "QUARATINE_CAMP_DB";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Hash password before querying
    $hashedPass = hash('sha1', $Password);
    $loginVerifyQuery = $conn->query("SELECT * FROM users WHERE Users_Name = '$Username' AND Users_Password = '$hashedPass'");
    return $loginVerifyQuery;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if (loginVerification($_POST['username'], $_POST['password'])) {
            $_SESSION['logged_in'] = true;
            header("Location: ../index.php");
            exit();
        } else {
            echo "<script>window.alert(Invalid username or password)</script>";
            header("Location: ../login.php");
        }
    } else {

        echo "<script>Please provide both username and password</script>";
        header("Location: ../login.php");
    }
}
?>