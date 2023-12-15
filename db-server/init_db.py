""" This has nothing to do with the web, 
    just a script to automate boring query task

    To run this script:
    (1) `pip install -r requirements.txt`
    (2) Change directory to the current directory
    (3) Run this script.
"""

import mysql.connector
import insert_db.insert 
import proc.init_proc
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

    # Database is initialized in this order
    query_steps = [
        "quaratine-camp-db.sql",
        "{}/insert-db/insert.py".format(os.path.dirname(os.path.realpath(__file__))),
        "{}/proc/init_proc.py".format(os.path.dirname(os.path.realpath(__file__))),
    ]

    for file in query_steps:
        """This code is unclean, heavily couples the 
        `defining` step and `executing step. Must refactor later.`
        """
        # ext = os.path.splitext(file)[-1]
        ext = os.path.split(file)[-1]

        if ext == "quaratine-camp-db.sql":
            try:
                query_statement = get_query_statement(file)
                for result in cursor.execute(query_statement, multi=True):
                    # Because iterator is "lazily updated", must iterate
                    # the cursor in multi-query execution,
                    # otherwise, no query would execute.
                    pass
            except mysql.connector.errors.Error as e:
                print(e)
        elif ext == "insert.py":
            insert_db.insert.main()
        elif ext == "init_proc.py":
            proc.init_proc.main()

    conn.commit()
