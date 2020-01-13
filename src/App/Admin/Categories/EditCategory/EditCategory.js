import React from 'react';
import "./EditCategory.scss";
import CategoryService from '../../../../services/category.service';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Category from '../../../../models/Category';



class EditCategory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category:{},
            changeImage: false,
            submitting:false
        };
    }
    componentDidMount(){
        CategoryService
        .getById(this.props.match.params.categoryId)
        .then(res => res.json())
        .then(category => this.setState({category}));        
    }

    toggleShow() {
        this.setState({ changeImage: !this.state.changeImage });
      }

    send(values){
        this.setState({submitting: true});
        values.changeImage = this.state.changeImage;
        CategoryService
        .update(values, this.props.match.params.categoryId)
        .then( () => {
            this.setState({submitting: false});
            this.props.history.push('/admin/categories');
        });
    }


    render(){
        return (
            <div className="inner-admin">
            <Formik initialValues={{
                name: this.state.category.name,
                image: this.state.category.image
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
        <button type="submit" className="btn btn-primary" disabled={this.state.submitting}>Update Category</button>

    </ Form >;
    }}>
    </ Formik>
    </div>
        )
    }
}

export default EditCategory;