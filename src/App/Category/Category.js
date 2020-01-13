import React from 'react';
import './Category.scss';
import ProductService from '../../services/product.service';
import CategoryService from '../../services/category.service';
import{Link} from "react-router-dom";


class Category extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            categoryName: ""
                };
    }
    componentDidMount(){
        ProductService
        .getByCategoryId(this.props.match.params.id)
        .then(res => res.json())
        .then(products => {
            this.setState({products});
        });

        CategoryService
        .getById(this.props.match.params.id)
        .then(res => res.json())
        .then(category => {
            this.setState({categoryName: category});
        });

        }


    componentWillReceiveProps(nextProps){
        var newid = nextProps.match.params.id;
        ProductService
        .getByCategoryId(newid)
        .then(res => res.json())
        .then(products => {
            CategoryService
            .getById(newid)
            .then(res => res.json())
            .then(category => {
                this.setState({products: products,categoryName: category});
            });
    
        });
    }
    

    render(){
        return (
            <div> 
                <div className="category-page-title-container"><div className="category-page-title">{this.state.categoryName.name}</div></div>
                <div className="category-page-subtitle-container">  {this.state.products.length} products found</div>


            <div className="category-container">
                {this.state.products.map((product, index)=> {
                    return <Link className="category-poduct-container" key={index} to={`/category/${this.props.match.params.id}/product/${product._id}`}>
                   <div className="category-product-img-container"><div className="item"> <img className="category-product-img" alt="product" src={'http://localhost:4000/products/'+product.image} /> </div> </div>
                    <div className="category-product-title">
                        <div className="category-product-title-name">{product.name}</div>
                        <div className="category-product-title-price">for {product.price} <sub>(NIS)</sub> only</div>
                    </div>
                    </Link>
                })}
            </div>
            </div>
        )
    }
}

export default Category;