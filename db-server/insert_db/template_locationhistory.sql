INSERT INTO
    QUARATINE_CAMP_DB.LocationHistory (
        LocationHistory_BuildingID,
        LocationHistory_FloorID,
        LocationHistory_RoomID,
        LocationHistory_Admitted_PatientID,
        LocationHistory_HistoryID,
        LocationHistory_Date
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
