INSERT INTO quaratine_camp_db.Testing values ("P00000001", "T00000046", "E00000005", "2023-08-13");
INSERT INTO quaratine_camp_db.Testing values ("P00000002", "T00000047", "E00000005", "2023-06-15");
INSERT INTO quaratine_camp_db.Testing values ("P00000003", "T00000048", "E00000005", "2023-12-20");
INSERT INTO quaratine_camp_db.Testing values ("P00000004", "T00000049", "E00000005", "2023-12-03");
INSERT INTO quaratine_camp_db.Testing values ("P00000005", "T00000050", "E00000005", "2023-11-01");

INSERT INTO quaratine_camp_db.PCRTest values ("T00000046", NULL, "Negative");
INSERT INTO quaratine_camp_db.PCRTest values ("T00000047", NULL, "Negative");
INSERT INTO quaratine_camp_db.PCRTest values ("T00000048", NULL, "Negative");
INSERT INTO quaratine_camp_db.PCRTest values ("T00000049", NULL, "Negative");
INSERT INTO quaratine_camp_db.PCRTest values ("T00000050", NULL, "Negative");




SET SQL_SAFE_UPDATES = 0;

CALL UpdatePCR("2022-1-1");

SET SQL_SAFE_UPDATES = 1;

-- Testcase 2

SET SQL_SAFE_UPDATES = 0;

CALL UpdatePCR("2021-1-1");

SET SQL_SAFE_UPDATES = 1;

-- Testcase 3

SET SQL_SAFE_UPDATES = 0;

CALL UpdatePCR("2020-1-1");

SET SQL_SAFE_UPDATES = 1;

-- Testcase 4

SET SQL_SAFE_UPDATES = 0;

CALL UpdatePCR("2020-09-01");

SET SQL_SAFE_UPDATES = 1;