<?php

function retrievePatientData($name, $date)
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

            // Retrieve testing information for this patient
            $testingQuery = "SELECT * FROM Testing WHERE Testing_PatientID = '{$row['Patient_PatientID']}' AND Testing_Date <= '{$date}'";
            $testingResult = $conn->query($testingQuery);

            if ($testingResult->num_rows <= 0) { continue; }

            $patient = array(
                'name' => $row['Patient_Fullname'],
                'patientID' => $row['Patient_PatientID'],
                'Testing' => array()
            );

            while ($testingRow = $testingResult->fetch_assoc()) {

                // Fetch data from each testing table
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
                $testingData['testDate'] = $testingRow['Testing_Date'] ;
                $patient['Testing'][] = $testingData;
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
    retrievePatientData($_POST['name'], $_POST['date']);
} else {
    echo json_encode(array("message" => "Please provide a name for the search."));
}
?>
