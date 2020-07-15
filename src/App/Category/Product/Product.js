import React from 'react';
import './Product.scss';
import ProductService from '../../../services/product.service';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';
import{Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import env from "../../environment";


class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product:{},
            products:[]
        };
    }
    componentDidMount(){
        ProductService
        .getById(this.props.match.params.productId)
        .then(res => res.json())
        .then(product => 
            {
                this.setState({product});
                ProductService
                .getByCategoryId(this.state.product.categoryId)
                .then(res => res.json())
                .then(products => {
                    this.setState({products});
                });
              }  );

    }


    componentWillReceiveProps(nextProps){
        var newid = nextProps.match.params.productId;
        ProductService
        .getById(newid)
        .then(res => res.json())
        .then(product => 
            {
                this.setState({product});
                ProductService
                .getByCategoryId(this.state.product.categoryId)
                .then(res => res.json())
                .then(products => {
                    this.setState({products});
                });
              }  );
    }


    randomProducts(products){
        const arr = products.filter(element => element._id !== this.state.product._id);
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i);
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
          
          var myProducts = arr.slice(0, 3);
          return myProducts;
          
    }

    addToCart(){
        this.props.addToCart(this.state.product._id);
    }

    myImage(str){
        if(str){
            if(str.includes('http')){
                return str;
            }
            else{
                return env.url + '/products/'+str;

            }}
        else {
            return str;
        }    
        }
    

    render(){
        console.log(this.state.product.image);
        return (
            <div className="product-page-container">
                <div className="product-top">
                <div className="product-right">
                <img className="product-right" alt="product" src={this.myImage(this.state.product.image)} />
                </div>
                <div className="product-left">
                    <h3 className="product-page-title">{this.state.product.name}&nbsp;{this.state.product.model}</h3>
                    <h6 className="product-page-brand">by {this.state.product.brand}</h6>
                    <h5 className="product-page-price"> {(this.state.product.price * 1).toFixed(2)} <sub>(NIS)</sub></h5>
                    <hr/>
                    {this.state.product.short}
                    <hr/>
                    <br/>
                <button className="btn-add-to-cart" onClick={this.addToCart.bind(this)}>add to cart</button>
                </div>
                </div>
                <h3 className="random-title">more info...</h3>

                <div className="product-description">
                <hr/>
                {this.state.product.description}
                </div>

                <h3 className="random-title">you may also like...</h3>
                <div className="product-description">
                <hr/>
                </div>

                <div className="random-products">
                {this.randomProducts(this.state.products).map((product, index)=> {
                    return <Link className="random-link" key={index} to={`/category/${product.categoryId}/product/${product._id}`}>
                        <div className="random-pic-container">
                        <img className="random-pic" alt="product" src={product.image.includes('http') ? product.image : env.url + '/products/'+product.image} />
                        <div className="random-overlay">
                             <div className="random-text"><FontAwesomeIcon icon={faSearchPlus}/></div>
                        </div>

                        </div>
                    <div className="random-product-title">
                        <div className="random-product-title-name">{product.name}</div>
                        <div className="random-product-title-price">for {product.price} <sub>(NIS)</sub> only</div>
                    </div>
                    </Link>
                    })}
                    </div>

                    <div className="product-description">
                <hr/>
                </div>

            </div>
        )
    }
}

export default connect(null, {
    addToCart
})(Product);