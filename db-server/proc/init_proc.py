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
        "sort-nurse.sql"
    ]

    for proc_path in procs_path:
        query = get_query_statement(proc_path)

        # Remove `DELIMITER` keyword since Python Connector does not support it
        # It is needed on Client databases, however, to cope with delimiter problems in
        # SQL procedure.
        # https://stackoverflow.com/questions/75258442/using-mysql-connector-python-how-to-insert-a-complicated-with-delimiter-inst
        query = query.replace('DELIMITER $$', '')
        query = query.replace('DELIMITER ;', '')
        query = query.replace('$$', '')
        
        try:
            for exec in cursor.execute(query, multi=True):
                # Because iterator is "lazily updated", must iterate
                # the cursor in multi-query execution,
                # otherwise, no query would execute.
                pass
        except mysql.connector.Error as e:
            print("===========================\n")
            print("SQL Error: \n", e)
            print("===========================\n\n")
        
        conn.commit()
    