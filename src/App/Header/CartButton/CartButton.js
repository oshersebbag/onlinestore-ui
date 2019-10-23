import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './CartButton.scss';
import cartService from '../../../services/cart.service';
import {connect} from 'react-redux';

class CartButton extends React.Component {

    render(){
        return (
            <div>
                <FontAwesomeIcon icon={faCartArrowDown}/><span className="badge badge-primary">
                    {this.props.itemCount}
                </span>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemCount: state.cartItemsCount
    }
};
export default connect(mapStateToProps)(CartButton);