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

$patientInfo = $data['patientInfo'];
$patientInsertQuery = "INSERT INTO Patient (Patient_PatientID, Patient_Identity_Number, Patient_Address, Patient_Gender, Patient_Fullname, Patient_Phone) VALUES (
    '{$patientInfo['id']}', 
    '{$patientInfo['identity_number']}', 
    '{$patientInfo['address']}', 
    '{$patientInfo['gender']}', 
    '{$patientInfo['name']}', 
    '{$patientInfo['phone']}'
)";
$conn->query($patientInsertQuery);

// Insert Comorbidities
$comorbidityList = $data['comorbidityList'];
foreach ($comorbidityList as $comorbidity) {
    $insertComorbidity = "INSERT INTO Comorbidity (Comorbidity_PatientID, Comorbidity_Comorbidity) 
                          VALUES ('{$patientInfo['id']}', '$comorbidity')";
    $conn->query($insertComorbidity);
}

// Insert Symptoms
$symptomList = $data['symptomList'];
foreach ($symptomList as $symptom) {
    $insertSymptom = "INSERT INTO Symptoms (Symptoms_Time, Symptoms_PatientID, Symptoms_Symptoms) 
                      VALUES ('{$symptom['date']}', '{$patientInfo['id']}', '{$symptom['symptom']}')";
    $conn->query($insertSymptom);
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
$conn->query($admittedPatientInsertQuery);
// Insert admission table
$admissionInfo = $data['admissionInfo'];
$admissionInsertQuery = "INSERT INTO Admission (Admission_PatientID, Admission_StaffID, Admission_Date, Admission_Patient_Location) VALUES (
    '{$patientInfo['id']}', 
    '{$admissionInfo['staffID']}', 
    '{$admissionInfo['admissionDate']}', 
    'Quaratine Camp' 
)";
$conn->query($admissionInsertQuery);

// Insert testing table
$testingInfo = $data['testingInfo'];
foreach ($testingInfo as $test) {
    $testingInsertQuery = "INSERT INTO Testing (Testing_PatientID, Testing_TestID, Testing_StaffID, Testing_Date) VALUES (
        '{$patientInfo['id']}', 
        '{$test['testID']}', 
        '{$admissionInfo['staffID']}', 
        '{$test['testDate']}'
    )";
    $conn->query($testingInsertQuery);

    // Insert data into specific test table 
    switch ($test['type']) {
        case 'PCR Test':
            $pcrInsertQuery = "INSERT INTO PCRTest (PCRTest_TestID, PCRTest_Ct_Value, PCRTest_Result) VALUES (
                '{$test['testID']}', 
                '{$test['ctvalue']}', 
                '{$test['result']}' 
            )";
            $conn->query($pcrInsertQuery);
            break;
        case 'SPO2':
            $spo2InsertQuery = "INSERT INTO SPO2 (SPO2_TestID, SPO2_Blood_Oxygen_Levels) VALUES (
                '{$test['testID']}', 
                '{$test['bloodoxygenlevel']}' 
            )";
            $conn->query($spo2InsertQuery);
            break;
        case 'Respiratory Rate':
            $respiratoryInsertQuery = "INSERT INTO RespiratoryRate (RespiratoryRate_TestID, RespiratoryRate_Number_Of_Breath_Per_Minute) VALUES (
                '{$test['testID']}', 
                '{$test['breathpermin']}' 
            )";
            $conn->query($respiratoryInsertQuery);
            break;
        case 'Quick Test':
            $quickInsertQuery = "INSERT INTO QuickTest (QuickTest_TestID, QuickTest_Result, QuickTest_Ct_Value) VALUES (
                '{$test['testID']}', 
                '{$test['result']}', 
                '{$test['ctvalue']}' 
            )";
            $conn->query($quickInsertQuery);
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
    $conn->query($treatmentInsertQuery);

    // Insert perform table
    foreach ($treatment['doctorList'] as $doctorID) {
        $performInsertQuery = "INSERT INTO Perform (Perform_DoctorID, Perform_Admitted_PatientID, Perform_TreatmentID) VALUES (
            '$doctorID', 
            '{$patientInfo['id']}', 
            '{$treatment['treatmentID']}' 
        )";
        $conn->query($performInsertQuery);
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
        $conn->query($medicationInsertQuery);
    }
}

$conn->close();

echo json_encode(["status" => "Data inserted successfully"]);

?>
