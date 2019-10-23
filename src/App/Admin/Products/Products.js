import React from 'react';
import "./Products.scss";
import ProductService from "../../../services/product.service";
import {Link} from "react-router-dom";


class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        ProductService
        .getAll()
        .then( res => res.json())
        .then(products => this.setState({products}));
    }

    render(){
        return (
            <div>
                <h2> Products </h2>
                <div className="d-flex justify-content-end mb-3">
                    <Link className="btn btn-primary" to="/admin/products/create">Create new product</Link>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
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
                                <td><img className="product-image" src={'http://localhost:4000/products/'+product.image} /></td>
                                <td>{product._id.substring(product._id.length -6)}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td></td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Products;