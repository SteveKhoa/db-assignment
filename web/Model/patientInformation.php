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
<?php
function retrieveDatabase($name)
{

}

retrieveDatabase($_POST['name']);
?>