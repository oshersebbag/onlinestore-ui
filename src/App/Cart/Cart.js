import React from 'react';
import cartService from '../../services/cart.service';
import productService from "../../services/product.service";
import {connect} from 'react-redux';
import {removeFromCart} from '../redux/actions';
import  { Link }  from "react-router-dom";
import './Cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faGlobeAmericas, faCheck } from '@fortawesome/free-solid-svg-icons';




class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cartItems: []
        };
    }

    componentDidMount(){
        this.loadCart();
    }

    loadCart(){
        const cartProducs = cartService.getAll();
        let ids = cartProducs.map(product => product.id);
        productService
        .getByIds(ids)
        .then(res => res.json())
        .then(products => {
            products = this.addQuantities(products,cartProducs);
            this.setState({cartItems: products});
            }  
                )
        .catch( err => console.log(err));
    }

    addQuantities(products, cartProducs){
        let cartObj ={};
        cartProducs.forEach( product => cartObj[product.id]=product.qty);
        products.forEach(product => product.qty = cartObj[product._id]);
        return products;
    }

    calcTotal(products){
        let total=0;
        products.forEach(product => {
            total +=product.qty * product.price;
        });
        return total;
    }

    removeProduct(prodctId){
        var confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if(confirmDelete === true){
            this.props.removeFromCart(prodctId);
            this.loadCart();
        }


    }

    render(){
        return (
            <div className="cart-container">
             {Object.keys(this.state.cartItems).length === 0 ? 
             <div className="empty-cart-container">
                 <img alt="empty" className="empty-cart-img" src="/images/empty_cart.png"/>
                 <h3 className="empty-title"> your shopping cart is empty :( </h3>
                 <p className="empty-subtitle"> add a product and make me happy again!</p>
                 <Link className="link-to-hompage" to="/"> <p className="empty-link-p">back to the shop ></p> </Link>
             </div>
             
             
             :
             <div> 
             <h3 className="cart-title">welcome to your cart!</h3>
            <div className="cart-body-container">
            <table className="cart-table table table-hover">
              <thead>
                <tr>
                <th></th>
                  <th>Product</th>
                  <th>Price <sub>(NIS)</sub></th>
                  <th>Quantity</th>
                  <th colSpan="2">Sub-total<sub>(NIS)</sub></th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.cartItems.map((item, i) => {
                  return <tr key={i}>
                    <td><img className="cart-product-image" alt="product" src={'http://localhost:4000/products/'+item.image} /></td>
                    
                    <td><Link className="cart-link"to={`/category/${item.categoryId}/product/${item._id}`}>{item.name}</Link></td>
                    <td>{item.price.toFixed(1)} </td>
                    <td>{item.qty} </td>
                    <td colSpan="2">{(item.qty * item.price).toFixed(1)} </td>
                    <td>
                        <button className="remove-from-cart-btn" onClick={this.removeProduct.bind(this, item._id)}><FontAwesomeIcon icon={faTimesCircle}/> </button></td>


                  </tr>
                })}
                 </tbody>
              <tfoot><tr><td colSpan="7"></td></tr></tfoot>
            </table>
            <div className="total-container">
                <h3 className="total-title">Total</h3>

                <div className="sub-total-container">
                <span className="total-left">sub-total</span>
                <span className="total-right">{this.calcTotal(this.state.cartItems).toFixed(1)} </span>
                </div>

                <div className="delivery-container">
                <span className="total-left">Shipping  <FontAwesomeIcon icon={faGlobeAmericas}/></span>
                <span className="total-right"> free </span>
                </div>
                
                <Link className="link-to-checkout" to="/cart"> <p className="checkout-link-p">checkout</p> </Link>
                <p className="we-accept-container"> we accept <FontAwesomeIcon icon={faCheck}/></p>
                <img alt="cards accepted" src="/images/cards.png" />
            </div>
            </div>
            </div>
             }
            </div>

        )
    }
}



export default connect(null, {
    removeFromCart
})(Cart);