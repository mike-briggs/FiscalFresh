import React, { Component } from 'react'
import Sample from "./Login"
import {Button} from 'semantic-ui-react'
export class NavBar extends Component {
    state = {
        animation: 'overlay',
        direction: 'right',
        dimmed: true,
        visible: false,
      }

    constructor(props) {
        super(props);
        this.childLook = React.createRef();
        this.handleRewriteHistory = this.handleRewriteHistory.bind(this);
    }

    handleRewriteHistory(childHistory) {
        const fieldEditor = this.childLook.current;

        this.setState({ history: childHistory })
    }

    handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))

    render() {
        return (

            <div>
                <header className="header-area header-sticky">
                    

                        <div className="row">
                            <div className="col-12">
                                <nav className="main-nav">
                                <div className="container">
                                    <a href="#" className="logo" style={{ color: 'black' }}>
                                        <h2 style={{fontSize:'24px',fontWeight:'600', marginTop:'2px', letterSpacing:'0'}}> Fiscal Fresh</h2>
                                    </a>
                                    <ul className="nav">
                                        <li><Sample  ref={this.childLook} onChange={this.handleRewriteHistory.bind(this)}></Sample></li>
                                        
                                        <li><a><hr style={{width:'1px',marginTop:'2px', height:'100%', backgroundColor:'lightGrey'}}></hr></a></li>
                                        
                                        <li><a onClick={() => this.props.sidebar(true)}><i className="fa fa-shopping-cart" style={{ fontSize: '30px', marginTop:'2px', color: 'rgb(91, 206, 56)' }}></i></a></li>
                                        <li><a className="main-button-slider">{ this.props.cart.length!=0? this.props.cart.length:0 }</a></li>
                                    
                                    </ul>
                                    <a onClick={() => this.props.sidebar(true)} className='menu-trigger'>
                                        <span>Menu</span>
                                    </a>
                                
                            </div>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default NavBar



