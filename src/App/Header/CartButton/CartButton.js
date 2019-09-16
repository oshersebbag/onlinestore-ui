import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './CartButton.scss';
import cartService from '../../../services/cart.service';

class CartButton extends React.Component {
    getNumberOfItems(){
        return cartService.getAll().length;
    }
    render(){
        return (
            <div>
                <FontAwesomeIcon icon={faCartArrowDown}/> <span class="badge badge-primary">
                    {this.getNumberOfItems()}
                </span>

            </div>
        )
    }
}

export default CartButton;