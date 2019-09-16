import React from 'react';
import cartService from '../../services/cart.service';
import productService from "../../services/product.service";


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
            console.log(this.state.cartItems);
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
        cartService.remove(prodctId);
        this.loadCart();
    }

    render(){
        return (
            <div className="whatNow">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price <sub>(NIS)</sub></th>
                  <th>Quantity</th>
                  <th colSpan="2">Sub-total<sub>(NIS)</sub></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.cartItems.map((item, i) => {
                  return <tr key={i}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.price.toFixed(1)} </td>
                    <td>{item.qty} </td>
                    <td colSpan="2">{(item.qty * item.price).toFixed(1)} </td>
                    <td><button className="btn btn-danger" onClick={this.removeProduct.bind(this, item._id)}>X</button></td>


                  </tr>
                })}
              <tr><td colSpan="6"></td></tr>

              </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2">
                    </td>
                    <td><strong>Total:</strong></td>
                    <td>{this.calcTotal(this.state.cartItems).toFixed(1)}</td>

                </tr>
            </tfoot>
            </table>
            </div>
        )
    }
}

export default Cart;