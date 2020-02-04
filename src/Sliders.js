import React, { Component } from 'react'
import SliderRecipe from './SliderRecipe'
import RecipeSearch from "./Search.js"
import recipes from './test_recipes'

export class Sliders extends Component {
constructor(props){
    super(props);
    this.setState({recipes:[]})
    this.state={
        recipes:[],
        res: [
            {
                "id": 592479,
                "title": "ale and Quinoa Salad with Black Beans",
                "readyInMinutes": 50,
                "servings": 6,
                "image": "Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg",
                "imageUrls": [
                    "Kale-and-Quinoa-Salad-with-Black-Beans-592479.jpg"
                ]
            },
            {
                "id": 547775,
                "title": "Creamy Avocado Pasta",
                "readyInMinutes": 15,
                "servings": 2,
                "image": "Creamy-Avocado-Pasta-547775.jpg",
                "imageUrls": [
                    "Creamy-Avocado-Pasta-547775.jpg"
                ]
            },
            {
                "id": 818941,
                "title": "Avocado Toast with Eggs, Spinach, and Tomatoes",
                "readyInMinutes": 10,
                "servings": 1,
                "image": "avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg",
                "imageUrls": [
                    "avocado-toast-with-eggs-spinach-and-tomatoes-818941.jpg"
                ]
            },
            {
                "id": 495111,
                "title": "Citrus Sesame Kale",
                "readyInMinutes": 15,
                "servings": 4,
                "image": "Citrus-Sesame-Kale-495111.jpg",
                "imageUrls": [
                    "Citrus-Sesame-Kale-495111.jpg"
                ]
            },
            {
                "id": 689502,
                "title": "Melt In Your Mouth Kale Salad",
                "readyInMinutes": 10,
                "servings": 2,
                "image": "Melt-In-Your-Mouth-Kale-Salad-689502.jpg",
                "imageUrls": [
                    "Melt-In-Your-Mouth-Kale-Salad-689502.jpg"
                ]
            },
            {
                "id": 837136,
                "title": "Kale Pineapple Smoothie",
                "readyInMinutes": 4,
                "servings": 1,
                "image": "kale-pineapple-smoothie-837136.jpg",
                "imageUrls": [
                    "kale-pineapple-smoothie-837136.jpg"
                ]
            },
            {
                "id": 582897,
                "title": "Mexican Salad with Lime Dressing",
                "readyInMinutes": 15,
                "servings": 4,
                "image": "Mexican-Salad-with-Lime-Dressing-582897.jpg",
                "imageUrls": [
                    "Mexican-Salad-with-Lime-Dressing-582897.jpg"
                ]
            },
            {
                "id": 777037,
                "title": "Weekly Meal Plan #17",
                "readyInMinutes": 15,
                "servings": 6,
                "image": "weekly-meal-plan-17-777037.jpg",
                "imageUrls": [
                    "weekly-meal-plan-17-777037.jpg"
                ]
            },
            {
                "id": 801710,
                "title": "Matcha Green Tea and Pineapple Smoothie",
                "readyInMinutes": 10,
                "servings": 1,
                "image": "matcha-green-tea-and-pineapple-smoothie-801710.jpg",
                "imageUrls": [
                    "matcha-green-tea-and-pineapple-smoothie-801710.jpg"
                ]
            },
            {
                "id": 812966,
                "title": "Low Carb Frosty",
                "readyInMinutes": 5,
                "servings": 1,
                "image": "low-carb-frosty-812966.jpg",
                "imageUrls": [
                    "low-carb-frosty-812966.jpg"
                ]
            }
        ],
        baseUri: "https://spoonacular.com/recipeImages/",
        res:{recipes}
    }

    this.setState({recipes:this.props.recipes})
        
}

onComponentMount(){
    this.setState({recipes:this.props.recipes})
}


    render() {
        return (
            <section className="section home-feature ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                <h2 style={{ marginTop: '175px', marginLeft: '50px', marginBottom: '90px', fontSize: '48px', fontWeight: '600' }}> Explore Different Healthy Diets!</h2>
                                <div className="hr"></div>
                                {/*Slider*/}                        <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Vegetarian</h3>
                                <div className="margin-bottom-60">
                                    <SliderRecipe callback={this.props.callback} list={this.props.recipes.results1} />
                                </div>
                                <div className="hr"></div>
                                <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Keto</h3>
                                <div className="margin-bottom-60">
                                    <SliderRecipe callback={this.props.callback} list={this.props.recipes.results2} />
                                </div>
                                <div className="hr"></div>
                                <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Plant-Based</h3>
                                <div className="margin-bottom-60">
                                    <SliderRecipe callback={this.props.callback} list={this.props.recipes.results3} />
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Sliders
