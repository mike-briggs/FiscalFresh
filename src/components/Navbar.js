import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = ()=>{
    return(
        <header className="header-area header-sticky">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="main-nav">
                        <a href="#" className="logo" style={{ color: 'black' }}>
                            Meal Prepper
            </a>
                        <ul className="nav">
                            
                            <li><a href="/" className="main-button-slider">Home</a></li>
                            <li><h2 href="/cart"><i className="fa fa-shopping-cart" style={{ color: 'rgb(91, 206, 56)' }}></i> </h2></li>
                            <li><Link onClick={this.props.setVisible} to="/cart"><i className="fa fa-shopping-cart" style={{ color: 'rgb(91, 206, 56)' }}></i> </Link></li>
        
                        </ul>
                        <a >
                        <Link onClick={this.props.setVisible} to="/cart"><i className="fa fa-shopping-cart" style={{ color: 'rgb(91, 206, 56)' }}></i> </Link>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
        </header>
   
        
    )
}

export default Navbar;