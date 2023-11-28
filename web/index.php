<?php
include "head.php";
?>

<script src="./main.js"></script>
<script>
    $.getScript("testingSearch.js"); //using this temporary file for searching
    //$.getScript("searchUI.js");
    $.getScript("TestingDetailUI.js");
    $.getScript("ReportingUI.js");
    $.getScript("addPatient.js");
</script>

<body>
    <nav class="navbar navbar-light lg-light">
        <div class="container-fluid d-flex flex-column flex-lg-row align-items-center">
            <img class="navbar-brand" src="bachkhoalogo.png" alt="HCMUT logo" width="60" height="68" p-3 m-3>

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
                    <button class="btn btn-outline-primary btn-lg rounded-pill" style="margin-right:10px; margin-left:10px;">Log Out</button>
                </li>
            </ul>
        </div>
    </nav>

    <div id="searchArea">
        <div class="row">
            <div class="col-6">
                <div class="form-floating mb-3 mt-3 rounded-1 border" style="width: 100%; margin-left: 10px;">
                    <input type="text" class="form-control" id="name" placeholder="Enter email" name="name"><label for="name">Name</label>
                </div>
            </div>

            <div id="carousel_info" class="col-6 d-flex flex-row align-items-center">
                <div class="form-floating" style="width: 100%; height:65%; margin: 0px 20%;">

                    <!-- Left and right controls/icons -->
                    <button class="carousel-control-prev" type="button" data-bs-target="#infoArea" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#infoArea" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>

                    <div id="infoArea" class="carousel slide h-100 border border-3 border-warning rounded-3">
                        <!-- The slideshow/carousel -->
                        <div class="carousel-inner h-100">

                            <div class="carousel-item active h-100">
                                <div class="d-flex justify-content-center w-100 h-100">
                                    <div class="d-flex flex-row align-items-center" style="width:70%">
                                        <img class="navbar-brand rounded-3" src="Test/img_avatar3.png" alt="HCMUT logo" width="50px" height="50px" p-3 m-3>
                                        <h2 class="col d-flex justify-content-center">Nguyen Van A</h2>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item h-100">
                                <div class="d-flex justify-content-center w-100 h-100">
                                    <div class="d-flex flex-row align-items-center" style="width:70%">
                                        <img class="navbar-brand rounded-3" src="Test/img_avatar3.png" alt="HCMUT logo" width="50px" height="50px" p-3 m-3>
                                        <h2 class="col d-flex justify-content-center">Nguyen Van B</h2>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item h-100">
                                <div class="d-flex justify-content-center w-100 h-100">
                                    <div class="d-flex flex-row align-items-center" style="width:70%">
                                        <img class="navbar-brand rounded-3" src="Test/img_avatar3.png" alt="HCMUT logo" width="50px" height="50px" p-3 m-3>
                                        <h2 class="col d-flex justify-content-center">Nguyen Van C</h2>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="content">
        <!-- Carousel -->
        <div id="reportInfo" class="carousel slide">

            <!-- The slideshow/carousel -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="Test/la.jpg" alt="Los Angeles" class="d-block" style="width:100%">
                </div>
                <div class="carousel-item">
                    <img src="Test/chicago.jpg" alt="Chicago" class="d-block" style="width:100%">
                </div>
                <div class="carousel-item">
                    <img src="Test/ny.jpg" alt="New York" class="d-block" style="width:100%">
                </div>
            </div>
        </div>
    </div>

</body>

</html>