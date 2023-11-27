-- DO NOT COPY AND PASTE THIS QUERY INTO phpMyAdmin, IT WONT WORK
INSERT INTO
    QUARATINE_CAMP_DB.Perform (
        Perform_DoctorID,
        Perform_Admitted_PatientID,
        Perform_TreatmentID
    )
VALUES
    (%s, %s, %s)