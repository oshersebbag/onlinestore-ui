import React from 'react';
import "./Categories.scss";
import CategoryService from "../../../services/category.service";
import {Link} from "react-router-dom";



class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        this.load();
    }

    load(){
        CategoryService
        .getAll()
        .then( res => res.json())
        .then(categories => this.setState({categories}));
    }

    removeCategory(id){
        var confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if(confirmDelete === true){
        CategoryService
        .remove(id)
        .then(() =>{
            this.load();
        } );
    }
}

    render(){
        return (
            <div>
                <h2 className="admin-title"> categories </h2>

                <table className="table table-hover admin-table admin-categories-table">
                    <thead>
                        <tr>
                            <th><Link className="btn btn-outline-dark" to="/admin/categories/create"> new </Link></th>
                            <th>name</th>
                            <th>options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((category, index) => {
                            return <tr key={index} >
                                <td><img className="category-image" alt="category" src={'http://localhost:4000/categories/'+category.image} /></td>
                                <td>{category.name}</td>
                                <td><Link className="btn btn-primary" to={`/admin/categories/edit/${category.id}`}>Edit</Link>
                                &nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={this.removeCategory.bind(this,category.id)}>X</button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Categories;