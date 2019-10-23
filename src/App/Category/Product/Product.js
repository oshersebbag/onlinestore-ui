import React from 'react';
import './Product.scss';
import ProductService from '../../../services/product.service';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';

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
        this.props.addToCart(this.state.product._id);
    }

    render(){
        return (
            <div className="product-page-container">
                <img src={'http://localhost:4000/products/'+this.state.product.image} />
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

export default connect(null, {
    addToCart
})(Product);