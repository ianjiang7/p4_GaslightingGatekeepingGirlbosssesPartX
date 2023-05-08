import flask 
import requests
from flask import Flask, render_template, session, redirect, request

app = Flask(__name__)

@app.route('/')
def login():
    # if 'username' in session:
    #     return redirect("/home")
    # return render_template('login.html')
    return render_template('home.html')

    
@app.route('/login')
def authenticate():
    if 'username' in session:
        return render_template('home.html')
    if request.method == 'POST':
        user = request.form['username']
        pw = request.form['password']
    if request.method == 'GET':
        user = request.args['username']
        pw = request.args['password']
    if login(user,pw):
        if request.method == 'POST':
            session['username'] = request.form['username']
        if request.method == 'GET':
            session['username'] = request.args['username']
        return redirect('/home')
    else:
        return render_template('login.html')

@app.route('/signup')
def signup():
    if 'username' in session:
        return render_template('home.html')
    if request.method == 'POST':
        user = request.form['username']
        pw = request.form['password']
    if request.method == 'GET':
        user = request.args['username']
        pw = request.args['password']
    if signup(user,pw):
        if request.method == 'POST':
            session['username'] = request.form['username']
        if request.method == 'GET':
            session['username'] = request.args['username']
        return redirect('/home')
    else:
        return render_template('signup.html')

if __name__ == '__main__':
    app.run(debug=True)
