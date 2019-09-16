import React from 'react';
import './Product.scss';
import {Link} from "react-router-dom";
import ProductService from '../../../services/product.service';
import CartService from '../../../services/cart.service';

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product:{}
        };
    }
    componentDidMount(){
        ProductService
        .getById(this.props.match.params.productId)
        .then(res => res.json())
        .then(product => this.setState({product}));

    }

    addToCart(){
        CartService
        .add(this.state.product._id, 1)
    }

    render(){
        return (
            <div className="product-page-container">
                {this.state.product.name}
                {this.state.product.price}
                <br/>
                <br/>
                <hr/>
                <button className="btn-add-to-cart" onClick={this.addToCart.bind(this)}>add to cart</button>
            </div>
        )
    }
}

export default Product;