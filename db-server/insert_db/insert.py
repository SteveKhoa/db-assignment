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
            pass
        except mysql.connector.errors.ProgrammingError as e:
            print("SQL syntax error, {filename}: ".format(filename=filename), e, "\n\n")
        except mysql.connector.errors.Error as e:
            print("SQL generic error, see more:\n")
            print(e)
            print("--------------------------------------\n");

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

    if response.status_code == 200:
        pass
    elif response.status_code == 403:
        print("Error: Unauthorized access")
        exit() 
    else:
        print("Warning: fetch_json: No handler for {}".format(response.status_code))
        print("Full json response: ")
        print(json.dumps(response.json(), indent=2))
        print("\n\n\n")

    return response.json()


def main():
    spreadsheet_id = "1y8QOIv7SPQbMkiN9BLJabSScwqAWSmgDPnFHM5aPq7Q"
    sheet_list = [
        ("PATIENT", "A2:F16", "template_patient.sql"),
        ("PEOPLE", "A2:D9", "template_people.sql"),
        ("ROOM", "A2:E6", "template_room.sql"),
        ("ADMITTED_PATIENT", "A2:E16", "template_adpatient.sql"),
        ("TREATMENT", "A2:D6", "template_treatment.sql"),
        ("PERFORM", "A2:C6", "template_perform.sql"),
        ("MEDICATION", "A2:G6", "template_medication.sql"),
        ("TAKE_ACTION","A2:B6","template_takeaction.sql"),
        ("LOCATION_HISTORY", "A2:F6", "template_locationhistory.sql"),
        ("ADMISSION", "A2:D16", "template_admission.sql"),
        ("HEAD_OF_THE_CAMP", "A2:B2", "template_headofthecamp.sql"),
        ("MANAGER", "A2:A4", "template_manager.sql"),
        ("COMORBIDITY", "A2:B6", "template_comorbidity.sql"),
        ("DISCHARGE_PATIENT", "A2:B6", "template_dischargepatient.sql"),
        ("SYMPTOMS","A2:C9", "template_symptoms.sql"),
        ("TESTING","A2:D46","template_testing.sql"),
        ("PCR_TEST", "A2:C21", "template_pcrtest.sql"),
        ("RESPIRATORY_RATE", "A2:B16", "template_respiratoryrate.sql"),
        ("SPO2", "A2:B6", "template_spo2.sql"),
        ("QUICK_TEST", "A2:C6", "template_quicktest.sql")
    ]

    for sheet, a1_range, template_query_file in sheet_list:
        response_dict = fetch_sheet_json(spreadsheet_id, sheet, a1_range)

        values = list(map(tuple, response_dict["values"]))

        insert(template_query_file, values)


if __name__ == "__main__":
    main()
