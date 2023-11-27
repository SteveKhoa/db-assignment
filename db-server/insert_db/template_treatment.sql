-- DO NOT COPY AND PASTE THIS QUERY INTO phpMyAdmin, IT WONT WORK
INSERT INTO
    QUARATINE_CAMP_DB.Treatment (
        Treatment_Admitted_PatientID,
        Treatment_Start_Date,
        Treatment_End_Date,
        Treatment_TreatmentID
    )
VALUES
    (%s, %s, %s, %s)