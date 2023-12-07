SET SQL_SAFE_UPDATES = 0;

CALL SortNursesByPatients("2020-1-1", "2023-1-1");

SET SQL_SAFE_UPDATES = 1;

-- Testcase 2

SET SQL_SAFE_UPDATES = 0;

CALL SortNursesByPatients("2023-1-1", "2024-1-1");

SET SQL_SAFE_UPDATES = 1;

-- Testcase 3

SET SQL_SAFE_UPDATES = 0;

CALL SortNursesByPatients("2024-1-1", "2025-1-1");

SET SQL_SAFE_UPDATES = 1;