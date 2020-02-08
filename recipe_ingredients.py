import requests
from flask import request
import json

#IN: id of a recipe from recipe_search
#OUT: list of ingredients and details of that recipe
#       'top' has info about recipe - diet, healty, cheap, popular etc...
#        list of ingredients has name, amount/unit, picture
def get_recipe_ingredients(request_body=None):

    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        apiKey = creds['spoonacular_api_key']
    if not request_body:
        request_body = request.get_json()
        if not request_body:
            request_body = request.form

    recipeId = request_body['id']

    url = "https://api.spoonacular.com/recipes/{}/information?apiKey={}".format(recipeId, apiKey)

    payload = {}
    headers= {}
    response = requests.request("GET", url, headers=headers, data = payload)

    return response.text.encode('utf8')