
<?php

function retrievePatientData($name)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "QUARATINE_CAMP_DB";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $conn->real_escape_string($name);

    $sql = "SELECT * FROM Patient WHERE Patient_Fullname LIKE '%$name%'";
    $result = $conn->query($sql);

    $patients = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $patient = array(
                'Name' => $row['Patient_Fullname'],
                'PatientID' => $row['Patient_PatientID'],
                'Gender' => $row['Patient_Gender'],
                'Address' => $row['Patient_Address'],
                'Comorbidity' => array(),
                'Symptom' => array(),
                'Testing' => array(),
                'Treatment' => array()
            );

            $patientID = $row['Patient_PatientID'];
            //ADD CORMOBIDITY
            $comorbidityQuery = "SELECT * FROM Comorbidity WHERE Comorbidity_PatientID = '$patientID'";
            $comorbidityResult = $conn->query($comorbidityQuery);

            while ($comorbidityRow = $comorbidityResult->fetch_assoc()) {
                $patient['Comorbidity'][] = $comorbidityRow['Comorbidity_Comorbidity'];
            }

            //ADD SYMTOM
            $SymptomQuery = "SELECT * FROM Symptoms WHERE Symptoms_PatientID = '$patientID'";
            $SymptomResult = $conn->query($SymptomQuery);

            while ($SymptomRow = $SymptomResult->fetch_assoc()) {
                $patient['Symptom'][] = $SymptomRow['Symptoms_Symptoms'];
            }
            // Retrieve testing information for this patient
            $testingQuery = "SELECT * FROM Testing WHERE Testing_PatientID = '{$row['Patient_PatientID']}'";
            $testingResult = $conn->query($testingQuery);

            while ($testingRow = $testingResult->fetch_assoc()) {

                $SPO2Query = "SELECT * FROM spo2 WHERE SPO2_TestID = '{$testingRow['Testing_TestID']}'";
                $SPO2Result = $conn->query($SPO2Query);
                if ($SPO2Row = $SPO2Result->fetch_assoc()) {
                    $testingData = array('type' => 'SPO2');
                    $testingData['oxylevel'] = $SPO2Row['SPO2_Blood_Oxygen_Levels'];
                }

                $respiratoryRateQuery = "SELECT * FROM respiratoryrate WHERE RespiratoryRate_TestID = '{$testingRow['Testing_TestID']}'";
                $respiratoryRateResult = $conn->query($respiratoryRateQuery);
                if ($respiratoryRateRow = $respiratoryRateResult->fetch_assoc()) {
                    $testingData = array('type' => 'respiratoryRate');
                    $testingData['breathpermin'] = $respiratoryRateRow['RespiratoryRate_Number_Of_Breath_Per_Minute'];
                }

                $quickTestQuery = "SELECT * FROM quicktest WHERE QuickTest_TestID = '{$testingRow['Testing_TestID']}'";
                $quickTestResult = $conn->query($quickTestQuery);
                if ($quickTestRow = $quickTestResult->fetch_assoc()) {
                    $testingData = array('type' => 'quickTest');
                    $testingData['ctValue'] = $quickTestRow['QuickTest_Ct_Value'];
                    $testingData['result'] = $quickTestRow['QuickTest_Result'];
                }

                $pcrQuery = "SELECT * FROM pcrtest WHERE PCRTest_TestID = '{$testingRow['Testing_TestID']}'";
                $pcrResult = $conn->query($pcrQuery);
                if ($pcrRow = $pcrResult->fetch_assoc()) {
                    $testingData = array('type' => 'PCRTest');
                    $testingData['ctValue'] = $pcrRow['PCRTest_Ct_Value'];
                    $testingData['result'] = $pcrRow['PCRTest_Result'];
                }

                $patient['Testing'][] = $testingData;
            }
            // ADD TREATMENT HERE 
            $treatmentquery = "SELECT * FROM treatment WHERE Treatment_Admitted_PatientID = '{$row['Patient_PatientID']}'";
            $treatmentResult = $conn->query($treatmentquery);

            while ($treatmentRow = $treatmentResult->fetch_assoc()) {
                $treatment = array(
                    'treatmentID' => $treatmentRow['Treatment_TreatmentID'],
                    'startDate' => $treatmentRow['Treatment_Start_Date'],
                    'endDate' => $treatmentRow['Treatment_End_Date'],
                    'doctor' => array(),
                    'medication' => array()
                );
                //ADD DOCTOR
                $doctorid = "SELECT Perform_DoctorID FROM perform WHERE Perform_TreatmentID = '{$treatmentRow['Treatment_TreatmentID']}'";
                $doctoridquery = $conn->query($doctorid);
                $doctors = array();
                while ($doctorRow = $doctoridquery->fetch_assoc()) {
                    $doctorID = $doctorRow['Perform_DoctorID'];
                    $query1doctor = "SELECT CONCAT(People_First_Name, ' ', People_Last_Name) as doctorname FROM people WHERE People_ID = '$doctorID'";
                    $doctorresult = $conn->query($query1doctor);
                    while ($row = $doctorresult->fetch_assoc()) {
                        $doctors[] = $row['doctorname'];
                    }
                }
                $treatment['doctor'] = $doctors;
                // ADD MEDICATION
                $medicationquery = "SELECT * FROM medication WHERE Medication_TreatmentID = '{$treatmentRow['Treatment_TreatmentID']}'";
                $medicationresult = $conn->query($medicationquery);

                while ($medicationRow = $medicationresult->fetch_assoc()) {
                        $medicationData = array('name' => $medicationRow['Medication_Name']);
                        $medicationData['effect'] = $medicationRow['Medication_Effects'];
                        $medicationData['price'] = $medicationRow['Medication_Price'];
                        $medicationData['expireDate'] = $medicationRow['Medication_Expiration_Date'];
                    $treatment['medication'][] = $medicationData;
                }
                $patient['Treatment'] = $treatment;
                
            }


            $patients[] = $patient;
        }

        // Return the data as JSON
        echo json_encode($patients, JSON_PRETTY_PRINT);
    } else {
        echo json_encode(array("message" => "No matching patients found."));
    }

    $conn->close();
}

if (isset($_POST['name'])) {
    retrievePatientData($_POST['name']);
} else {
    echo json_encode(array("message" => "Please provide a name for the search."));
}
?>