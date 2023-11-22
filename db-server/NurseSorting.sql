--===========================================================
-- Write a procedure to sort the nurses in decreasing number of patients 
--       he/she  takes care in a period of time (1 mark).  
-- Input: Start date, End date 
-- Output: A list of sorting nurses. 
--===========================================================
--=========== DRAFT file, NOT testing yet====================
--===========================================================

-- Create a stored procedure
CREATE PROCEDURE SortNursesByPatientCount(
    IN StartDate DATE,
    IN EndDate DATE
)
BEGIN
    -- Create a temporary table to store nurse patient counts
    CREATE TEMPORARY TABLE TempNursePatientCount AS
    WITH NursePatientCount AS (
        SELECT
            ap.AdmittedPatient_NurseID,
            COUNT(ap.AdmittedPatient_PatientID) AS PatientCount
        FROM
            AdmittedPatient ap
        WHERE
            ap.AdmittedPatient_Take_Care_Date BETWEEN StartDate AND EndDate
        GROUP BY
            ap.AdmittedPatient_NurseID
    )
    SELECT
        npc.People_ID AS NurseID,
        npc.People_First_Name AS FirstName,
        npc.People_Last_Name AS LastName,
        npc.PatientCount
    FROM
        NursePatientCount npc
    JOIN
        People p ON npc.People_ID = p.People_ID
    WHERE
        p.People_Nurse_Flag = TRUE
    ORDER BY
        npc.PatientCount DESC;

    -- Drop the temporary table
    DROP TEMPORARY TABLE IF EXISTS TempNursePatientCount;
END;
