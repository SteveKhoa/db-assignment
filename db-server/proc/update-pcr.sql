-- Update patient PCR test to positive with null cycle 
-- threshold value for all  patients whose admission date 
-- is from 01/09/2020. (0.5 mark) 

USE quaratine_camp_db;

DELIMITER $$ 

CREATE PROCEDURE UpdatePCR(
    startDate DATE
)
BEGIN
    UPDATE PCRTEST
    SET PCRTEST_CT_VALUE = NULL, PCRTEST_RESULT = 'POSITIVE'
    WHERE PCRTEST_TESTID IN ( 
        SELECT Testing_TestID 
        FROM TESTING
        JOIN ADMISSION ON TESTING.TESTING_STAFFID = ADMISSION.ADMISSION_STAFFID 
            AND TESTING.TESTING_PATIENTID = ADMISSION.ADMISSION_PATIENTID 
        WHERE ADMISSION.ADMISSION_DATE >= '2020-01-09');
END$$

DELIMITER ;