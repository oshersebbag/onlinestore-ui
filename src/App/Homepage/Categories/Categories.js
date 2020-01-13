import React from 'react';
import './Categories.scss';
import CategoryService from '../../../services/category.service';
import  { Link }  from "react-router-dom";
import env from '../../environment';

class Categories extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            categories: []
        }
    }
    componentDidMount(){
        CategoryService
        .getAll()
        .then(res => res.json())
        .then(categories => {
            this.setState({categories});
        });
    }
    render(){
        return (
                <div className="categories-container">
                {this.state.categories.map((category, index) => {
        return <Link className="myCategory " key={index} to={'/category/' + category.id}>
        <div className="categoryTitle"><h3>{category.name}</h3></div>
        <div className="categoryImage"> <img  alt={category.name} src={env.url + '/categories/'+category.image}/></div>
    </ Link>
})}
                </div>
                

        )
    }
}

export default Categories;