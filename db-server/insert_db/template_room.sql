-- DO NOT COPY AND PASTE THIS QUERY INTO phpMyAdmin, IT WONT WORK
INSERT INTO
    QUARATINE_CAMP_DB.Room (
        Room_BuildingID,
        Room_FloorID,
        Room_RoomID,
        Room_Type,
        Room_Capacity
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s,
        %s
    )