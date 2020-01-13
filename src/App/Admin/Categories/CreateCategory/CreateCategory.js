import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Category from '../../../../models/Category';
import CategoryService from '../../../../services/category.service';



class CreateCategory extends React.Component {
    constructor(props){
        super(props);
        this.image=React.createRef();
        this.state = {
            submitting: false
        }
        
    }
    componentDidMount(){
    }
    send(values) {
        this.setState({submitting: true});
        CategoryService.create(values)
            .then(() => {
                this.setState({submitting: false});
                this.props.history.push('/admin/categories');
            });
    }

    render(){
        return (
            <div className="inner-admin">
            <Formik initialValues={{
                name: "",
                image: ""
            }}
            validationSchema={Category}
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
            <label>image:</label><br/>
            <input type="file" name="image" onChange={(event) =>{
                setFieldValue('image', event.currentTarget.files[0]);
            }}/>
            <ErrorMessage className="alert alert-success" name="image" component="div" />
        </div>

            <button type="submit" className="" disabled={this.state.submitting} value="Submit">Create new Category</button>

    </ Form >;
    }}>
    </ Formik>
    </div>
        )
    }
}

export default CreateCategory;