import requests
from flask import request
import json

#In: payload with any combination of: query(name), cuisine, diet, intolerences
#Out: list of recipies that match the parameters 
#       list format: id, title, readyInMinutes, servings, image/imageURL
def get_recipes():

    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        apiKey = creds['spoonacular_api_key']

    request_body = request.get_json()
    if not request_body:
        request_body = request.form

    query = request_body.get('query', '')
    cuisine = request_body.get('cuisine', '')
    diet = request_body.get('diet', '')
    intolerences = request_body.get('intolerences', '')
    number = request_body.get('number','')

    url = "https://api.spoonacular.com/recipes/search?apiKey={}&query={}&cuisine={}&diet={}&intolerences={}&instructionsRequired=true&number={}".format(apiKey,query,cuisine,diet,intolerences,number)
    payload = {}
    headers= {}

    response = requests.request("GET", url, headers=headers, data = payload)

    r = json.loads(response.text.encode('utf8'))
    return json.dumps(r['results'])

def get_recipes_nutrition():

    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        apiKey = creds['spoonacular_api_key']

    request_body = request.get_json()
    if not request_body:
        request_body = request.form

    maxCals = request_body.get('maxCalories', '')
    minProtein = request_body.get('minProtein', '')
    
    url = "https://api.spoonacular.com/recipes/findByNutrients?apiKey={}&maxCalories={}&minProtein={}&random=true".format(apiKey,maxCals,minProtein)
    payload = {}
    headers= {}

    response = requests.request("GET", url, headers=headers, data = payload)
    return response.text.encode('utf8')

def summ_recipe():

    with open('credentials.json', 'r') as f:
        creds = json.loads(f.read())
        apiKey = creds['spoonacular_api_key']

    request_body = request.get_json()
    if not request_body:
        request_body = request.form

    recipeId = request_body.get('id','')
    
    url = "https://api.spoonacular.com/recipes/{}/summary?apiKey={}".format(recipeId,apiKey)
    payload = {}
    headers= {}

    response = requests.request("GET", url, headers=headers, data = payload)
    return response.text.encode('utf8')