-- DO NOT COPY AND PASTE THIS QUERY INTO phpMyAdmin, IT WONT WORK
INSERT INTO
    QUARATINE_CAMP_DB.People (
        People_ID,
        People_First_Name,
        People_Last_Name,
        People_eType
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s
    )