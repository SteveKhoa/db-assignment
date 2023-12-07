-- Write a function to calculate the testing for each patient (1 mark). 
-- Input: Patient ID 
-- Output: A list of testing

-- We can not use Function here because function only return one single variable
-- In our case, only the Procedure can "return" a table. ("return" here means the result
-- table can be retrieved, but it is not the true return since procedures can not be used
-- in SELECT)

USE quaratine_camp_db;

DROP PROCEDURE IF EXISTS FindTesting;


DELIMITER $$

CREATE PROCEDURE FindTesting(IN PatientID CHAR(9))
BEGIN
    CREATE TEMPORARY TABLE TestTable (
        Testing_TestID CHAR(9) PRIMARY KEY,
        TestType CHAR(15) NOT NULL,
        TestDate Date
    );

    -- PCRTest
    INSERT INTO TestTable (Testing_TestID, TestType, TestDate)
    SELECT PCRTest_TestID, 'PCRTest' AS test_type, Testing_Date
    FROM PCRTest
    INNER JOIN Testing ON Testing.Testing_TestID = PCRTest.PCRTest_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- RespiratoryRate
    INSERT INTO TestTable (Testing_TestID, TestType, TestDate)
    SELECT RespiratoryRate_TestID, 'RespiratoryRate' AS test_type, Testing_Date
    FROM RespiratoryRate
    INNER JOIN Testing ON Testing.Testing_TestID = RespiratoryRate.RespiratoryRate_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- SPO2
    INSERT INTO TestTable (Testing_TestID, TestType, TestDate)
    SELECT SPO2_TestID, 'SPO2' AS test_type, Testing_Date
    FROM SPO2
    INNER JOIN Testing ON Testing.Testing_TestID = SPO2.SPO2_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- QuickTest
    INSERT INTO TestTable (Testing_TestID, TestType, TestDate)
    SELECT QuickTest_TestID, 'QuickTest' AS test_type, Testing_Date
    FROM QuickTest
    INNER JOIN Testing ON Testing.Testing_TestID = QuickTest.QuickTest_TestID
    WHERE Testing.Testing_PatientID = PatientID;

    -- You can use the TestTable as needed within this stored procedure
    SELECT * FROM TestTable;

    -- Optionally drop the temporary table when done
    DROP TEMPORARY TABLE IF EXISTS TestTable;
END $$

DELIMITER ;