import mysql.connector
import json  # for printing beautiful json
import os
import requests


def get_query_template(filename):
    retval = ""
    with open(
        "{this_dir}/{fname}".format(
            this_dir=os.path.dirname(os.path.realpath(__file__)), fname=filename
        )
    ) as sqlfile:
        retval = sqlfile.read()

    return retval


def insert(filename, values):
    conn = mysql.connector.connect(
        host="localhost", user="root", database="QUARATINE_CAMP_DB"
    )
    cursor = conn.cursor()

    query = get_query_template(filename)

    for value in values:
        try:
            cursor.execute(query, value)
        except mysql.connector.errors.IntegrityError as e:
            print("Warning: ", e, ". Entry dropped.")
        except mysql.connector.errors.ProgrammingError as e:
            print("SQL syntax error, {filename}: ".format(filename=filename), e, "\n\n")

    conn.commit()


def get_api_key():
    retval = "AIzaSyBShzQgI6AAj321_LcWlgFETvH1e1AabEE"
    return retval


def fetch_sheet_json(spreadsheetID, sheetName, A1Range):
    response = requests.request(
        "GET",
        "https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{sheetName}!{A1Range}".format(
            spreadsheetId=spreadsheetID, sheetName=sheetName, A1Range=A1Range
        ),
        headers={"x-goog-api-key": get_api_key()},
    )

    if response.status_code == 403:
        print("Error: Unauthorized access")
        exit()

    return response.json()


def main():
    spreadsheet_id = "1y8QOIv7SPQbMkiN9BLJabSScwqAWSmgDPnFHM5aPq7Q"
    sheet_list = [
        ("PATIENT", "A2:F6", "template_patient.sql"),
        ("PEOPLE", "A2:D6", "template_people.sql"),
        ("ROOM", "A2:E6", "template_room.sql"),
        ("ADMITTED_PATIENT", "A2:E6", "template_adpatient.sql")
    ]

    for sheet, a1_range, template_query_file in sheet_list:
        response_dict = fetch_sheet_json(spreadsheet_id, sheet, a1_range)

        values = list(map(tuple, response_dict["values"]))

        insert(template_query_file, values)


if __name__ == "__main__":
    main()
