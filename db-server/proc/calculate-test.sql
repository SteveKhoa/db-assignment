/* Function to calculate the testing for each patient */
CREATE FUNCTION FIND_TESTING(@PatientID CHAR(9))
RETURNS  @TestTable TABLE (Testing_TestID CHAR(9) PRIMARY KEY
                           TestType       CHAR(15) NOT NULL) 
AS 
BEGIN
    /* TABLE FORMAT
    Testing_TestID | TestType
    0001           | SP02
    0002           | PCRTest
    */
    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT PCRTest_TestID, 'PCRTest' AS test_type
    FROM PCRTest
    INNER JOIN Testing ON Testing.Testing_TestID = PCRTest.PCRTest_TestID;
    WHERE EXISTS (SELECT Testing_PatientID FROM Testing WHERE Testing_PatientID = @PatientID);

    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT RespiratoryRate_TestID, 'RespiratoryRate' AS test_type
    FROM RespiratoryRate
    INNER JOIN Testing ON Testing.Testing_TestID = RespiratoryRate.RespiratoryRate_TestID;
    WHERE EXISTS (SELECT Testing_PatientID FROM Testing WHERE Testing_PatientID = @PatientID);

    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT SPO2_TestID, 'SP02' AS test_type
    FROM SP02
    INNER JOIN Testing ON Testing.Testing_TestID = SP02.SPO2_TestID;
    WHERE EXISTS (SELECT Testing_PatientID FROM Testing WHERE Testing_PatientID = @PatientID);

    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT QuickTest_TestID, 'QuickTest' AS test_type
    FROM QuickTest
    INNER JOIN Testing ON Testing.Testing_TestID = QuickTest.QuickTest_TestID;
    WHERE EXISTS (SELECT Testing_PatientID FROM Testing WHERE Testing_PatientID = @PatientID);
END