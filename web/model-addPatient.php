<div class="border border-primary rounded-3 d-flex flex-column align-items-center" style="margin:30px 20% 30px 20%;">
    <div class="border border-3 bg-warning d-flex justify-content-center rounded-3 mb-4 mt-2" style="height:10%; width:70%">
        <h2>Patient Information</h2>
    </div>

    <form class="d-flex flex-column align-items-center" action="post" action="" style="width:90%;">
        <div class="border rounded-3 border-white">

            <!-- Patient Information -->
            <div style="margin:10px 5px 5px;">
                <div class="row">
                    <!-- Input ID Field -->
                    <div class="col input-group mb-2">
                        <span class="input-group-text">ID</span>
                        <input type="text" class="form-control" placeholder="ID" name="id">
                    </div>

                    <!-- Input Fullname Field -->
                    <div class="col input-group mb-2">
                        <span class="input-group-text">Fullname</span>
                        <input type="text" class="form-control" placeholder="Fullname" name="name">
                    </div>
                </div>

                <div class="row">
                    <!-- Input Phone number Field -->
                    <div class="col input-group mb-2">
                        <span class="input-group-text">Phone number</span>
                        <input type="text" class="form-control" placeholder="Phone" name="phone">
                    </div>

                    <!-- Input Gender -->
                    <div class="col input-group mb-2">
                        <span class="input-group-text">Gender</span>
                        <div class="row" style="width: 80%;">
                            <div class="col-lg-3" style="margin: 5px 0 5px 10px;">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="radio1" name="gender" value="male" checked>
                                    <label class="form-check-label" for="radio1">Male</label>
                                </div>
                            </div>
                            <div class="col-lg-3" style="margin: 5px 0 5px 0;">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="radio2" name="gender" value="female">
                                    <label class="form-check-label" for="radio2">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <!-- Address -->
                    <div class="col input-group mb-2">
                        <span class="input-group-text">Address</span>
                        <input type="text" class="form-control" placeholder="Address" name="address">
                    </div>

                    <!-- Identity number -->
                    <div class="col input-group mb-2">
                        <span class="input-group-text">Identity number</span>
                        <input type="text" class="form-control" placeholder="Identity number" name="identity_number">
                    </div>
                </div>
            </div>

            <!-- Comorbidity List -->
            <div class="border border-primary rounded-3" style="margin-left:5px; margin-right:5px;">
                <!-- Comorbidity label and Add Btn -->
                <ul class="navbar-nav d-flex flex-row" style="margin:5px 15px 5px 15px;">
                    <li class="nav-item">
                        <p class="h4">Comorbidity</p>
                    </li>
                    <li class="nav-item ms-auto"><button type="button" class="btn btn-primary" onclick="add_comorbidity();">+</button></li>
                </ul>

                <!-- Comorbidity Container -->
                <div id="comorbidityList" class="container">
                </div>
            </div>

            <!-- Symptoms List -->
            <div class="border border-primary rounded-3" style="margin: 10px 5px;">
                <!-- Symptom label and Add Btn -->
                <ul class="navbar-nav d-flex flex-row" style="margin:5px 15px 5px 15px;">
                    <li class="nav-item">
                        <p class="h4">Symptoms</p>
                    </li>
                    <li class="nav-item ms-auto"><button type="button" class="btn btn-primary" onclick="add_symptom();">+</button></li>
                </ul>

                <!-- Symptom Container -->
                <div id="symptomsList" class="container">
                </div>
            </div>

            <!-- Room Information-->
            <div style="margin:10px 5px 0px;">
                <div class="row">
                    <div class="col input-group mb-1">
                        <span class="input-group-text">Building ID</span>
                        <input type="text" class="form-control" name="buildingID">
                    </div>

                    <div class="col input-group mb-1">
                        <span class="input-group-text">Floor ID</span>
                        <input type="text" class="form-control" name="floorID">
                    </div>

                    <div class="col input-group mb-1">
                        <span class="input-group-text">Room ID</span>
                        <input type="text" class="form-control" name="roomID">
                    </div>

                    <div class="col input-group mb-1">
                        <span class="input-group-text">Nurse ID</span>
                        <input type="text" class="form-control" name="nurseID">
                    </div>
                </div>
            </div>

            <!-- Admission Information-->
            <div style="margin:5px 5px 0px;">
                <div class="row">
                    <div class="col input-group mb-1">
                        <span class="input-group-text">Staff ID</span>
                        <input type="text" class="form-control" name="staffID">
                    </div>

                    <div class="col input-group mb-1">
                        <span class="input-group-text">Admission Date</span>
                        <input type="date" class="form-control" name="admissionDate">
                    </div>
                </div>
            </div>

            <!-- Testing List -->
            <div class="border border-primary rounded-3" style="margin: 5px 5px 0px;">
                <!-- Testing label and Add Btn -->
                <ul class="navbar-nav d-flex flex-row" style="margin:5px 15px 5px 15px;">
                    <li class="nav-item">
                        <p class="h4">Testing</p>
                    </li>
                    <li class="nav-item ms-auto">
                        <div class="dropdown">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"></button>
                            <ul class="dropdown-menu">
                                <li><button type="button" class="btn dropdown-item" onclick="add_testing('PCRTest');">PCR Test</button></li>
                                <li><button type="button" class="btn dropdown-item" onclick="add_testing('QuickTest');">Quick Test</button></li>
                                <li><button type="button" class="btn dropdown-item" onclick="add_testing('SPO2');">SPO2 Test</button></li>
                                <li><button type="button" class="btn dropdown-item" onclick="add_testing('RespiratoryRate');">Respiratory Rate</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <!-- Testing Container -->
                <div id="testingList" class="container">
                </div>
            </div>

            <!-- Treatment List -->
            <div class="border border-primary rounded-3" style="margin: 10px 5px 10px;">
                <!-- Treatment label and Add Btn -->
                <ul class="navbar-nav d-flex flex-row" style="margin:5px 15px 5px 15px;">
                    <li class="nav-item">
                        <p class="h4">Treatment</p>
                    </li>
                    <li class="nav-item ms-auto"><button type="button" class="btn btn-primary" onclick="add_treatment();">+</button></li>
                </ul>

                <!-- Treatment Container -->
                <div id="treatmentList">
                </div>

            </div>

        </div>

        <div class="input-group d-flex justify-content-center mb-3">
            <button type="button" class="btn btn-primary" style="width:80%;" onclick="form_submit();">Submit</button>
        </div>
    </form>
</div>