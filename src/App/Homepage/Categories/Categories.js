import React from 'react';
import './Categories.scss';
import CategoryService from '../../../services/category.service';
import  { Link }  from "react-router-dom";

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
            <div>
                <div className="home-sub-title">
                <hr/>
                <p className="mySubTitle" ><b>welcome to MyStore!</b> the place where you can buy all the stuff you really need</p>
                <hr/>
                </div>
                <div className="home-container">
                {this.state.categories.map((category, index) => {
                    var mypath="/images/categories/"+category.name+".gif"
        return <Link className="myCategory" key={index} to={'/category/' + category.id}>
        <div className="categoryTitle"><h3>{category.name}</h3></div>
        <div className="categoryImage"> <img  alt={category.name} src={mypath}/></div>
    </ Link>
})}
                </div>
                </div>

        )
    }
}

export default Categories;