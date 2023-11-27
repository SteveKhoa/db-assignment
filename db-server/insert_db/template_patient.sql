-- DO NOT COPY AND PASTE THIS QUERY INTO phpMyAdmin, IT WONT WORK

INSERT INTO
    QUARATINE_CAMP_DB.Patient (
        Patient_PatientID,
        Patient_Identity_Number,
        Patient_Fullname,
        Patient_Gender,
        Patient_Address,
        Patient_Phone
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s,
        %s,
        %s
    )