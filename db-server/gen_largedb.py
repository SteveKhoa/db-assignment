""" This file generates 1M entries for Patient Table
    It has nothing to do with Database design

    To run this script:
    (1) `pip install -r requirements.txt`
    (2) Change directory to the current directory
    (3) Run this script.
"""
import mysql.connector
import time
import random
import json


# Number of entries generated
# MAXIMUM IS 1000000 (We are running out of unique keys)
n_entries = 1000000


def str_time_prop(start, end, time_format, prop):
    """Get a time at a proportion of a range of two formatted times.
    https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates

    start and end should be strings specifying times formatted in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(time_format, time.localtime(ptime))


def gen_testing(seed, batch_size, patient_id):
    test_id = "T-------1"
    staff_id = "E00000005"
    date = "2020-01-01"

    entries = [[patient_id, test_id, staff_id, date]] * batch_size

    for i in range(0, batch_size):
        entries[i][1] = "T" + str(i + seed).zfill(7) + str(random.randint(1, 9))
        entries[i][3] = str_time_prop("2020-01-01", "2023-12-31", "%Y-%m-%d", random.random())
        entries[i] = tuple(entries[i])

    return entries


def gen_patient(seed, batch_size):
    # Pattern of each field
    patient = "P-------9"  # CHAR(9) PRIMARY, requires further processing
    identity = "999999910001"  # CHAR(12) NOT NULL
    address = "42 Ly Thuong Kiet, P.12, Q.5, TP.HCM"  # VARCHAR(256)
    gender = "M"  # CHAR(1)
    fullname = "A Random Name Jr."  # VARCHAR(1024) NOT NULL
    phone = "1234567890"  # CHAR(10) NOT NULL

    entries = [[patient, identity, fullname, gender, address, phone]] * batch_size

    for i in range(0, batch_size):
        entries[i][0] = "P" + str(i + seed).zfill(7) + str(random.randint(1, 9))
        entries[i][5] = str(random.randint(1000000000, 9999999999))
        entries[i] = tuple(entries[i])

    return entries


def main():
    conn = mysql.connector.connect(
        host="localhost", user="root", database="QUARATINE_CAMP_DB"
    )
    cursor = conn.cursor()

    # MySQL Query template
    query = """
INSERT INTO
    QUARATINE_CAMP_DB.Patient (
        Patient_PatientID,
        Patient_Identity_Number,
        Patient_Fullname,
        Patient_Gender,
        Patient_Address,
        Patient_Phone
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s,
        %s,
        %s
    )
"""

    query_testing = """
INSERT INTO 
    QUARATINE_CAMP_DB.Testing
    (	
        Testing_PatientID,
        Testing_TestID,
        Testing_StaffID,
        Testing_Date
    )
VALUES
    (
        %s,
        %s,
        %s,
        %s
    )
"""

    batch_size = 10
    for batch_idx in range(0, n_entries, batch_size):
        timer_start = time.time()

        # print("== Batch index: {} + {} ==".format(batch_idx, batch_size))

        entries = gen_patient(batch_idx, batch_size)

        # For every 10 patients generated, generate 10 test_ids for the first patient
        # entries[0][0] : magic number to choose 15th patient id to generate test_id for
        testing_entries = gen_testing(batch_idx, batch_size, entries[0][0])

        try:
            cursor.executemany(query, entries)
            cursor.executemany(query_testing, testing_entries)

        except mysql.connector.Error as e:
            print("SQL error: ", e, "\n\n")

        conn.commit()

        timer_end = time.time()
        # print("Time: {} secs".format(timer_end - timer_start))


if __name__ == "__main__":
    main()
