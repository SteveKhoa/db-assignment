-- ===========================================================
-- Write a procedure to sort the nurses in decreasing number of patients 
--       he/she  takes care in a period of time (1 mark).  
-- Input: Start date, End date 
-- Output: A list of sorting nurses. 
-- ===========================================================
-- =========== DRAFT file, NOT testing yet====================
-- ===========================================================

USE QUARATINE_CAMP_DB;

CREATE PROCEDURE SortNursesByPatients(
    IN startDate DATE,
    IN endDate DATE
)
BEGIN
    -- Create a temporary table to store the nurse ID and the count of patients they take care of
    CREATE TEMPORARY TABLE NursePatientCount AS
    SELECT
        ap.AdmittedPatient_NurseID AS NurseID,
        COUNT(a.Admission_PatientID) AS PatientCount
    FROM
        Admission a
    JOIN AdmittedPatient ap ON a.Admission_PatientID = ap.AdmittedPatient_PatientID
    WHERE
        a.Admission_Date BETWEEN startDate AND endDate
    GROUP BY
        ap.AdmittedPatient_NurseID;

    -- Retrieve the nurse details and sort them based on the patient count
    SELECT
        p.People_ID AS NurseID,
        p.People_First_Name,
        p.People_Last_Name,
        NPC.PatientCount
    FROM
        People p
    JOIN NursePatientCount NPC ON p.People_ID = NPC.NurseID
    WHERE
        p.People_eType = 'N'
    ORDER BY
        NPC.PatientCount DESC;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS NursePatientCount;
END; 
