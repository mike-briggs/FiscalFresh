import React, { Component } from 'react'
//import ReactTypingEffect from 'react-typing-effect';
import _ from 'lodash'
import faker from 'faker'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'


import '../assets/css/qweb.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/font-awesome.css';
import Slider from "react-slick";
//import "./slick-carousel/slick/slick.css"; 
//import "./slick-carousel/slick/slick-theme.css";
import food from "../assets/images/food.jpg";
import axios from 'axios';
import { addToCart } from './actions/cartActions'


const initialState = { isLoading: false, results: [], value: '' }

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

        

        this.state = {
            results: [
                {
                    "id": 592479,
                    "title": "Kale and Quinoa Salad with Black Beans",
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
                    title:"Butter Chicken",
                    desc:"Lorem Ipsum",
                    calories:"500",
                    servings:"4",
                    timeCook:"30"
                },
                {
                    title:"Butter Chicken",
                    desc:"Lorem Ipsum",
                    calories:"500",
                    servings:"4",
                    timeCook:"30"
                },
                {
                    title:"Veggie Pizza",
                    desc:"Lorem Ipsum",
                    calories:"500",
                    servings:"4",
                    timeCook:"30"
                },
                {
                    title:"Butter Chicken",
                    desc:"Lorem Ipsum",
                    calories:"500",
                    servings:"4",
                    timeCook:"30"
                },
                {
                    title:"Thai Red Curry",
                    desc:"Lorem Ipsum",
                    calories:"500",
                    servings:"4",
                    timeCook:"30"
                },
                {
                    title:"Greek Chicken",
                    desc:"Lorem Ipsum",
                    calories:"500",
                    servings:"4",
                    timeCook:"30"
                }
            ],
            
            filtered: []

        }
        

        this.handleChange = this.handleChange.bind(this);
    }

    state = initialState

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    componentDidMount() {
        this.setState({
          filtered: this.state.list
        });
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
      currentList = this.state.list;

      

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
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    handleClick = (id)=>{
        addToCart(id); 
    }

    handleSubmit(event) {
        
        console.log("hello");
        const data = {
          query: "chicken"
        }
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"query":"sausage","cuisine":"italian","intolerences":""});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("/search-recipes", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className="">
                {this.handleSubmit()}

                <header className="header-area header-sticky">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <nav className="main-nav">
                                    <a href="#" className="logo" style={{ color: 'black' }}>
                                        Meal Prepper
                        </a>
                                    <ul className="nav">
                                        <li><a href="#" className="main-button-slider" onClick={this.handleSubmit}>Sign Up</a></li>

                                        <li><h3 href="#"><i className="fa fa-shopping-cart" style={{ color: 'rgb(91, 206, 56)' }}></i> </h3></li>

                                    </ul>
                                    <a className='menu-trigger'>
                                        <span>Menu</span>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="welcome-area" id="welcome">

                    <div className="header-text">
                        <div className="container">
                            <div className="row home-features" >
                                <div className="offset-xl-1 col-xl-12 offset-lg-2 col-lg-12 col-md-12 col-sm-12">


                                    <h1 style={{ fontWeight: 600 }}>Recipes       <i className="fa fa-long-arrow-right"></i>   Groceries</h1>
                                    <h4 className="compress">Browse your favourite recipes by cusine, meal type, various diets. Find some you like, add to cart and we will order the groceries you need.</h4>
                                    <div style={{paddingBottom:'20px'}}>
                                    <a href="" className="main-button-slider">Learn More</a>
                                    </div>
                                    {//<a href="./sponsor.js" className="main-button-donate">Sponsor Us</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="section home-feature white-bg">
                    <div className="container white-bg">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="features-small-item">
                                            <div className="icon">
                                            </div>
                                            <i style={{ fontFamily: 'Poppins Bold', fontSize: '50px' }}>1</i>

                                            <h5 className="features-title">Tasty, Healthy Recipes</h5>
                                            <p className="">Browse our curated recipes add add your favourites to the cart.</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="features-small-item">
                                            <div className="icon">
                                                <i style={{ fontFamily: 'Poppins Bold', fontSize: '50px' }}>2</i>
                                            </div>
                                            <h5 className="features-title">Compiled Ingredients</h5>
                                            <p className="">We will process and find the ingredients you need.</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                        <div className="features-small-item">
                                            <div className="icon">
                                                <i style={{ fontFamily: 'Poppins Bold', fontSize: '50px' }}>3</i>
                                            </div>
                                            <h5 className="features-title">Grocery Checkout</h5>
                                            <p className="">Continue to checkout at the grocery store to save you money.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section home-feature ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div>
                                    <h2 style={{ marginTop: '175px', marginLeft: '50px', marginBottom: '90px', fontWeight: '600' }}> Browse Recipes by Category Below.</h2>
{/*Slider*/}                         <h3 style={{ marginTop: '10px', marginLeft: '50px', marginBottom: '10px', fontWeight: '600' }}> Category</h3>
                                    <div className="margin-bottom-60">
                                        <Slider {...settings}>
                                        {this.state.results.map(item => (
                                            <div key={item} className="mb-5 padding-10">
                                                <div key={item} className="card" >
                                                    <div style={{ objectFit: 'cover', width: 'auto', height: '100px', overflow: 'hidden' }}>
                                                        <img src={this.state.baseUri+"/"+item.imageUrls} style={{ width: '100%' }}></img>
                                                    </div>
                                                    <div className="row">
                                                        <div className="card-body col-xl-8 col-lg-8 col-md-8">


                                                            <h5 className="card-title">{item.title}</h5>
                                                            <p className="card-text">{item.desc}</p>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-4 col-md-4 product" style={{marginTop:'30px'}}>
                                                            
                                                            <ul className="social">
                                                                
                                                                <li><a href=""><i className="recipeIcons fa fa-bolt" ></i></a>{item.calories}kcal</li>
                                                                <li><a href=""><i className="recipeIcons fa fa-clock-o" ></i></a>{item.timeCook}   mins</li>
                                                                <li><a href=""><i className="recipeIcons fa fa-user" ></i></a>{item.servings}   servings</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="card-footer " style={{ textAlign: 'right' }}>
                                                        <a href="#" className="btn btn-sm" style={{backgroundColor:"#6cd34c", color:"#fff"}} onClick={() => this.handleClick(item.id)} ><i className="fa fa-shopping-cart" ></i> Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                            
                                        </Slider>
                                    </div>


                                   

                                    


                                    {/*Search*/}

                                    <Grid>
                                        <Grid.Column width={6}>
                                            <Search onChange={this.handleChange}
                                                loading={isLoading}
                                                onResultSelect={this.handleResultSelect}
                                                
                                                results={results}
                                                value={value}
                                                {...this.props}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width={10}>
                                            <Segment>
                                                <h2>Recipes</h2>
                                                <div className="row">
                                                    {this.state.filtered.map(item => (
                                                        <div key={item} className="mb-5 padding-10 col-md-4">
                                                        <div key={item} className="card" >
                                                            <div style={{ objectFit: 'cover', width: 'auto', height: '100px', overflow: 'hidden' }}>
                                                                <img src={food} style={{ width: '100%' }}></img>
                                                            </div>
                                                        <div key={item} className="card-body col-xl-12 col-lg-12 col-md-12">
                                                            <h4 className="card-title">{item.title}</h4>
                                                            <p className="card-text">{item.desc}</p>
                                                        </div>
                                                        <div className="card-footer " style={{ textAlign: 'right' }}>
                                                        <a key={item} href="#" className="btn btn-success btn-sm" ><i className="fa fa-shopping-cart" style={{ color: '#fff' }} ></i> Add to Cart</a>
                                                    </div>
                                                        </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                

                                                {/*<pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
        </pre>*/}
                                            </Segment>
                                        </Grid.Column>
                                    </Grid>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Ingredients List */}
                <section>
                    <h2 className="dairy"></h2>
                    <li className="item"></li>
                    <h2 className="dairy"></h2>
                    <li className="item"></li>
                    <h2 className="dairy"></h2>
                    <li className="item"></li>
                    <h2 className="dairy"></h2>
                    <li className="item"></li>
                </section>





                <footer>
                    <div className="container">
                        <div className="row">

                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <p className="copyright">Copyright &copy; 2020 Meal Prepper</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );

    }
}

export default App;
