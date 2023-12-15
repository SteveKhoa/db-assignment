-- Write a procedure to sort the nurses in decreasing number 
-- of patients he/she  takes care in a period of time (1 mark).
-- Input: Start date, End date 
-- Output: A list of sorting nurses. 

USE quaratine_camp_db;

DROP PROCEDURE IF EXISTS SortNursesByPatients;

DELIMITER $$

CREATE PROCEDURE SortNursesByPatients(
    IN startDate DATE,
    IN endDate DATE
)
BEGIN
    -- Create a temporary table to store the nurse ID and the count of patients they take care of
    CREATE TEMPORARY TABLE IF NOT EXISTS NursePatientCount
    SELECT 
        NurseID, 
        COUNT(DISTINCT PatientID, AdmittedDate) as PatientCount
    FROM PatientHistory
    WHERE AdmittedDate BETWEEN startDate AND endDate
    GROUP BY NurseID;
        
    -- Retrieve the nurse details and sort them based on the patient count
    SELECT
        p.People_ID as NurseID,
        p.People_First_Name as Firstname,
        p.People_Last_Name as Lastname,
        NPC.PatientCount as PatientCount
    FROM
        People p JOIN NursePatientCount NPC ON p.People_ID = NPC.NurseID
    WHERE
        p.People_eType = 'N'
    ORDER BY
        NPC.PatientCount DESC;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS NursePatientCount;
END $$

DELIMITER ;
