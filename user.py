import requests
from requests import Session
from base64 import b64decode
from flask import request, make_response, jsonify
import json
import datetime
import jwt
import database

def login(for_session=False, session=None, request_body=None):
    if not request_body:
        request_body = request.get_json()
        if not request_body:
            request_body = request.form

    url = "https://www.instacart.ca/v3/dynamic_data/authenticate/login?source=web^&cache_key=undefined"

    email = request_body['email']
    password = request_body['password']
    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        authenticity_token = creds['authenticity_token']

    payload = json.dumps({
        'scope': '\\',
        'grant_type': 'password',
        'signup_v3_endpoints_web': 'null',
        'email': email,
        'password': password,
        'authenticity_token': authenticity_token
    })
    
    headers = {
        'authority': 'www.instacart.ca',
        'origin': 'https://www.instacart.ca',
        'x-csrf-token': 'undefined',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-client-identifier': 'web',
        'x-requested-with': 'XMLHttpRequest',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'referer': 'https://www.instacart.ca/',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9'
    }

    if for_session:
        session.request('post', url, headers=headers, data = payload)
        return

    response = requests.post(url, headers=headers, data = payload)

    if response.status_code == 200:
        jwt_token = get_jwt_token(request_body, authenticated=True)
        resp = {
            'status': 'success',
            'status_code': 200,
            'message': 'authenticated',
        }
        resp = make_response(jsonify(resp))
        resp.set_cookie('mealplanner_auth_token', jwt_token.decode())
        return resp, 200
    else:
        return make_response(jsonify({
            'status': 'failed',
            'status_code': 400,
            'message': 'authentication failed'
        })), 400


def encode_auth_token(email, pw):
    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        secret_key = b64decode(creds['SECRET_KEY'])

    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, minutes=60),
            'iat': datetime.datetime.utcnow(),
            'email': email,
            'password': pw
        }
        return jwt.encode(
            payload,
            secret_key,
            algorithm='HS256'
        )
    except Exception as e:
        return e

def decode_auth_token(auth_token):
    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        secret_key = b64decode(creds['SECRET_KEY'])
    
    try:
        payload = jwt.decode(auth_token, secret_key)
        return payload
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

def get_jwt_token(request_body, authenticated=False):
    if not authenticated:
        session = Session()
        if login(session, request_body) != 200:
            return "Invalid credentials"
    # succesfully authenticated
    return encode_auth_token(request_body['email'], request_body['password'])

def add_recipe_history(request_body):
    # add recipes to James' database
    return database.add_history(request_body)

def get_recipe_history():
    # authenticate the user
    if 'mealplanner_auth_token' in request.cookies:
        email = decode_auth_token(request.cookies['mealplanner_auth_token'])['email']
    else:
        return "must authenticate"
    return database.get_history(email)
    