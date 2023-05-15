import sqlite3

DB_FILE = "tables.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

command = "create table IF NOT EXISTS login(user TEXT, password TEXT, stock_id INTEGER);"
c.execute(command)
db.commit()

command = "create table IF NOT EXISTS predictions(id INTEGER PRIMARY KEY, name TEXT);"
c.execute(command)
db.commit()
