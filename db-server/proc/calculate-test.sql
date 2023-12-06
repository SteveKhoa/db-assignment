DELIMITER $$

CREATE PROCEDURE FindTesting(IN PatientID CHAR(9))
BEGIN
    CREATE TEMPORARY TABLE TestTable (
        Testing_TestID CHAR(9) PRIMARY KEY,
        TestType CHAR(15) NOT NULL
    );

    -- PCRTest
    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT PCRTest_TestID, 'PCRTest' AS test_type
    FROM PCRTest
    INNER JOIN Testing ON Testing.Testing_TestID = PCRTest.PCRTest_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- RespiratoryRate
    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT RespiratoryRate_TestID, 'RespiratoryRate' AS test_type
    FROM RespiratoryRate
    INNER JOIN Testing ON Testing.Testing_TestID = RespiratoryRate.RespiratoryRate_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- SPO2
    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT SPO2_TestID, 'SPO2' AS test_type
    FROM SPO2
    INNER JOIN Testing ON Testing.Testing_TestID = SPO2.SPO2_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- QuickTest
    INSERT INTO TestTable (Testing_TestID, TestType)
    SELECT QuickTest_TestID, 'QuickTest' AS test_type
    FROM QuickTest
    INNER JOIN Testing ON Testing.Testing_TestID = QuickTest.QuickTest_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- You can use the TestTable as needed within this stored procedure
    SELECT * FROM TestTable;

    -- Optionally drop the temporary table when done
    DROP TEMPORARY TABLE IF EXISTS TestTable;
END $$

DELIMITER ;