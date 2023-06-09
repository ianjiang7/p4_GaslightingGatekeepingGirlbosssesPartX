import flask 
import requests
from flask import Flask, render_template, session, redirect, request, url_for
import sqlite3
import random
import os
from LSTM import get_prediction

absolute_path = os.path.dirname(os.path.abspath(__file__))
file_path = absolute_path + "/stock_name.txt"
tickerlist = open(file_path, "r").read().split('\n')
for i in range(len(tickerlist)):
    tickerlist[i] = tickerlist[i].split(',')[0]


DB_FILE = "tables.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor()

command = "create table IF NOT EXISTS login(user TEXT, password TEXT);"
c.execute(command)
db.commit()

#command = "create table IF NOT EXISTS predictions(id INTEGER PRIMARY KEY, name TEXT);"
#c.execute(command)
#db.commit()

app = Flask(__name__)
app.secret_key = os.urandom(32)

def username_in_system(username):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    temp = list(c.execute("SELECT user FROM login").fetchall())
    for element in temp:
        for element2 in element:
            if username == element2:
                return True
    return False

def select_from(database, table, data_want, datagive, datatype_give):
    db = sqlite3.connect(database, check_same_thread=False)
    c = db.cursor()
    temp = ((c.execute(f"SELECT {data_want} FROM {table} WHERE {datatype_give} = '{datagive}'")).fetchall())
    if(len(temp) > 0):
        return temp[0][0]
    else:
        return 0
    
def signup(username, password):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    if(username_in_system(username)):
        return False
    else:
        c.execute("INSERT INTO login VALUES (?,?,?)", (username, password, -1))
    db.commit()
    return True #save changes

def login(username, password):
    db = sqlite3.connect(DB_FILE, check_same_thread=False)
    c = db.cursor()
    if(username_in_system(username)):
        if(select_from(DB_FILE, "login", "password", username, "user") == password):
            return True
    return False

@app.route("/")
def index():
    # if there is a session in place, divert the user to the main page
    if 'username' in session:
        return render_template("home.html", prediction="", Username=session['username'], list=tickerlist)
    else:
        return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def authenticate():
    if request.method == 'POST':
        user = request.form['username']
        pw = request.form['password']
    if login(user,pw):
        if request.method == 'POST':
            session['username'] = request.form['username']
        if request.method == 'GET':
            session['username'] = request.args['username']
        return redirect('/')
    else:
        return render_template('register.html', Lstatus="Invalid username or password!")

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    newUser = request.form['username']
    newPass = request.form['pwd']

    c.execute("SELECT * FROM login;")
    user_logins = c.fetchall()

    for user in user_logins:
        if len(newUser) < 8 or len(newPass) < 8 :
            return render_template('register.html', Sstatus="Username and Password must be at least 8 characters long!")
        if newUser == user[0]:
            return render_template('register.html', Sstatus="Submitted username is already in use.")

    c.execute("INSERT INTO login VALUES (?,?,?);", (newUser, newPass,-1))
    db.commit()
    return render_template('register.html', Sstatus="New user has been created successfully! Log in with your new credentials!")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('username', None)
    return redirect('/')

@app.route("/predict", methods=['POST'])
def predict():
    if 'username' in session:
        TICKER = request.form['ticker']
        predictions = get_prediction(TICKER)
        return render_template("home.html", prediction=predictions[2], currentPrice=round(predictions[0],2), predictPrice=round(predictions[1],2), selectedTicker=TICKER, predictionhtml=predictions[3], Username=session['username'],list=tickerlist)
    else:
        return redirect('/')

if __name__ == "__main__":
    app.debug = True
    app.run('0.0.0.0')
