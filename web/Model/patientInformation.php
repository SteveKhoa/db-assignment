<?php
function retrieveDatabase($name)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "QUARATINE_CAMP_DB";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //$name = $conn->real_escape_string($name);
    $sql = $conn->prepare("SELECT * FROM Patient WHERE Patient_Fullname LIKE CONCAT('%', ?, '%')");
    $sql->bind_param("s",$name);
    $sql->execute();
    $result = $sql->get_result();
    //$result = $conn->query($sql);

    $patients = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $patient = array(
                'name' => $row['Patient_Fullname'],
                'patientID' => $row['Patient_PatientID'],
                'patientPhone' => $row['Patient_Phone']
            );

            // Retrieve comorbidities for this patient
            $patientID = $row['Patient_PatientID'];
            $comorbidityQuery = "SELECT * FROM Comorbidity WHERE Comorbidity_PatientID = '$patientID'";
            $comorbidityResult = $conn->query($comorbidityQuery);

            $comorbidities = array();
            while ($comorbidityRow = $comorbidityResult->fetch_assoc()) {
                $comorbidities[] = $comorbidityRow['Comorbidity_Comorbidity'];
            }

            $patient['patientComorbidities'] = $comorbidities;

            $patients[] = $patient;
        }
    } else {
        echo json_encode(array("message" => "No matching patients found."));
        return;
    }

    $conn->close();

    echo json_encode($patients, JSON_PRETTY_PRINT);
}

if (isset($_POST['name'])) {
    retrieveDatabase($_POST['name']);
} else {
    echo json_encode(array("message" => "Please provide a name for the search."));
}
?>
