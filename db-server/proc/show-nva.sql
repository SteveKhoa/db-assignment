-- Select all the patient information whose name is ‘Nguyen Van A’.

DELIMITER $$

CREATE PROCEDURE PatientInfo(
    IN p_name VARCHAR(255)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE ID INT;
    DECLARE IDNum VARCHAR(255);
    DECLARE address VARCHAR(255);
    DECLARE gender VARCHAR(10);
    DECLARE fullname VARCHAR(255);
    DECLARE phone VARCHAR(20);

    DECLARE cur CURSOR FOR
        SELECT PATIENT_PATIENTID AS ID,
               PATIENT_IDENTITY_NUMBER AS IDNum,
               PATIENT_ADDRESS AS address,
               PATIENT_GENDER AS gender,
               PATIENT_FULLNAME AS fullname,
               PATIENT_PHONE AS phone
        FROM PATIENT
        WHERE LOWER(PATIENT_FULLNAME) = LOWER(p_name);

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO ID, IDNum, address, gender, fullname, phone;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- You can process the data as needed, or simply print it for testing
        -- For example, you can use SELECT statements to return the results

        SELECT ID, IDNum, address, gender, fullname, phone;

    END LOOP;

    CLOSE cur;
END $$

DELIMITER ;
