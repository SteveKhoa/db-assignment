-- Update patient PCR test to positive with null cycle 
-- threshold value for all  patients whose admission date 
-- is from 01/09/2020. (0.5 mark) 

USE quaratine_camp_db;

DROP PROCEDURE IF EXISTS UpdatePCR;

DELIMITER $$ 

CREATE PROCEDURE UpdatePCR(
    fromAdmissionDate DATE
)
BEGIN
    UPDATE PCRTEST
    SET PCRTest_Result = 'Positive'
    WHERE PCRTest_TestID IN ( 
            SELECT Testing_TestID 
            FROM TESTING JOIN ADMISSION 
                ON TESTING.TESTING_STAFFID = ADMISSION.ADMISSION_STAFFID 
                AND TESTING.TESTING_PATIENTID = ADMISSION.ADMISSION_PATIENTID 
            WHERE ADMISSION.ADMISSION_DATE >= fromAdmissionDate)
        AND (
            PCRTest_Ct_Value IS NULL 
            OR PCRTest_Ct_Value = 0);
END$$

DELIMITER ;