import React from 'react';
import "./Admin.scss";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Products from './Products/Products';
import Users from './Users/Users';
import Categories from './Categories/Categories';
import UserService from '../../services/user.service';
import CreateProduct from './Products/CreateProduct/CreateProduct';


class Admin extends React.Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        UserService
        .me()
        .then(response => response.json())
        .then(user => {
            if(! user.isAdmin){
                this.props.history.push('/');
            }

        });
    }
    render(){
        return (
            <Router>
            <div className="container admin-container"> 
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="/admin/products">Products</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/admin/Categories">Categories</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="/admin/Users">Users</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <Route path="/admin/products" exact component={Products} />
                        <Route path="/admin/products/create" component={CreateProduct} />

                        <Route path="/admin/users" component={Users} />
                        <Route path="/admin/categories" component={Categories} />

                    </div>
                </div>
            </div>
            </div>
            </Router>
        )
    }
}

export default Admin;