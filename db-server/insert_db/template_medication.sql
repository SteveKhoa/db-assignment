INSERT INTO
    QUARATINE_CAMP_DB.Medication (
        Medication_Admitted_PatientID,
        Medication_Code,
        Medication_Effects,
        Medication_Name,
        Medication_Price,
        Medication_Expiration_Date,
        Medication_TreatmentID
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s,
        %s,
        %s,
        %s
    )
