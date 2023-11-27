<!--
    Requirement: Search patient information: Search results include the name, phone number and information about his/her comorbidities. (0.5 mark)
    - Input: Giving the name of the patient.
    - Retrieve information of a specific patient:
        - Table "Patient"
        - Table "Comorbidity"

    Return: a xml data structure
        # Note: If you can, the data return can be: the patient information and his/her comorbidity list. For example:
        <data>
            <patient>
                <Name>Patient Name</Name>
                <Phone Number></Phone Number>
                <Comorbidity>
                    <entry>comorbidity 1</entry>
                    <entry>comorbidity 2</entry>
                    <entry>comorbidity 3</entry>
                </Comorbidity>
            </patient>

            <patient>...</patient>
        </data>

        - Or you can also return javascrip object or JSON, ... 
-->
<!-- This file combine with testingSearch.js file 
     This file will echo directly the result card-->
<!-- before using this file, insert to db some patient with some cormobidity to check -->
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

    $sql = "SELECT * FROM Patient WHERE Patient_Fullname LIKE '%$name%'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Echo a card for each patient
            echo "<div class='border border-3 border-warning rounded-3 d-flex flex-column align-items-center' style='margin: 10px 20%;'>";
            echo "<div class='border border-3 bg-warning d-flex justify-content-center rounded-3 mb-4 mt-2' style='height: 10%; width: 70%;'><h2>Patient Information</h2></div>";

            // Echo a card for the patient's ID
            echo "<div class='card rounded-3 mb-2' style='height: 20%; width: 80%;'>";
            echo "<div class='card-header' style='size: 20%;'>Patient ID</div>";
            echo "<div class='card-body'>" . $row['Patient_PatientID'] . "</div>";
            echo "</div>";

            // Echo a card for the patient's full name
            echo "<div class='card rounded-3 mb-2' style='height: 20%; width: 80%;'>";
            echo "<div class='card-header' style='size: 20%;'>Full Name</div>";
            echo "<div class='card-body'>" . $row['Patient_Fullname'] . "</div>";
            echo "</div>";

            // Echo a card for the patient's phone number
            echo "<div class='card rounded-3 mb-2' style='height: 20%; width: 80%;'>";
            echo "<div class='card-header' style='size: 20%;'>Phone</div>";
            echo "<div class='card-body'>" . $row['Patient_Phone'] . "</div>";
            echo "</div>";

            // Retrieve comorbidities for this patient
            $patientID = $row['Patient_PatientID'];
            $comorbidityQuery = "SELECT * FROM Comorbidity WHERE Comorbidity_PatientID = '$patientID'";
            $comorbidityResult = $conn->query($comorbidityQuery);

            // Echo a card for comorbidities
            echo "<div class='card rounded-3 mb-2' style='height: 20%; width: 80%;'>";
            echo "<div class='card-header' style='size: 20%;'>Comorbidities</div>";

            // Concatenate comorbidities into a single string with comma separation
            $comorbidities = array();
            while ($comorbidityRow = $comorbidityResult->fetch_assoc()) {
                $comorbidities[] = $comorbidityRow['Comorbidity_Comorbidity'];
            }
            $comorbiditiesString = implode(', ', $comorbidities);

            echo "<div class='card-body'>" . $comorbiditiesString . "</div>";

            echo "</div>"; // Close the comorbidity card
            echo "</div>"; // Close the patient card
        }
    } else {
        echo "No matching patients found.";
    }

    $conn->close();
}

if (isset($_POST['name'])) {
    retrieveDatabase($_POST['name']);
} else {
    echo "Please provide a name for the search.";
}
?>







