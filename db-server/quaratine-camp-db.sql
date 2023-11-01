CREATE TABLE Patient 
(	
	Patient_PatientID			CHAR(9)	    PRIMARY KEY ,
    Patient_Identity_Number     CHAR(9)     NOT NULL, 
    Patient_Address		        VARCHAR(30),
    Patient_Gender			    CHAR(1),
    Patient_Fullname		    VARCHAR(55)	NOT NULL,
    Patient_Phone               CHAR(9)     NOT NULL
);

CREATE TABLE DischargePatient 
(	
	DischargePatient_PatientID	  CHAR(9)	PRIMARY KEY,
    DischargePatient_Date         DATE,
    CONSTRAINT 	fk_disID_from_paID FOREIGN KEY (DischargePatient_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE AdmittedPatient 
(	
    AdmittedPatient_BuildingID          CHAR(9), 
    AdmittedPatient_FloorID             CHAR(9), 
    AdmittedPatient_RoomID              CHAR(9), 
	AdmittedPatient_PatientID	        CHAR(9)	PRIMARY KEY,
    AdmittedPatient_NurseID             CHAR(9) NOT NULL,
    CONSTRAINT 	fk_AdmitID_from_paID FOREIGN KEY (AdmittedPatient_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Comorbidity 
(	
	Comorbidity_PatientID		CHAR(9)	    NOT NULL,
    Comorbidity_Comorbidity		VARCHAR(30) NOT NULL,
    PRIMARY KEY (Comorbidity_PatientID, Comorbidity_Comorbidity),
    CONSTRAINT 	fk_ComoID_from_paID FOREIGN KEY (Comorbidity_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Symptom 
(	
	Symtom_Time			DATE     NOT NULL,
    Symtom_PatientID	CHAR(9)  NOT NULL, 
    PRIMARY KEY (Symtom_Time, Symtom_PatientID),
    CONSTRAINT 	fk_symID_from_paID FOREIGN KEY (Symtom_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Symptoms 
(	
	Symtoms_Time			DATE        NOT NULL,
    Symtoms_PatientID	    CHAR(9)     NOT NULL, 
    Symtoms_Symptoms        VARCHAR(30) NOT NULL,
    PRIMARY KEY (Symtoms_Time, Symtoms_PatientID, Symtoms_Symptoms),
    CONSTRAINT 	fk_symtime_from_symstim FOREIGN KEY (Symtoms_Time, Symtoms_PatientID)
				REFERENCES Symptom(Symtom_Time,Symtom_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE People 
(	
	People_ID			    CHAR(9)     PRIMARY KEY,
    People_First_Name	    VARCHAR(15) NOT NULL, 
    People_Last_Name        VARCHAR(15) NOT NULL
);

CREATE TABLE Employee 
(	
	Employee_EmployeeID			CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	emId_ppID FOREIGN KEY (Employee_EmployeeID)
				REFERENCES People(People_ID) 
				ON DELETE CASCADE
);

CREATE TABLE Managers
(	
	Manager_ManagerID			CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	maId_ppID FOREIGN KEY (Manager_ManagerID)
				REFERENCES People(People_ID) 
				ON DELETE CASCADE
);

CREATE TABLE Doctor 
(	
	Doctor_DoctorID			    CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	DoId_EmID FOREIGN KEY (Doctor_DoctorID)
				REFERENCES Employee(Employee_EmployeeID) 
				ON DELETE CASCADE
);

CREATE TABLE Volunteer 
(	
	Volunteer_VolunteerID		CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	VoId_EmID FOREIGN KEY (Volunteer_VolunteerID)
				REFERENCES Employee(Employee_EmployeeID) 
				ON DELETE CASCADE
);

CREATE TABLE Staff 
(	
	Staff_StaffID			    CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	staffId_EmID FOREIGN KEY (Staff_StaffID)
				REFERENCES Employee(Employee_EmployeeID) 
				ON DELETE CASCADE
);

CREATE TABLE Nurse 
(	
	Nurse_NurseID			    CHAR(9)     PRIMARY KEY,
    CONSTRAINT 	nurseId_EmID FOREIGN KEY (Nurse_NurseID)
				REFERENCES Employee(Employee_EmployeeID) 
				ON DELETE CASCADE
);

ALTER TABLE AdmittedPatient
ADD CONSTRAINT	fk_APnurseID_from_nurID	FOREIGN KEY (AdmittedPatient_NurseID)
				REFERENCES Nurse(Nurse_NurseID)
				ON DELETE SET NULL;

CREATE TABLE HeadOfTheCamp 
(	
	HeadOfTheCamp_DoctorID			    CHAR(9)     NOT NULL,
    HeadOfTheCamp_ManagerID			    CHAR(9)     NOT NULL,
    PRIMARY KEY (HeadOfTheCamp_DoctorID, HeadOfTheCamp_ManagerID),
    CONSTRAINT 	headmaID_from_maID FOREIGN KEY (HeadOfTheCamp_ManagerID)
				REFERENCES Managers(Manager_ManagerID) 
				ON DELETE CASCADE,
    CONSTRAINT 	headdoc_from_doctorID FOREIGN KEY (HeadOfTheCamp_DoctorID)
				REFERENCES Doctor(Doctor_DoctorID) 
				ON DELETE CASCADE
);


CREATE TABLE Admission 
(	
    Admission_PatientID         CHAR(9) NOT NULL, 
    Admission_StaffID           CHAR(9) NOT NULL, 
    Admission_Date              DATE, 
	Admission_Patient_Location	VARCHAR(30),
    PRIMARY KEY (Admission_PatientID, Admission_StaffID),
    CONSTRAINT 	fk_admisID_from_adID FOREIGN KEY (Admission_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE CASCADE,
    CONSTRAINT 	fk_adstaffID_from_staffID FOREIGN KEY (Admission_StaffID)
				REFERENCES Staff(Staff_StaffID) 
				ON DELETE CASCADE
);

CREATE TABLE Treatment 
(	
    Treatment_Admitted_PatientID	    CHAR(9)     NOT NULL, 
    Treatment_Start_Date	            DATE        NOT NULL, 
    Treatment_End_Date	                DATE        , 
    Treatment_TreatmentID               CHAR(9)     NOT NULL,                --Add this extended attribute
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
				REFERENCES Doctor(Doctor_DoctorID) 
				ON DELETE CASCADE,
    CONSTRAINT 	perform_admitID_from_admitID FOREIGN KEY (Perform_Admitted_PatientID,Perform_TreatmentID)
				REFERENCES Treatment(Treatment_Admitted_PatientID,Treatment_TreatmentID) 
				ON DELETE CASCADE
);

CREATE TABLE Medication 
(	
	Medication_Admitted_PatientID	    CHAR(9)     NOT NULL, 
    Medication_Code                     CHAR(9)     PRIMARY KEY, 
    Medication_Effects		            VARCHAR(30),
    Medication_Name                     VARCHAR(30),
    Medication_Price			        DECIMAL(10,2),
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
				REFERENCES Doctor(Doctor_DoctorID) 
				ON DELETE CASCADE
);

CREATE TABLE Building 
(	
	Building_BuildingID			    CHAR(9)     PRIMARY KEY
);

CREATE TABLE Floors 
(	
	Floor_BuildingID			    CHAR(9)     NOT NULL,
    Floor_FloorID			        CHAR(9)     NOT NULL,
    PRIMARY KEY (Floor_BuildingID, Floor_FloorID),
    CONSTRAINT 	flo_from_buiid FOREIGN KEY (Floor_BuildingID)
				REFERENCES Building(Building_BuildingID) 
				ON DELETE CASCADE
);

CREATE TABLE Room 
(	
	Room_BuildingID			    CHAR(9)     NOT NULL,
    Room_FloorID			    CHAR(9)     NOT NULL,
    Room_RoomID			        CHAR(9)     NOT NULL,
    Room_Type                   VARCHAR(20),
    Room_Capacity               INT,
    PRIMARY KEY (Room_BuildingID, Room_FloorID, Room_RoomID),
    CONSTRAINT 	room_from_floid FOREIGN KEY (Room_FloorID,Room_BuildingID)
				REFERENCES Floors(Floor_FloorID,Floor_BuildingID) 
				ON DELETE CASCADE
);

ALTER TABLE AdmittedPatient
ADD CONSTRAINT	fk_APbuilID_from_buiID	FOREIGN KEY (AdmittedPatient_BuildingID,AdmittedPatient_FloorID,AdmittedPatient_RoomID)
				REFERENCES Room(Room_BuildingID,Room_FloorID,Room_RoomID)
				ON DELETE SET NULL;               
                
CREATE TABLE LocationHistory 
(	
	LocationHistory_BuildingID			  CHAR(9)       NOT NULL,
    LocationHistory_FloorID			      CHAR(9)       NOT NULL,
    LocationHistory_RoomID			      CHAR(9)       NOT NULL,
    LocationHistory_Admitted_PatientID    CHAR(9)       NOT NULL,
    LocationHistory_HistoryID             DATE          NOT NULL,            --Add this extended attribute
    PRIMARY KEY (LocationHistory_Admitted_PatientID, LocationHistory_HistoryID),
    CONSTRAINT	locationhis_APbuilID_from_buiID	FOREIGN KEY (LocationHistory_BuildingID,LocationHistory_FloorID,LocationHistory_RoomID)
				REFERENCES Room(Room_BuildingID,Room_FloorID,Room_RoomID)
				ON DELETE SET NULL,
    CONSTRAINT 	locationhisID_from_adID FOREIGN KEY (LocationHistory_Admitted_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE CASCADE
);

CREATE TABLE Testing
(	
	Testing_PatientID			CHAR(9)     NOT NULL,
    Testing_TestID			    CHAR(9)     PRIMARY KEY,
    Testing_StaffID			CHAR(9),
    Testing_Admitted_PatientID	CHAR(9),
    CONSTRAINT 	Testing_pID_from_paID FOREIGN KEY (Testing_PatientID)
				REFERENCES Patient(Patient_PatientID) 
				ON DELETE SET NULL,
    CONSTRAINT 	Testing_staffID_from_paID FOREIGN KEY (Testing_StaffID,Testing_Admitted_PatientID)
				REFERENCES Admission(Admission_StaffID,Admission_PatientID) 
				ON DELETE SET NULL
);

CREATE TABLE PCRTest 
(	
	PCRTest_TestID			    CHAR(9)        PRIMARY KEY,
    PCRTest_Ct_Value	        DECIMAL(10,2), 
    PCRTest_Result              VARCHAR(15),
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
    QuickTest_PatientID	        CHAR(9)       NOT NULL,
    QuickTest_Result            VARCHAR(15), 
    QuickTest_Ct_Value	        DECIMAL(10,2),
    CONSTRAINT 	QuickTest_testID_from_test FOREIGN KEY (QuickTest_TestID)
				REFERENCES Testing(Testing_TestID) 
				ON DELETE CASCADE,
    CONSTRAINT 	QuickTest_admitID_from_paID FOREIGN KEY (QuickTest_PatientID)
				REFERENCES AdmittedPatient(AdmittedPatient_PatientID) 
				ON DELETE SET NULL
);
