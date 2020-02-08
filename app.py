from flask import Flask, request
from flask import render_template
from ordering import add_to_cart
from recipe_search import get_recipes, get_recipes_nutrition, summ_recipe
from recipe_ingredients import get_recipe_ingredients
from user import get_recipe_history, login
import database

app = Flask(__name__,static_folder="./client/build/static", template_folder="./client/build")

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/search-recipes', methods=['GET','POST'])
def search_recipes():
    return get_recipes()

@app.route('/summarize-recipe', methods=['GET','POST'])
def summarize_recipe():
    return summ_recipe()

@app.route('/search-recipes-nutrition', methods=['GET','POST'])
def search_recipes_nutrition():
    return get_recipes_nutrition()

@app.route('/get-recipe-details', methods=['GET','POST'])
def get_recipe_details():
    return get_recipe_ingredients()

@app.route('/login', methods=['POST'])
def authenticate():
    return login()

@app.route('/add-to-cart', methods=['POST'])
def order_ingredients():
    # call code to order ingredients passed with the request
    return add_to_cart()

@app.route('/recipe_history')
def get_user_recipe_history():
    # get recipe history for authenticated user
    return get_recipe_history()

if __name__ == "__main__":
    app.run(debug=True)