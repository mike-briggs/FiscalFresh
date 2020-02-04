import React, { Component } from 'react'
import './assets/css/qweb.css'
export class Welcome extends Component {
    render() {
        return (
            <div>
                <div className="welcome-area" id="welcome">
                    <div className="header-text">
                        <div className="container">
                            <div className="row home-features" >
                                <div className="offset-xl-1 col-xl-12 offset-lg-2 col-lg-12 col-md-12 col-sm-12">
                                    <h1 style={{ fontWeight: 600, textAlign: 'left' }}>Recipes       <i className="fa fa-long-arrow-right"></i>   Groceries</h1>
                                    <h4 className="compress">Browse your favourite recipes by cusine, meal type, various diets. Find some you like, add to cart and we will order the groceries you need.</h4>
                                    <div style={{ paddingBottom: '20px' }}>
                                        <a href="#steps" className="main-button-slider">Learn More</a>
                                    </div>
                                    {//<a href="./sponsor.js" className="main-button-donate">Sponsor Us</a>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome
