import mysql.connector
import os


def get_query_statement(filename):
    retval = ""
    with open(
        "{this_dir}/{fname}".format(
            this_dir=os.path.dirname(os.path.realpath(__file__)), fname=filename
        )
    ) as sqlfile:
        retval = sqlfile.read()

    return retval


if __name__ == "__main__":
    conn = mysql.connector.connect(host="localhost", user="root")
    cursor = conn.cursor()

    procs_path = [
        "update-pcr.sql",
        "show-nva.sql",
        "calculate-test.sql",
        "sort-nurse.sql",
    ]

    for proc_path in procs_path:
        query = get_query_statement(proc_path)
        
        try:
            cursor.execute(query)
        except mysql.connector.Error as e:
            print("SQL Error: {}", e)
            print("\n\n")
        
        conn.commit()
    