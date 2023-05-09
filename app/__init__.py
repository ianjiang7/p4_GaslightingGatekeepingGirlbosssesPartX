import flask 
import requests
from flask import Flask, render_template, session, redirect, request

app = Flask(__name__)

@app.route("/")
def index():
    # if there is a session in place, divert the user to the main page
    if 'username' in session:
        return redirect("/home")
    else:
        return render_template('login.html', login="Not logged in!")

@app.route('/home', methods=['GET', 'POST'])
def authenticate():

    ##### ACCOUNT INFO CHECK
    if request.method == 'POST':
        username = [request.form['username']]
        password = request.form['password']

        c.execute("SELECT password FROM login WHERE user = (?)", username)

        try:
            x = c.fetchall()[0][0]
            if x != password:
                return render_template('login.html', login="Invalid Password!")
            session['username'] = username
        except:
            return render_template('login.html', login="Submitted username is not registered!")
    if 'username' not in session:
        return redirect("/")
        
@app.route("/register")
def register():
    return render_template('createaccount.html')

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    newUser = request.form['username']
    newPass = request.form['password']

    c.execute("SELECT * FROM login;")
    user_logins = c.fetchall()

    for user in user_logins:
        if len(newUser) < 8 or len(newPass) < 8 :
            return render_template('createaccount.html', status="Username and Password must be at least 8 characters long!")
        if newUser == user[0]:
            return render_template('createaccount.html', status="Submitted username is already in use.")

    c.execute("INSERT INTO login VALUES (?,?);", (newUser, newPass))
    db.commit()
    return render_template('login.html', login="New user has been created successfully! Log in with your new credentials!")


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.debug = True
    app.run()
