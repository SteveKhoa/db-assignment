<!-- 
    Requirement: Add information for a new patient. (0.5 mark)
    - Add some information for a new patient into the database. Some information table such as:
        - Patient
        - Comorbidity
        - Symptoms
-->

<?php
    $data = json_decode(file_get_contents("php://input"), true);

    echo json_encode(["status" => "Received data successfully"]);
?>