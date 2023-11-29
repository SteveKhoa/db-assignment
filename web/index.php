<?php
session_start();
include "head.php";

if (!isset($_SESSION['logged_in'])) {
    header("Location: ./login.php");
}
?>

<script src="./main.js"></script>
<script>
    $.getScript("searchUI.js");
    $.getScript("TestingDetailUI.js");
    $.getScript("ReportingUI.js");
    $.getScript("addPatient.js");
</script>

<body>
    <nav class="navbar navbar-light lg-light">
        <div class="container-fluid d-flex flex-column flex-lg-row align-items-center">
            <img class="navbar-brand" src="Image/bachkhoalogo.png" alt="HCMUT logo" width="60" height="68" p-3 m-3>

            <h1>Quarantine Camp</h1>

            <ul class="navbar-nav mb-2 mb-lg-0 d-flex flex-row">
                <li class="nav-item">
                    <button id="searchBtn" class="btn btn-outline-primary btn-lg rounded-pill" style="margin-right:10px; margin-left:10px;" onclick="SearchBtnClickOn();">Search</button>
                </li>
                <li class="nav-item">
                    <button id="addBtn" class="btn btn-outline-primary btn-lg rounded-pill" style="margin-right: 10px;" onclick="AddBtnClickOn();">Add Patient</button>
                </li>
                <li class="nav-item">
                    <button id="testDetailBtn" class="btn btn-outline-primary btn-lg rounded-pill" style="margin-right: 10px;" onclick="TestingBtnClickOn();">Testing Detail</button>
                </li>
                <li class="nav-item">
                    <button id="reportBtn" class="btn btn-outline-primary btn-lg rounded-pill" style="margin-right: 10px;" onclick="ReportBtnClickOn();">Reporting</button>
                </li>
                <li class="nav-item ms-auto">
                    <a class="btn btn-outline-primary btn-lg rounded-pill" style="margin-right:10px; margin-left:10px;" href="Model/logoutProcessing.php">Log Out</a>
                </li>
            </ul>
        </div>
    </nav>

    <div id="searchArea">
    </div>

    <div id="content">
    </div>

</body>

</html>