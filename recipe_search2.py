import requests
from flask import request
import json

#In: payload with any combination of: query(name), cuisine, diet, intolerences
#Out: list of recipies that match the parameters 
#       list format: id, title, readyInMinutes, servings, image/imageURL
def get_recipes():

    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        apiKey = creds['E_apiKey']
        appKey = creds['E_appId']

    request_body = request.get_json()
    if not request_body:
        request_body = request.form

    query = request_body.get('query', '')
    
    url = "https://api.edamam.com/search?q={}&app_id={}&app_key={}&time=1-200".format( query, appKey, apiKey)
    payload = {}
    headers= {}

    response = requests.request("GET", url, headers=headers, data = payload)
    r = json.loads(response.text.encode('utf8'))
    return json.dumps(r['hits'])