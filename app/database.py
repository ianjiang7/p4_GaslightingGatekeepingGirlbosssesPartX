import sqlite3

DB_FILE = "tables.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

command = "create table IF NOT EXISTS login(user TEXT, password TEXT)"
c.execute(command)
db.commit()
