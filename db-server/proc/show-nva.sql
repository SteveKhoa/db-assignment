CREATE OR REPLACE TYPE PatientType AS OBJECT (
    Patient_PatientID			CHAR(9),
    Patient_Identity_Number     CHAR(9), 
    Patient_Address		        VARCHAR(30),
    Patient_Gender			    CHAR(1),
    Patient_Fullname		    VARCHAR(55),
    Patient_Phone               CHAR(9)
)

CREATE OR REPLACE TYPE PatientList AS TABLE OF PatientType;

CREATE or REPLACE FUNCTION PatientInfo(
    p_name IN PATIENT_FULLNAME%TYPE
)
RETURN PatientList PIPELINED AS
BEGIN
    FOR patient_rec IN (SELECT PATIENT_PATIENTID AS ID, PATIENT_IDENTITY_NUMBER as IDNum, PATIENT_ADDRESS as address, PATIENT_GENDER as gender, PATIENT_FULLNAME as fullname, PATIENT_PHONE as phone
    FROM PATIENT WHERE LOWER(PATIENT_FULLNAME) = LOWER('Nguyen Van A')) LOOP 
        PIPE ROW(PatientType(ID, IDNum, address, gender, fullname, phone));
    END LOOP;
    RETURN;
END PatientInfo;