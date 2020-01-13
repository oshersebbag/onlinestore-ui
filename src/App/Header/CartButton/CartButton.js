import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './CartButton.scss';
import {connect} from 'react-redux';

class CartButton extends React.Component {

    render(){
        return (
            <div className="header-cart">
                <FontAwesomeIcon icon={faCartArrowDown}/>&nbsp;<span className="badge badge-primary">
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