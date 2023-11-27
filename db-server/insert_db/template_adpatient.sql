-- DO NOT COPY AND PASTE THIS QUERY INTO phpMyAdmin, IT WONT WORK
INSERT INTO
    QUARATINE_CAMP_DB.AdmittedPatient (
        AdmittedPatient_BuildingID,
        AdmittedPatient_FloorID,
        AdmittedPatient_RoomID,
        AdmittedPatient_PatientID,
        AdmittedPatient_NurseID
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s,
        %s
    )