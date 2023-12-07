-- Select all the patient information whose name is ‘Nguyen Van A’.

-- Awaiting to be changed

USE quaratine_camp_db;

DROP PROCEDURE IF EXISTS PatientInfo;

DELIMITER $$

CREATE PROCEDURE PatientInfo(
    IN p_name VARCHAR(1024)
)
BEGIN
    SELECT 
		Patient_PatientID AS ID, 
		Patient_Identity_Number AS `Identity Number`,  
        Patient_Fullname AS Fullname, 
        Patient_Gender AS Gender, 
        Patient_Address AS Address, 
        Patient_Phone AS Phone, 
        DischargePatient_Date AS `Discharge Date`, 
        Admission_Date AS `Admitted Date`, 
        Admission_Patient_Location AS `Admitted From`, 
        AdmittedPatient_BuildingID AS `Building`, 
        AdmittedPatient_FloorID AS `Floor`, 
        AdmittedPatient_RoomID AS `Room`, 
        AdmittedPatient_NurseID  AS `Nurse ID`
        FROM  Patient LEFT JOIN DischargePatient ON Patient.Patient_PatientID = DischargePatient.DischargePatient_PatientID
		LEFT JOIN Admission ON Patient.Patient_PatientID = Admission.Admission_PatientID
		LEFT JOIN AdmittedPatient ON Patient.Patient_PatientID = AdmittedPatient.AdmittedPatient_PatientID
        WHERE Patient_Fullname LIKE CONCAT('%', p_name, '%')
    ;
END$$

DELIMITER ;
