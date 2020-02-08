from pymongo import MongoClient
from flask import request
import json
import copy

with open('credentials.json', 'r') as f:
    creds = json.loads(f.read())
    dbKey = creds['database_key']

dbconnection = "mongodb+srv://qhacks2020:{}@cluster0-kq8wa.gcp.mongodb.net/test?retryWrites=true&w=majority".format(dbKey)
client = MongoClient(dbconnection)

db = client.get_database('recipe_history')
records = db.history
print('Connected to database successfully')
# class database(object):
        

# IN: email in payload
# OUT: list of recipies associated with that user
def get_history(email):

    if (records.count_documents({'email':email}) != 1):
        return {
            'err':"email not found"
        }

    entry = records.find_one({'email': email})
    return (json.dumps(entry['recipes']))

#IN: email, array of recipes
#OUT: error or success status code??
def add_history(request_body):
    if not request_body:
        request_body = request.form

    email = request_body['email']
    additions = request_body['recipes']
    # add document
    if records.count_documents({'email':email}) == 0:
        new_entry={
            'email':email,
            'recipes': [additions]
        }
        records.insert_one(new_entry)

    # edit document that already exists
    else:
        entry = records.find_one({'email':email})
        for recipe in entry['recipes']:
            if recipe['id'] == additions['id']:
                return {
                    'result': "success"
                }
        entry['recipes'].append(additions)        
        records.update_one({'email':email}, {"$set":{'recipes': entry['recipes']}})
    return {
        'result': "success"
    }
