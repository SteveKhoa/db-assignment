INSERT INTO
    QUARATINE_CAMP_DB.Admission (
        Admission_PatientID,
        Admission_StaffID,
        Admission_Date,
        Admission_Patient_Location
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s,
        %s
    )
