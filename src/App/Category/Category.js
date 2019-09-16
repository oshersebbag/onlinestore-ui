import React from 'react';
import './Category.scss';
import ProductService from '../../services/product.service';
import{Link} from "react-router-dom";


class Category extends React.Component {
    constructor(props){
        super(props);
        this.categoryId = this.props.match.params.id;
        this.state = {
            products:[]
        };
    }
    componentDidMount(){
        ProductService
        .getByCategoryId(this.categoryId)
        .then(res => res.json())
        .then(products => {
            this.setState({products});
        });
    }
    render(){
        return (
            <div className="whatNow">
                {this.state.products.map((product, index)=> {
                    return <Link className="categoryPoducts" key={index} to={`/category/${this.categoryId}/product/${product._id}`}>{product.name}</Link>
                })}
            </div>
        )
    }
}

export default Category;