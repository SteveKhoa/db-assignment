-- Create index tables
CREATE INDEX patNameIdx on quaratine_camp_db.patient (Patient_Fullname(10));
CREATE INDEX dateIdx on quaratine_camp_db.testing (Testing_Date);
DROP INDEX patNameIdx on quaratine_camp_db.patient;
DROP INDEX dateIdx on quaratine_camp_db.testing;

-- Query statement subjective to Indexing
SELECT Testing_TestID, Testing_Date
FROM quaratine_camp_db.testing, quaratine_camp_db.patient 
WHERE Testing_PatientID=Patient_PatientID 
AND Patient_Fullname='Dinh Thi Thuy'
AND Testing_Date < '2022-01-01';
