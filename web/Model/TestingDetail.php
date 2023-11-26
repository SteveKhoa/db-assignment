<!--
    Requirement: List details of all testing which belong to a patient. (0.5 mark)
    Retrieve information about the SPECIFIC patient's testing table:
        - Input: Giving the name of the patient.
        - Retrieve all patient's id and get the testing detail for patient with that idea:
            + Retrieve tabel: Patient, Testing, PCRTest, RespiratoryRate, SPO2, QuickTest
    
        - Return xml data structure:
        <data>
            <patient>
                <name>Patient Name</name>
                <id>Patient Id</id>
                <test>
                    <entry>
                        <type>PCRTest</type>
                        <ctvalue></ctvalue>
                        <result></result>
                    </entry>
                    <entry>
                        <type>PCRTest</type>
                        <ctvalue></ctvalue>
                        <result></result>
                    </entry>
                    <entry>
                        <type>RespiratoryRate</type>
                        <breathpermin></breathpermin>
                    </entry>
                    <entry>
                        <type>SPO2</type>
                        <oxylevel></oxylevel>
                    </entry>
                    <entry>
                        <type>QuickTest</type>
                        <ctvalue></ctvalue>
                        <result></result>
                    </entry>
                </test>
            </patient>

            <patient>...</patient>
            <patient>...</patient>
            <patient>...</patient>
        </data>

        - Or you can also return a javascrip object or JSON
-->

<?php
function retrieveDatabase($name)
{

}

retrieveDatabase($_POST['name']);
?>