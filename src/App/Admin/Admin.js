import React from 'react';
import "./Admin.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Products from './Products/Products';
import Users from './Users/Users';
import Categories from './Categories/Categories';
import UserService from '../../services/user.service';
import CreateProduct from './Products/CreateProduct/CreateProduct';
import EditProduct from './Products/EditProduct/EditProduct';
import CreateCategory from './Categories/CreateCategory/CreateCategory';
import EditCategory from './Categories/EditCategory/EditCategory';


class Admin extends React.Component {
    componentDidMount(){
        UserService
        .me()
        .then(response => response.json())
        .then(user => {
            if(! user.isAdmin){
                alert("nice try, you're not an Admin");
                this.props.history.push('/');
            }

        });
    }
    render(){
        return (
            <Router>
            <div className="admin-container"> 
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="admin-link" to="/admin/products">Products</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="admin-link" to="/admin/Categories">Categories</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="admin-link" to="/admin/Users">Users</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        
                        <Route path="/admin/products" exact component={Products} />
                        <Route path="/admin/products/create" component={CreateProduct} />
                        <Route path = "/admin/products/edit/:productId" component={EditProduct} />


                        <Route path="/admin/categories" exact component={Categories} />
                        <Route path="/admin/categories/create" component={CreateCategory} />
                        <Route path = "/admin/categories/edit/:categoryId" component={EditCategory} />



                        <Route path="/admin/users" component={Users} />


                    </div>
                </div>
            </div>
            </div>
            </Router>
        )
    }
}

export default Admin;