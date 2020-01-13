import React from 'react';
import "./EditProduct.scss";
import ProductService from '../../../../services/product.service';
import CategoryService from '../../../../services/category.service';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Product from '../../../../models/Product';



class EditProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            product:{},
            categories: [],
            changeImage: false,
            submitting:false
        };
    }
    componentDidMount(){
        ProductService
        .getById(this.props.match.params.productId)
        .then(res => res.json())
        .then(product => this.setState({product}));

        CategoryService
        .getAll()
        .then(response => response.json())
        .then(categories => {
            this.setState({categories});
        });

        

    }

    toggleShow() {
        this.setState({ changeImage: !this.state.changeImage });
      }

    send(values){

        this.setState({submitting: true});
        values.changeImage = this.state.changeImage;
        ProductService
        .update(values, this.props.match.params.productId)
        .then( () => {
            this.setState({submitting: false});
            this.props.history.push('/admin/products');
        });
    }


    render(){
        return (
            <div className="inner-admin">

            <Formik initialValues={{
                name: this.state.product.name,
                model: this.state.product.model,
                brand: this.state.product.brand, 
                short: this.state.product.short,
                description: this.state.product.description,
                price: this.state.product.price,
                categoryId: this.state.product.categoryId,
                image: this.state.product.image
                 }}
            validationSchema={Product}
            onSubmit={this.send.bind(this)}
            enableReinitialize
            render={({setFieldValue}) => {
        return  <Form className="col-sm-6">
        <div className="form-group">
            <label>Name:</label>
            <Field type="text" className="form-control" name="name" />
            <ErrorMessage className="alert alert-success" name="name" component="div" />
        </div>
        <div className="form-group">
            <label>Model:</label>
            <Field type="text" className="form-control" name="model" />
            <ErrorMessage className="alert alert-success" name="model" component="div" />
        </div>
        <div className="form-group">
            <label>Brand:</label>
            <Field type="text" className="form-control" name="brand" />
            <ErrorMessage className="alert alert-success" name="brand" component="div" />
        </div>
        <div className="form-group">
            <label>Short Description:</label>
            <Field type="text" className="form-control" name="short" />
            <ErrorMessage className="alert alert-success" name="short" component="div" />
        </div>
        <div className="form-group">
            <label>Description:</label>
            <Field type="text" className="form-control" name="description" />
            <ErrorMessage className="alert alert-success" name="description" component="div" />
        </div>

        <div className="form-group">
            <label>Price:</label>
            <Field type="text" className="form-control" name="price"  />
            <ErrorMessage className="alert alert-success" name="price" component="div" />
        </div>
        <div className="form-group">
            <label>Category:</label>
            <Field className="form-control" component="select" name="categoryId">
            <option defaultValue>choose category</option>
                {this.state.categories.map((category, index) => {
                    return  <option key={index} value={category.id}>{category.name}</option>

                })}
                </Field>
            <ErrorMessage className="alert alert-success" name="categoryId" component="div" />
        </div>

            {this.state.changeImage ?     
            <div className="form-group">  
                  <label>image:</label><br/>
            <input type="file" name="image" onChange={(event) =>{
                setFieldValue('image', event.currentTarget.files[0]);
            }}/>
            <ErrorMessage className="alert alert-success" name="image" component="div" />
            </div>
          :
          <button className="btn btn-success" onClick={this.toggleShow.bind(this)}> change image </button>
          }
          <br/>
          <br />
        <button type="submit" className="btn btn-primary" disabled={this.state.submitting}>Update product</button>

    </ Form >;
    }}>
    </ Formik>
    </div>

        )
    }
}

export default EditProduct;