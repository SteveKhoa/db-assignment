<!-- 
    Retrieve the information about the username and password for login. Two parameters:
        $_POST['username']
        $_POST['password']
-->

<?php
function loginVerification($username, $password)
{
}

if (loginVerification($_POST['username'], $_POST['password'])) {
    header("Location: ../index.php");
}
?>