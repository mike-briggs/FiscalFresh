from pymongo import MongoClient
from flask import request
import json
import copy

with open('credentials.json', 'r') as f:
    creds = json.loads(f.read())
    dbKey = creds['database_key']

dbconnection = "mongodb+srv://qhacks-db:{}@recipiestorage-bqfba.mongodb.net/test?retryWrites=true&w=majority".format(dbKey)
client = MongoClient(dbconnection)

recipe_history = client.get_database('recipe_history')
recipe_history_records = recipe_history.history

pantry = client.get_database('pantry')
pantry_records = pantry.history

print('Connected to database successfully')
# class database(object):
        

# IN: email in payload
# OUT: list of recipies associated with that user
def get_history(email):

    if (recipe_history_records.count_documents({'email':email}) != 1):
        return {
            'err':"email not found"
        }

    entry = recipe_history_records.find_one({'email': email})
    return (json.dumps(entry['recipes']))

#IN: email, array of recipes
#OUT: error or success status code??
def add_history(request_body):
    if not request_body:
        request_body = request.form

    email = request_body['email']
    additions = request_body['recipes']
    # add document
    if recipe_history_records.count_documents({'email':email}) == 0:
        new_entry={
            'email':email,
            'recipes': [additions]
        }
        recipe_history_records.insert_one(new_entry)

    # edit document that already exists
    else:
        entry = recipe_history_records.find_one({'email':email})
        for recipe in entry['recipes']:
            if recipe['id'] == additions['id']:
                return {
                    'result': "success"
                }
        entry['recipes'].append(additions)        
        recipe_history_records.update_one({'email':email}, {"$set":{'recipes': entry['recipes']}})
    return {
        'result': "success"
    }

def get_pantry(email):
    cursor = pantry_records.find({})
    for document in cursor:
        print(document)
    if (pantry_records.count_documents({'email':email}) != 1):
        return {
            'err':"email not found"
        }

    entry = pantry_records.find_one({'email': email})
    return (json.dumps(entry['pantry_items']))

def add_pantry(email, request_body):
    if not request_body:
        request_body = request.form

    #additions is a list instead of a single entity like in add_history
    additions = request_body['new_pantry_items']

    if pantry_records.count_documents({'email':email}) == 0:
        new_entry={
            'email':email,
            'pantry_items':[additions]
        }
        pantry_records.insert_one(new_entry)

    else:
        entry = pantry_records.find_one({'email':email})

        for newItem in additions:
            if newItem not in entry['pantry_items']:
                entry['pantry_items'].append(newItem)
        pantry_records.update_one({'email':email},{"$set":{'pantry_items': entry['pantry_items']}})
    return{
        'result':"success"
    }

def delete_pantry(email, request_body):
    #take in the email and id of the pantry array to delete
    if not request_body:
            request_body = request.form

    index = request_body['Deletion_Index']

    if pantry_records.count_documents({'email':email}) == 0:
        return{
            'result':'Error: email not found'
        }
    else:
        entry = pantry_records.find_one({'email':email})
        pantry = entry['pantry_items']
        del pantry[index]
        pantry_records.update_one({'email':email},{"$set":{'pantry_items': pantry}})
    return{
        'result':"success"
    }
