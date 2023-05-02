
# Remote library imports
from flask import Flask, request, session, make_response, jsonify, abort, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
# from config import app, db, api
from flask_cors import CORS
from models import User
# Local imports
from config import app, db, api

CORS(app)

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")


# api = Flask(__name__)

class Signin(Resource):
    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()

            
        if user.authenticate(data['password']):

            session['user_id'] = user.id

            response = make_response(
                user.to_dict(),
                200
            )
            return response
        return {'error' : "Invalid Username or Password"}, 401

class AuthorizedSession(Resource):

    def get(self):

        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:

            response = make_response(
                jsonify(user.to_dict()),
                200
            )
            return response
        
        print("Did not find user.")

        return {'error': '401 Unauthorized'}, 401

class Signup(Resource):

    def post(self):

        data = request.get_json()

        new_user = User(

            username=data['username']
        )

        new_user.password_hash = data['password']

        
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        response = make_response(
            new_user.to_dict(),
            201
        )
        return response

api.add_resource(Signin, '/signin')
api.add_resource(AuthorizedSession, '/authorized')
api.add_resource(Signup, '/signup')
