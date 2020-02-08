from requests import Session
import json
from flask import request, make_response, jsonify
import threading
import copy
from user import add_recipe_history, get_jwt_token, login, decode_auth_token
from recipe_ingredients import get_recipe_ingredients

def get_ingredients(session, request_body):
    items = []
    cart_id = None
    for ingredient in request_body['extendedIngredients']:
        search_query = ingredient['name']

        url = "https://www.instacart.ca/v3/containers/loblaws/search_v3/{}?".format(search_query.replace(' ', '%20'))

        payload = {}
        headers = {
            'authority': 'www.instacart.ca',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9'
        }

        response = session.request("GET", url, headers=headers, data = payload)

        item = None
        content = json.loads(response.text)

        for module in content['container']['modules']:
            if module['data'].get('header', None) and module['data']['header']['label'].startswith('Related'):
                for product in module['data']['items']:
                    if product['tracking_params']['original_position'] == 2:
                        item = product
                        break
            elif module['data'].get('header', None) and module['data']['header']['label'].split(' ')[1] == 'results':
                for product in module['data']['items']:
                    if product['tracking_params']['original_position'] == 1:
                        item = product
                        break
                if item and cart_id:
                    break
            elif not cart_id and module['data'].get('header', None) and module['data']['header']['label'].startswith('Based On Your'):
                cart_id = module['data']['tracking_params']['cart_id']
                if item and cart_id:
                    break

        if not item:
            continue

        item_dict = {
            "id": item['id'],
            "price": item['pricing']['price'],
            "name": item['name'],
            "image": item['image'],
            "tracking_params": item['tracking_params'],
            "source_value": ingredient
        }
        items.append(item_dict)
    return items, cart_id

def add_items_to_cart(session, ingredients, cart_id):
    url = "https://www.instacart.ca/v3/carts/{}/update_items?source=web&cache_key=".format(cart_id)

    payload = json.dumps({
                "items": [
                            {
                                "item_id": ingredient['id'], 
                                "quantity": 1,
                                "source_type": "search",
                                "source_value": ingredient['source_value'],
                                "tracking": ingredient['tracking_params'],
                                "item_tasks":[],
                                "qty_type":"null"
                            }
                        for ingredient in ingredients],
                        "request_timestamp":1580265797400,
                        "options":{
                            "assign_to_first_journey_instructions": True
                        }
                })
    headers = {
        'authority': 'www.instacart.ca',
        'origin': 'https://www.instacart.ca',
        'x-csrf-token': 'dlqcoViByAwhUggi3o/uIi5l8d/ohbFyT7m+rwHaD/ZepVXKUlDSgSLNrTItXsXLdi9nEQIu8Ux79KKPofEONw==',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'content-type': 'application/json',
        'accept': 'application/json',
        'x-client-identifier': 'web',
        'x-requested-with': 'XMLHttpRequest',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9'
    }

    response = session.request("PUT", url, headers=headers, data = payload)
    return response

def add_to_cart():
    request_body = request.get_json()
    # check jwt token
    if 'mealplanner_auth_token' in request.cookies:
        auth_info = decode_auth_token(request.cookies['mealplanner_auth_token'])
    else:
        return make_response(jsonify({
            'status': 'failed',
            'status_code': 400,
            'message': 'Must sign in'
        }))
    order_thread = threading.Thread(target=handle_order, args=(request_body, auth_info))
    order_thread.start()
    return 'success'

def handle_order(request_body, auth_info):
    request_body['recipes'] = copy.deepcopy(request_body)
    request_body['email'] = auth_info['email']
    recipe_details = json.loads(get_recipe_ingredients({"id": request_body["id"]}))
    session = Session()
    login(True, session, auth_info)
    ingredients, cart_id = get_ingredients(session, recipe_details)
    response = add_items_to_cart(session, ingredients, cart_id)
    if response.status_code == 200:
        # succesfully added to cart, store user recipe history
        add_recipe_history(request_body)
        print('added to cart and user history')

    return response.text