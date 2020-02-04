import React, { Component } from 'react'
//import ReactTypingEffect from 'react-typing-effect';
import logo from './logo.svg';

import _ from 'lodash'

import { Header, Icon, Image, Menu, Segment, Sidebar, Sticky, Grid } from 'semantic-ui-react'

import './assets/css/qweb.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome.css';
import Slider from "react-slick";
//import "./slick-carousel/slick/slick.css"; 
//import "./slick-carousel/slick/slick-theme.css";
import food from "./assets/images/food.jpg";
import SliderRecipe from "./SliderRecipe.js"

import ProteinRecipe from "./SliderRecipe.js"
import NavBar from "./NavBar.js"
import axios from 'axios';
import recipes from './test_recipes.js'
import Footer from './Footer'
import Welcome from './Welcome'
import Steps from './Steps'
import Sliders from './Sliders'
import Cart from './Cart'
import RecipeSearch from './Search'


const initialState = { isLoading: false, cart: [], results: [], value: '' }




const source = [{
    "id": "1",
    "title": "Butter Chicken",
    "description": "Lorem Ipsum Dos Color Dit Simit",
    "image": { food },
    "calories": "500"
}];

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}



class App extends React.Component {

    constructor(props) {
        super(props);
        this.childLook = React.createRef();
        let longRecipes = []
        longRecipes = longRecipes.concat(recipes.results1.concat(recipes.results2.concat(recipes.results3)))
        console.log(longRecipes)
        let res = recipes.result1
        this.state = {
            toUse: recipes,
            recipes: { res },
            visible: false,
            search: { longRecipes },
            cart: [],
            cart: 0,
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
            offset: 0,
            number: 10,
            totalResults: 270817,
            processingTimeMs: 699,
            expires: 1580791459643,
            isStale: false,
            list: [
                {
                    title: "Butter Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Butter Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Veggie Pizza",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Butter Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Thai Red Curry",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                },
                {
                    title: "Greek Chicken",
                    desc: "Lorem Ipsum",
                    calories: "500",
                    servings: "4",
                    timeCook: "30"
                }
            ],

            filtered: [],
            category1: [],
            category2: [],
            category3: [],
            category4: [],
            history: [],
            searchResult: [],
            query: ""

        }


        this.handleChange = this.handleChange.bind(this);
        this.handlePageLoad = this.handlePageLoad.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.setVisible = this.setVisible.bind(this);


        this.handlePageLoad();
    }

    setVisible = (toWhat) => {
        this.setState({ visible: toWhat })
    }

    addToCart = (recipe) => {

        //this.state.cart = this.state.cart.concat(recipe);
        //this.state.cartLength = this.state.cartLength + 1;

        this.setState({ cart: this.state.cart.concat(recipe) })
        console.log(this.state.cart);
        console.log(this.state.cart.length);
    }

    removeFromCart = (recipe) => {
        let newarr = this.state.cart.filter(a => a !== recipe)
        //this.state.cart = this.state.cart.concat(recipe);
        //this.state.cartLength = this.state.cartLength + 1;
        this.setState({ cart: newarr })
        console.log(newarr);
        console.log(newarr.length);
    }





    componentDidMount() {
        this.setState({
            filtered: this.state.category1,
            cart: []
        });
    }



    handleAddToCart(item) {
        // user must have already signed in
        // would be good to prompt if they haven't

        // add the recipe to cart
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(item);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var requestOptions2 = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/add-to-cart", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                fetch("/recipe_history", requestOptions2)
                    .then(response => response.text())
                    .then(result => {
                        var json = JSON.parse(result);

                        this.setState({
                            history: json
                        })
                        console.log(this.state.history)
                    })
            })
            .catch(error => { console.log('error', error) }); //if there are errors, its probably because the user hasn't signed in


    }



    handleChange(e) {

        console.log(this.state.filtered);
        console.log(this.state.list);
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.category1;



            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.list;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                filtered: _.filter(this.state.category2, isMatch),
            })
        }, 300)


        console.log(this.state.query)
    }

    handleGetRecipe(item) {
        // HEY BRIGGS!!! This method gets the recipe instructions when someone clicks on the recipe image if you want to display it somehow

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "id": item['id'] });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/search-recipes", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);

                this.setState({
                    searchResult: json
                })
                console.log(this.state.category3)
            })
            .catch(error => console.log('error', error));
    }

    handleSearchSubmit() {
        //Define Query - call this method on submit of search function.
        //Probably have to refresh page to reload results unless we can avoid that somehow

        var raw = JSON.stringify({ "query": this.state.query });
        console.log(this.state.query)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/get-recipe-details", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);

                this.setState({
                    filtered: json
                })
                console.log(this.state.filtered)
            })
            .catch(error => console.log('error', error));

    }


    handleRewriteHistory(childHistory) {
        const fieldEditor = this.childLook.current;

        this.setState({ history: childHistory })
    }

    handleSearchChange(event) {
        this.setState({ value: event.target.value });
    }


    handlePageLoad(event) {

        console.log("hello");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "query": "", "cuisine": "", "intolerences": "", "diet": "Vegetarian" });
        var raw2 = JSON.stringify({ "query": "", "cuisine": "", "intolerences": "", "diet": "ketogenic" });
        var raw3 = JSON.stringify({ "query": "", "cuisine": "", "intolerences": "", "diet": "Vegan", "number": 20 });
        var raw4 = JSON.stringify({ "maxCalories": "600", "minProtein": "10" });



        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        var requestOptions2 = {
            method: 'POST',
            headers: myHeaders,
            body: raw2,
            redirect: 'follow'
        };

        var requestOptions3 = {
            method: 'POST',
            headers: myHeaders,
            body: raw3,
            redirect: 'follow'
        };

        var requestOptions4 = {
            method: 'POST',
            headers: myHeaders,
            body: raw4,
            redirect: 'follow'
        };

        var requestOptions5 = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/search-recipes", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);
                var newjson = []
                for (var i = 0; i < json.length; i++) {
                    var entry = json[i]["recipe"];

                    // entry["id"] = entry["url"];
                    // entry["title"] = entry["label"];
                    // entry["timeCook"] = entry["totalTime"];
                    // entry["servings"] = entry["yield"];
                    // const cals = Math.round(entry["calories"]);

                    // entry["calories"] = cals;
                    // entry["image"] = entry["image"];
                    // const imgArr = []
                    // imgArr.push( entry["image"]);
                    // entry["imageUrls"] = imgArr;

                    newjson.push(entry);
                }

                this.setState({
                    category1: json
                })
                console.log(this.state.category1)
            })
            .catch(error => console.log('error', error));

        fetch("/search-recipes", requestOptions2)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);

                this.setState({
                    category2: json
                })
                console.log(this.state.category2)
            })
            .catch(error => console.log('error', error));

        fetch("/search-recipes", requestOptions3)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);

                this.setState({
                    category3: json
                })
                console.log(this.state.category3)
            })
            .catch(error => console.log('error', error));

        fetch("/search-recipes-nutrition", requestOptions4)
            .then(response => response.text())
            .then(result => {
                console.log(result);

                var json = JSON.parse(result);

                this.setState({
                    category4: json
                })
                console.log(this.state.category4)
            })
            .catch(error => console.log('error', error));

        fetch("/recipe_history", requestOptions5)
            .then(response => response.text())
            .then(result => {
                // var json = JSON.parse(result);    
                console.log(result)
                //this.setState({
                // history: json
                //})
                console.log(this.state.history)
            })
        this.setState({
            filtered: this.state.category1
        });

    }


    render() {
        const { isLoading, value, results, filtered } = this.state

        const settings = {
            dots: true,
            infinite: true,
            arrows: true,
            speed: 500,

            autoplaySpeed: 100,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        return (
            <div >
                <NavBar style={{ position: 'fixed' }} sidebar={this.setVisible} cart={this.state.cart} />
                <Sidebar.Pushable as={Segment} >
                    <Sidebar className="overlay"
                        as={Menu}
                        style={{ backgroundColor: 'white' }}
                        animation='overlay'
                        icon='labeled'
                        direction='right'
                        inverted
                        onHide={() => this.setVisible(false)}
                        vertical
                        visible={this.state.visible}
                        width='wide'
                    >
                        <Menu.Item style={{ color: 'black' }}>
                            <h1 style={{ fontWeight: 600, textAlign: '' }}>Recipes       <i className="fa fa-long-arrow-right"></i>   Groceries</h1>
                        </Menu.Item>
                        <Cart callback={this.removeFromCart} cart={this.state.cart} />
                        <Menu.Item as='a' style={{ color: 'black' }} onClick={() => this.setVisible(false)}>
                            <i className="fa fa-times" style={{ fontSize: '30px', color: 'rgb(255, 255, 255)' }}></i>

                            close
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher style={{padding:'0'}}>
                        <Segment basic>
                            <div className="">
                                <Welcome />
                                <Steps />
                                
                                <Sliders callback={this.addToCart} res={recipes.result1} recipes={recipes} />
                                <RecipeSearch callback={this.addToCart} recipes={recipes.results1.concat(recipes.results2.concat(recipes.results3))} />
                                <Footer />
                            </div>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );

    }
}

export default App;
