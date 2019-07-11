import React from 'react'
import axios from '../../config/axios-config'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Too Short!')
        .required("username can't be blank"),
    email: Yup.string()
        .email('Invaild email..!!')
        .required("email can't be blank"),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(12, 'Too long..!')
        .required('password required')
})

class Register extends React.Component {

    handleSubmit = (values) => {
        axios.post(`/users/register`, values)
            .then(response => {
                console.log(response.data)
                if (response.data.errors) {
                    alert(response.data.errors)
                } else {
                    this.props.history.push('/users/login')
                }
            })
    }


    render() {
        return (
                
            <div class="form-group" class="p-3 mb-2 bg-secondary text-white" >
                <span class="border border-dark">
                <h1>Register Form</h1>
                <div className="row" >
                  
                    <br/>
                <Formik 
                    initialValues={{
                        username: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={this.handleSubmit}>
                    {({ errors, touched }) => (
                            <div className="form-group"  class="info-form">
                                <Form >
                            <label>
                                <Field type="text" placeholder="Username.."
                                        name="username" className="form-control" />
                                {errors.username && touched.username ? (
                                    <div>{errors.username}</div>
                                ) : null}
                            </label> <br /><br />
                            <label>
                                        <Field type="email" placeholder="abc...@gmail.com" name="email" className="form-control"/>
                                {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                            </label> <br /><br />
                            <label>
                                        <Field type="password" placeholder="password" name="password" className="form-control" />
                                {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                            </label><br /><br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </Form>
                        </div>
                    )}
                </Formik >
            </div>
                </span>
            </div>
        )
    }
}

export default Register