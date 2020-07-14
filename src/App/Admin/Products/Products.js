import React from 'react';
import "./Products.scss";
import ProductService from "../../../services/product.service";
import {Link} from "react-router-dom";
import env from "../../environment";


class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        ProductService
        .getAll()
        .then( res => res.json())
        .then(products => this.setState({products}));
    }

    removeProduct(id){
        var confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if(confirmDelete === true){

        ProductService
        .remove(id)
        .then(() => this.load());
        }
    }

    render(){
        return (
            <div>
                <h2 className="admin-title">  Products </h2>

                <table className="table table-hover admin-table">
                    <thead>
                        <tr>
                            <th><Link className="btn btn-outline-dark" to="/admin/products/create"> new </Link></th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product, index) => {
                            return <tr key={index} >
                                <td><img className="product-image" alt="product"  src={product.image.includes('http') ? product.image : env.url + '/products/'+product.image} /></td>
                                <td>{product._id.substring(product._id.length -6)}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td><Link className="btn btn-primary" to={`/admin/products/edit/${product._id}`}>Edit</Link>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={this.removeProduct.bind(this,product._id)}>X</button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Products;