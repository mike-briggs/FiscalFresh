import React, { Component } from 'react'
import { Menu, Item, Icon } from 'semantic-ui-react'
export class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: this.props.cart
        }
    }

    render() {

        if (this.props.cart.length > 0) {
            return (
                this.props.cart.map(item => (
                    <Menu.Item onClick={()=>this.props.callback(item)} style={{textAlign:'left',color:'black'}}>

                        <i className="fa fa-times" style={{ paddingRight:'20px',fontSize: '30px', color: '#6cd34c' }}></i>
                        
                            { item.title }
                    </Menu.Item >
                    
                        
                    

                ))
            
            )
        } else {
            return (
                <div>
                    Nothing in cart
                </div>
            )
        }

    }
}

export default Cart
