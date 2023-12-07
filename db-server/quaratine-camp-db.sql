-- ======================================
-- quaratine-camp-db.sql
-- 
-- Author: Kien Le, Editor: NKhoa
--
-- Description:
-- This SQL code defines only (1) the definition of tables and (2) their foreign keys
-- and (3) constraints applied on the table. Do not include other functionalities not related
-- to the structure of the tables into this file. Please consider using another file for that purpose.
--
-- If a database for these tables already exists, that database will be overwritten with a new database.
-- SO, USE THIS FILE ONLY WHEN YOU WANT THE NEWLY DEFINED DATABASE.
--
-- Revision history:
-- 1. (02/11), nkhoa: propose a few changes
-- ======================================

DROP DATABASE IF EXISTS QUARATINE_CAMP_DB;

CREATE DATABASE QUARATINE_CAMP_DB;

USE QUARATINE_CAMP_DB;

-- Datatypes, Datalength, Constraints explanations:
-- VARCHAR(1024) should probably cover the longest case of fullname, (longest name on earth is 747 letters)
-- VARCHAR(256) should probably cover the longest case of address (the longest address on earth is about ~100 letters)
-- Phone, 10 digits because: https://en.sggp.org.vn/11-digit-mobile-phone-numbers-to-be-changed-to-10-digits-post72417.html
-- Gender, 1 digit because : we would use a single character code, such as 'M' <Male> or 'F' <Female> or 'O' <Other>, to represent the gender of the patient.
-- PatientID or ID has 9 digits because: we reference to the first assignment subject "HOSPITAL", which has 9 digits for ID
-- Identity_Number, 12 digits because: the ID number in identity card in Viet Nam has 12 digits.
CREATE TABLE Patient 
(	
	Patient_PatientID			CHAR(9)	    PRIMARY KEY ,
    Patient_Identity_Number     CHAR(12)     NOT NULL, 
    Patient_Address		        VARCHAR(256),
    Patient_Gender			    CHAR(1),
    Patient_Fullname		    VARCHAR(1024)	NOT NULL,
    Patient_Phone               CHAR(10)     NOT NULL
);

CREATE TABLE DischargePatient 
(	
	DischargePatient_PatientID	  CHAR(9)	PRIMARY KEY,
    DischargePatient_Date         DATE,
    CONSTRAINT 	fk_disID_from_paID FOREIGN KEY (DischargePatient_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
); 
-- Datatypes, Datalength, Constraints explanations:
-- Room_Capacity: using INT type because we want to store the maximum patient number in the room
-- Room_Type has 1 digit because :'N' represent for normal room, 'E' for emergency room, and 'R' for recuperation room.
CREATE TABLE Room 
(	
	Room_BuildingID			    CHAR(9)     NOT NULL,
    Room_FloorID			    CHAR(9)     NOT NULL,
    Room_RoomID			        CHAR(9)     NOT NULL,
    Room_Type                   CHAR(1),
    Room_Capacity               INT,
    PRIMARY KEY(Room_BuildingID, Room_FloorID, Room_RoomID)
);

-- Datatypes, Datalength, Constraints explanations:
-- Giving 512 for each first_name and last_name will be safer.
-- People_eType Using 1 digit to determine type of people:
--       'N' is nurse
--       'D' is doctor
--       'V' is volunteer
--       'S' is staff
-- we separate the type manager as another table to easy for controlling as manager cannot overlap 
-- with above types
CREATE TABLE People 
(	
	People_ID			    CHAR(9)     PRIMARY KEY,
    People_First_Name	    VARCHAR(512) NOT NULL, 
    People_Last_Name        VARCHAR(512) NOT NULL,
    People_eType      CHAR(1)
);

CREATE TABLE AdmittedPatient 
(	
    AdmittedPatient_BuildingID          CHAR(9), 
    AdmittedPatient_FloorID             CHAR(9), 
    AdmittedPatient_RoomID              CHAR(9), 
	AdmittedPatient_PatientID	        CHAR(9)	PRIMARY KEY,
    AdmittedPatient_NurseID             CHAR(9) NOT NULL,
    CONSTRAINT	fk_APbuilID_from_buiID	FOREIGN KEY (AdmittedPatient_BuildingID, AdmittedPatient_FloorID, AdmittedPatient_RoomID)
				REFERENCES Room(Room_BuildingID, Room_FloorID, Room_RoomID)
				ON DELETE SET NULL,
    CONSTRAINT 	fk_AdmitID_from_paID FOREIGN KEY (AdmittedPatient_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE,
    CONSTRAINT	fk_APnurseID_from_nurID	FOREIGN KEY (AdmittedPatient_NurseID)
				REFERENCES People(People_ID)   
				ON DELETE CASCADE
);

-- Datatypes, Datalength, Constraints explanations:
-- Comorbidity should be 50 characters max, since the longest sickness name is 45 words long, https://en.wikipedia.org/wiki/Pneumonoultramicroscopicsilicovolcanoconiosis
CREATE TABLE Comorbidity 
(	
	Comorbidity_PatientID		CHAR(9)	    NOT NULL,
    Comorbidity_Comorbidity		VARCHAR(50) NOT NULL,
    PRIMARY KEY (Comorbidity_PatientID, Comorbidity_Comorbidity),
    CONSTRAINT 	fk_ComoID_from_paID FOREIGN KEY (Comorbidity_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
);
-- Datatypes, Datalength, Constraints explanations:
-- Same reason for comorbidity, the longest sickness name is 45 words, so giving it 50 words probably safe

CREATE TABLE Symptoms 
(
	Symptoms_Time			DATETIME        NOT NULL,
    Symptoms_PatientID	    CHAR(9)     NOT NULL, 
    Symptoms_Symptoms        VARCHAR(50) NOT NULL,
    PRIMARY KEY (Symptoms_Time, Symptoms_PatientID, Symptoms_Symptoms),
    CONSTRAINT 	fk_symID_from_paID FOREIGN KEY (Symptoms_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Managers
(	
	Manager_ManagerID			CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	maId_ppID FOREIGN KEY (Manager_ManagerID)
				REFERENCES People(People_ID) 
				ON DELETE CASCADE
);

CREATE TABLE HeadOfTheCamp 
(	
	HeadOfTheCamp_DoctorID			    CHAR(9)     NOT NULL,
    HeadOfTheCamp_ManagerID			    CHAR(9)     NOT NULL,
    PRIMARY KEY (HeadOfTheCamp_DoctorID, HeadOfTheCamp_ManagerID),
    CONSTRAINT 	headmaID_from_maID FOREIGN KEY (HeadOfTheCamp_ManagerID)
				REFERENCES Managers(Manager_ManagerID) 
				ON DELETE CASCADE,
    CONSTRAINT 	headdoc_from_ma_doctorID FOREIGN KEY (HeadOfTheCamp_DoctorID)
				REFERENCES People(People_ID) 
				ON DELETE CASCADE
);

-- Datatypes, Datalength, Constraints explanations:
-- Patient_Location should be 256 chars long, that is safer
CREATE TABLE Admission 
(	
    Admission_PatientID         CHAR(9) NOT NULL, 
    Admission_StaffID           CHAR(9) NOT NULL, 
    Admission_Date              DATE, 
	Admission_Patient_Location	VARCHAR(256),
    PRIMARY KEY (Admission_PatientID, Admission_StaffID),
    CONSTRAINT 	fk_admisID_from_adID FOREIGN KEY (Admission_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE CASCADE,
    CONSTRAINT 	fk_adstaffID_from_staffID FOREIGN KEY (Admission_StaffID)
				REFERENCES People(People_ID)
				ON DELETE CASCADE
);

CREATE TABLE Treatment 
(	
    Treatment_Admitted_PatientID	    CHAR(9)     NOT NULL, 
    Treatment_Start_Date	            DATE        NOT NULL, 
    Treatment_End_Date	                DATE        , 
    Treatment_TreatmentID               CHAR(9)     NOT NULL,
    PRIMARY KEY (Treatment_Admitted_PatientID, Treatment_TreatmentID),
    CONSTRAINT 	treatID_from_adID FOREIGN KEY (Treatment_Admitted_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Perform 
(	
	Perform_DoctorID			    CHAR(9)     NOT NULL,
    Perform_Admitted_PatientID	    CHAR(9)     NOT NULL, 
    Perform_TreatmentID             CHAR(9)     NOT NULL,
    PRIMARY KEY (Perform_DoctorID, Perform_Admitted_PatientID, Perform_TreatmentID),
    CONSTRAINT 	perform_docID_from_docID FOREIGN KEY (Perform_DoctorID)
				REFERENCES People(People_ID)
				ON DELETE CASCADE,
    CONSTRAINT 	perform_admitID_from_admitID FOREIGN KEY (Perform_Admitted_PatientID,Perform_TreatmentID)
				REFERENCES Treatment(Treatment_Admitted_PatientID,Treatment_TreatmentID) 
				ON DELETE CASCADE
);
-- Datatypes, Datalength, Constraints explanations:
-- Medication_Code : 10 character, according to https://en.wikipedia.org/wiki/National_drug_code
-- Medication_Effects : VARCHAR(1024) should probably cover the longest description for a medication.
-- Medication_Name : VARCHAR(64) is enough for a drug name, names too long are not readable for humans
-- Medication_Price :DECIMAL(10,2) indicates a decimal number with a total of 12 digits, 2 of which are after the decimal point
--                    - it should probably cover the most expensive case for drug price (at about 6 digits for $2,125,000 ~ 51.595.000.000 VND https://pharmaoffer.com/blog/10-most-expensive-drugs-in-the-world/)
--                    - it should probably cover the cheappest case for drug price 
-- we set Medication_Effects be a small desciption about the medicine effect that we assume it is not last for 1024 digits
CREATE TABLE Medication 
(	
	Medication_Admitted_PatientID	    CHAR(9)     NOT NULL, 
    Medication_Code                     CHAR(10)     PRIMARY KEY, 
    Medication_Effects		            VARCHAR(1024),
    Medication_Name                     VARCHAR(64),
    Medication_Price			        DECIMAL(12,2),
    Medication_Expiration_Date		    DATE        NOT NULL,
    Medication_TreatmentID              CHAR(9)     NOT NULL,
    CONSTRAINT 	medi_admitID_from_admitID FOREIGN KEY (Medication_Admitted_PatientID,Medication_TreatmentID)
				REFERENCES Treatment(Treatment_Admitted_PatientID,Treatment_TreatmentID) 
				ON DELETE CASCADE
);

CREATE TABLE TakeAction 
(	
	TakeAction_PatientID			    CHAR(9)     NOT NULL,
    TakeAction_DoctorID			        CHAR(9)     NOT NULL,
    PRIMARY KEY (TakeAction_PatientID, TakeAction_DoctorID),
    CONSTRAINT 	takeactionID_from_adID FOREIGN KEY (TakeAction_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE CASCADE,
    CONSTRAINT 	takeactiondoc_from_doctorID FOREIGN KEY (TakeAction_DoctorID)
				REFERENCES People(People_ID)  
				ON DELETE CASCADE
);
                
CREATE TABLE LocationHistory 
(	
	LocationHistory_BuildingID			  CHAR(9)       ,
    LocationHistory_FloorID			      CHAR(9)       ,
    LocationHistory_RoomID			      CHAR(9)       ,
    LocationHistory_Admitted_PatientID    CHAR(9)       NOT NULL,
    LocationHistory_HistoryID             CHAR(9)       NOT NULL,  
    LocationHistory_Date                  DATE,      
    PRIMARY KEY (LocationHistory_Admitted_PatientID, LocationHistory_HistoryID),
    CONSTRAINT	locationhis_APbuilID_from_buiID	FOREIGN KEY (LocationHistory_BuildingID,LocationHistory_FloorID,LocationHistory_RoomID)
				REFERENCES Room(Room_BuildingID,Room_FloorID,Room_RoomID),
    CONSTRAINT 	locationhisID_from_adID FOREIGN KEY (LocationHistory_Admitted_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Testing
(	
	Testing_PatientID			CHAR(9)     NOT NULL,
    Testing_TestID			    CHAR(9)     PRIMARY KEY,
    Testing_StaffID			    CHAR(9),
    Testing_Date	            Date,
    CONSTRAINT 	Testing_pID_from_paID FOREIGN KEY (Testing_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE,
    CONSTRAINT 	Testing_staffID_from_paID FOREIGN KEY (Testing_StaffID)
				REFERENCES Admission(Admission_StaffID) 
				ON DELETE SET NULL
);

-- Datatypes, Datalength, Constraints explanations:
-- DECIMAL(2,0) is enough
-- CT Values is an integer number, usually ranging from
-- 0 (very infectious) to 40-45 (no virus at all)
-- so i think an integer that has 2 digits is enough
-- the result can be "positive" or "negative" or "undefined" so VARCHAR(10) is enough 
CREATE TABLE PCRTest 
(	
	PCRTest_TestID			    CHAR(9)        PRIMARY KEY,
    PCRTest_Ct_Value	        DECIMAL(2,0), 
    PCRTest_Result              VARCHAR(10),
    CONSTRAINT 	PCR_testID_from_test FOREIGN KEY (PCRTest_TestID)
				REFERENCES Testing(Testing_TestID) 
				ON DELETE CASCADE
);

CREATE TABLE RespiratoryRate 
(	
	RespiratoryRate_TestID			                    CHAR(9)     PRIMARY KEY,
    RespiratoryRate_Number_Of_Breath_Per_Minute	        INT,
    CONSTRAINT 	Respi_testID_from_test FOREIGN KEY (RespiratoryRate_TestID)
				REFERENCES Testing(Testing_TestID) 
				ON DELETE CASCADE
);
-- Datatypes, Datalength, Constraints explanations:
-- The standard unit of oxygen saturation <SPO2> is percent (%) so DECIMAL(3,1) is enough
CREATE TABLE SPO2 
(	
	SPO2_TestID			                CHAR(9)     PRIMARY KEY,
    SPO2_Blood_Oxygen_Levels	        DECIMAL(3,1),
    CONSTRAINT 	SPO2_testID_from_test FOREIGN KEY (SPO2_TestID)
				REFERENCES Testing(Testing_TestID) 
				ON DELETE CASCADE
);

CREATE TABLE QuickTest 
(	
	QuickTest_TestID			CHAR(9)     PRIMARY KEY,
    QuickTest_Result            VARCHAR(15), 
    QuickTest_Ct_Value	        DECIMAL(2,0),
    CONSTRAINT 	QuickTest_testID_from_test FOREIGN KEY (QuickTest_TestID)
				REFERENCES Testing(Testing_TestID) 
				ON DELETE CASCADE
);

-- Additional table does not exist in original design.
-- To facilitate Login-Logout service on our application.
-- Users_Password is always a SHA-1 (160 bits output) hashed string.
CREATE TABLE Users
(
    Users_Name VARCHAR(64) PRIMARY KEY,
    Users_Password CHAR(160)
);

-- Account: 
--      testAdmin
--      123456789
INSERT INTO Users VALUES ("testAdmin", "f7c3bc1d808e04732adf679965ccc34ca7ae3441");