<!-- 
    Retrieve the information about the username and password for login. Two parameters:
        $_POST['username']
        $_POST['password']
-->
<!-- If there is 1 user then dont need to create user table in database to check ? -->
<?php
function queryAccount($username, $password)
{
    $userTest = 'testAdmin';
    $passTest = '123456789';
    return array('username' => $userTest, 'password' => $passTest);
}
function loginVerification($username, $password)
{
    $account = queryAccount($username, $password);

    if ($username === $account['username'] && $password === $account['password']) {
        return true;
    } else {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if (loginVerification($_POST['username'], $_POST['password'])) {
            header("Location: ../index.php");
            exit();
        } else {
            echo "Invalid username or password";
        }
    } else {
        echo "Please provide both username and password";
    }
}
?>