<!--
    Requirement: Make a report that provides full information about the patient including demographic information, comorbidities, symptoms, testing, and treatment. (0.5 mark)
    - Input: Giving the name of the patient.
    - Retrieve table:
        + Patient Table
        + Comorbidity Table
        + Symptom Table
        + Testing (PCRTest, RespiratoryRate, SPO2, QuickTest) Table
        + Treatment Table AND Perform Table AND Medication


    - Return xml data structure:
    <data>
        <patient>

            <name>patient fullname</name>
            <identity>identity</identity>
            <address>address</address>
            ...
            <comorbidity>
                <entry>
                    <type>comorbidity 1</type>
                </entry>
                <entry>...</entry>
            </comorbidity>

            <symptom>
                <entry>
                    <type>symptom 1</type>
                    <time></time>
                </entry>
                <entry>...</entry>
            </symptom>

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

            </treatment>
                <start></start>
                <end></end>

                <doctor>
                    <entry><name>Doctor A</name></entry>
                    <entry><name>Doctor B</name></entry>
                    ...
                </doctor>

                <medication>
                    <entry>
                        <name>Medication name</name>
                        <effect>Medication effect</effect>
                        <price>Medication price</price>
                        <expiration>Medication expiration</expiration>
                    </entry>

                    <entry>...</entry>
                </medication>
            </treatment>

        </patient>

        <patient>...</patient>
    </data>

    - Or you can also return javascript object of json, ...
-->

<?php
function retrieveDatabase($name)
{

}

retrieveDatabase($_POST['name'])
?>