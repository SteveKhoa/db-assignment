<?php

$data = json_decode(file_get_contents("php://input"), true);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "QUARATINE_CAMP_DB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert patient table
$conn->begin_transaction();
$patientInfo = $data['patientInfo'];
$patientInsertQuery = "INSERT INTO Patient (Patient_PatientID, Patient_Identity_Number, Patient_Address, Patient_Gender, Patient_Fullname, Patient_Phone) VALUES (
    '{$patientInfo['id']}', 
    '{$patientInfo['identity_number']}', 
    '{$patientInfo['address']}', 
    '{$patientInfo['gender']}', 
    '{$patientInfo['name']}', 
    '{$patientInfo['phone']}'
)";
try {
    $conn->query($patientInsertQuery);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
    exit();
}

// Insert Comorbidities
$comorbidityList = $data['comorbidityList'];
foreach ($comorbidityList as $comorbidity) {
    $insertComorbidity = "INSERT INTO Comorbidity (Comorbidity_PatientID, Comorbidity_Comorbidity) 
                          VALUES ('{$patientInfo['id']}', '$comorbidity')";
    try {
        $conn->query($insertComorbidity);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
        exit();
    }
}

// Insert Symptoms
$symptomList = $data['symptomList'];
foreach ($symptomList as $symptom) {
    $insertSymptom = "INSERT INTO Symptoms (Symptoms_Time, Symptoms_PatientID, Symptoms_Symptoms) 
                      VALUES ('{$symptom['date']}', '{$patientInfo['id']}', '{$symptom['symptom']}')";
    try {
        $conn->query($insertSymptom);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
        exit();
    }
}
// Insert admittedpatient table
$roomInfo = $data['roomInformation'];
$admittedPatientInsertQuery = "INSERT INTO AdmittedPatient (AdmittedPatient_BuildingID, AdmittedPatient_FloorID, AdmittedPatient_RoomID, AdmittedPatient_PatientID, AdmittedPatient_NurseID) VALUES (
    '{$roomInfo['buildingId']}', 
    '{$roomInfo['floorID']}', 
    '{$roomInfo['roomID']}', 
    '{$patientInfo['id']}', 
    '{$roomInfo['nurseID']}'
)";
try {
    $conn->query($admittedPatientInsertQuery);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
    exit();
}
// Insert admission table
$admissionInfo = $data['admissionInfo'];
$admissionInsertQuery = "INSERT INTO Admission (Admission_PatientID, Admission_StaffID, Admission_Date, Admission_Patient_Location) VALUES (
    '{$patientInfo['id']}', 
    '{$admissionInfo['staffID']}', 
    '{$admissionInfo['admissionDate']}', 
    'Quaratine Camp' 
)";
try {
    $conn->query($admissionInsertQuery);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
    exit();
}

// Insert testing table
$testingInfo = $data['testingInfo'];
foreach ($testingInfo as $test) {
    $testingInsertQuery = "INSERT INTO Testing (Testing_PatientID, Testing_TestID, Testing_StaffID, Testing_Date) VALUES (
        '{$patientInfo['id']}', 
        '{$test['testID']}', 
        '{$admissionInfo['staffID']}', 
        '{$test['testDate']}'
    )";
    try {
        $conn->query($testingInsertQuery);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
        exit();
    }

    // Insert data into specific test table 
    switch ($test['type']) {
        case 'PCR Test':
            $pcrInsertQuery = "INSERT INTO PCRTest (PCRTest_TestID, PCRTest_Ct_Value, PCRTest_Result) VALUES (
                '{$test['testID']}', 
                '{$test['ctvalue']}', 
                '{$test['result']}' 
            )";
            try {
                $conn->query($pcrInsertQuery);
            } catch (Exception $e) {
                echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
                exit();
            }
            break;
        case 'SPO2':
            $spo2InsertQuery = "INSERT INTO SPO2 (SPO2_TestID, SPO2_Blood_Oxygen_Levels) VALUES (
                '{$test['testID']}', 
                '{$test['bloodoxygenlevel']}' 
            )";
            try {
                $conn->query($spo2InsertQuery);
            } catch (Exception $e) {
                echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
                exit();
            }
            break;
        case 'Respiratory Rate':
            $respiratoryInsertQuery = "INSERT INTO RespiratoryRate (RespiratoryRate_TestID, RespiratoryRate_Number_Of_Breath_Per_Minute) VALUES (
                '{$test['testID']}', 
                '{$test['breathpermin']}' 
            )";
            try {
                $conn->query($respiratoryInsertQuery);
            } catch (Exception $e) {
                echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
                exit();
            }
            break;
        case 'Quick Test':
            $quickInsertQuery = "INSERT INTO QuickTest (QuickTest_TestID, QuickTest_Result, QuickTest_Ct_Value) VALUES (
                '{$test['testID']}', 
                '{$test['result']}', 
                '{$test['ctvalue']}' 
            )";
            try {
                $conn->query($quickInsertQuery);
            } catch (Exception $e) {
                echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
                exit();
            }
            break;
    }
}

// Insert treatment table
$treatmentInfo = $data['treatmentInfo'];
foreach ($treatmentInfo as $treatment) {
    $treatmentInsertQuery = "INSERT INTO Treatment (Treatment_Admitted_PatientID, Treatment_Start_Date, Treatment_End_Date, Treatment_TreatmentID) VALUES (
        '{$patientInfo['id']}', 
        '{$treatment['startDate']}', 
        '{$treatment['endDate']}', 
        '{$treatment['treatmentID']}' 
    )";
    try {
        $conn->query($treatmentInsertQuery);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
        exit();
    }

    // Insert perform table
    foreach ($treatment['doctorList'] as $doctorID) {
        $performInsertQuery = "INSERT INTO Perform (Perform_DoctorID, Perform_Admitted_PatientID, Perform_TreatmentID) VALUES (
            '$doctorID', 
            '{$patientInfo['id']}', 
            '{$treatment['treatmentID']}' 
        )";
        try {
            $conn->query($performInsertQuery);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
            exit();
        }
    }

    // Insert medication table
    foreach ($treatment['medicationList'] as $medication) {
        $medicationInsertQuery = "INSERT INTO Medication (Medication_Admitted_PatientID, Medication_Code, Medication_Effects, Medication_Name, Medication_Price, Medication_Expiration_Date, Medication_TreatmentID) VALUES (
            '{$patientInfo['id']}', 
            '{$medication['code']}', 
            '{$medication['effect']}', 
            '{$medication['name']}', 
            '{$medication['price']}', 
            '{$medication['expirationDate']}', 
            '{$treatment['treatmentID']}' 
        )";
        try {
            $conn->query($medicationInsertQuery);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "msg" => $e->getMessage()]);
            exit();
        }
    }
}
$conn->commit();
$conn->close();

echo json_encode(["status" => "Data inserted successfully"]);
