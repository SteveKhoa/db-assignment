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


def gen_patient(seed, batch_size):
    # Pattern of each field
    patient = "P-------9"  # CHAR(9) PRIMARY, requires further processing
    identity = "999999910001"  # CHAR(12) NOT NULL
    address = "42 Ly Thuong Kiet, P.12, Q.5, TP.HCM"  # VARCHAR(256)
    gender = "M"  # CHAR(1)
    fullname = "A Random Name Jr."  # VARCHAR(1024) NOT NULL
    phone = "1234567890"  # CHAR(10) NOT NULL

    entries = [[patient, identity, address, gender, fullname, phone]] * batch_size

    for i in range(0, batch_size):
        entries[i][0] = "P" + str(i + seed).zfill(7) + str(random.randint(1,9))
        entries[i][5] = str(random.randint(1000000000,9999999999))
        entries[i] = tuple(entries[i])

    random.shuffle(entries)

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

    batch_size = 5000
    for batch_idx in range(0, n_entries, batch_size):
        timer_start = time.time()

        print("== Batch index: {} + {} ==".format(batch_idx, batch_size))

        entries = gen_patient(batch_idx, batch_size)

        try:
            cursor.executemany(query, entries)

        except mysql.connector.Error as e:
            print("SQL error: ", e, "\n\n")

        conn.commit()

        timer_end = time.time()
        print("Time: {} secs".format(timer_end - timer_start))


if __name__ == "__main__":
    main()
