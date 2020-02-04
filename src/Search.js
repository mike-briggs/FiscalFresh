import React, { Component } from 'react'
import { Button, Search, Grid, Header, Segment, Label } from 'semantic-ui-react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const initialState = { isLoading: false, cart: [], results: [], value: '' }


const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export class RecipeSearch extends Component {

    constructor(props) {
        super(props);
        this.state = { initialState, baseUri: "https://spoonacular.com/recipeImages/", filtered: this.props.recipes };
        this.setState({ filtered: this.props.recipes })
    }

    handleResultSelect = (e, { result }) => {

        this.setState({ value: result.title })

    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.title)
        this.setState({
            isLoading: false,
            filtered: _.filter(this.props.recipes, isMatch),
        })


    }



    render() {
        const { isLoading, value, results } = this.state

        return (
            <div className="container">
                <div className="row" style={{ paddingBottom: '300px' }}>

                    <div className="col-lg-4 col-md-4">
                        <Search className="col-md-4"
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, {
                                leading: true,
                            })}
                            resultRenderer={resultRenderer}
                            results={this.state.filtered}
                            value={value}
                            {...this.props}
                        />
                    </div>
                    <div className="col-lg-8 col-md-4">
                        <Segment>

                            <div className="row">

                                {this.state.filtered.sort().slice(0, 4).map(item => (
                                    <div className="container mb-5 padding-10 col-md-6">
                                        <div className="card drop-shadow noBorder" >
                                            {/*<h2>Recipes</h2> <div style={{ objectFit: 'cover', width: 'auto', height: '170px', overflow: 'hidden' }}>
                                            <img src={this.state.baseUri + "/" + item.imageUrls} style={{ width: '100%' }}></img>
                            </div>*/}
                                            <div className="row">
                                                <div className="card-body col-xl-8 col-lg-8 col-md-8">


                                                    <h2 style={{ paddingBottom: '0', fontSize: '16px', fontWeight: '600' }} className="">{item.title}</h2>
                                                    <p className="card-text">{item.desc}</p>
                                                </div>
                                                <div className="col-xl-4 col-lg-4 col-md-4 product" style={{ marginTop: '30px' }}>

                                                    <ul className="social">

                                                        <li><p style={{ paddingBottom: '10px', fontWeight: '500', fontSize: '12px' }}><i className="recipeIcons fa fa-clock-o" ></i>{item.readyInMinutes}   mins</p></li>
                                                        <li><p style={{ paddingBottom: '10px', fontWeight: '500', fontSize: '12px' }}><i className="recipeIcons fa fa-user" ></i>{item.servings}   servings</p></li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="card-footer noBorder" style={{ textAlign: 'right' }}>
                                                <Button href="" className="btn btn-sm" onClick={() => this.props.callback(item)} style={{ backgroundColor: "#6cd34c", color: "#fff" }}><i className="fa fa-shopping-cart" ></i> Add to Cart</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Segment>
                    </div>
                </div>
            </div>




        )
    }
}

export default RecipeSearch
