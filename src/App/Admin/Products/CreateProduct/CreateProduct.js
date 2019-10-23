import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Product from '../../../../models/Product';
import CategoryService from '../../../../services/category.service';
import ProductService from '../../../../services/product.service'



class CreateProduct extends React.Component {
    constructor(props){
        super(props);
        this.image=React.createRef();
        this.state = {
            categories: [],
            submitting: false
        }
        
    }
    componentDidMount(){
        CategoryService
        .getAll()
        .then(response => response.json())
        .then(categories => {
            this.setState({categories});
        });
    }
    send(values) {
        this.setState({submitting: true});
        ProductService.create(values)
            .then(() => {
                this.setState({submitting: false});
                this.props.history.push('/admin/products')
            });
    }

    render(){
        return (
            <Formik initialValues={{
                name: "",
                brand: "", 
                price: "",
                categoryId: "",
                image: ""
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
            <label>Brand:</label>
            <Field type="text" className="form-control" name="brand" />
            <ErrorMessage className="alert alert-success" name="brand" component="div" />
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
        <div className="form-group">
            <label>image:</label><br/>
            <input type="file" name="image" onChange={(event) =>{
                setFieldValue('image', event.currentTarget.files[0]);
            }}/>
            <ErrorMessage className="alert alert-success" name="image" component="div" />
        </div>

            <button type="submit" className="" disabled={this.state.submitting}>Create new product</button>

    </ Form >;
    }}>
    </ Formik>

        )
    }
}

export default CreateProduct;