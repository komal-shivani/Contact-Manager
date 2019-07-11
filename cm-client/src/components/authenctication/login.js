import React from 'react'
import axios from '../../config/axios-config'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Field Required'),
    password: Yup.string()
        .min(6, 'Too short!')
        .max(12, 'Too long!')
        .required('Field Required'),

});

class Login extends React.Component {
    handleSubmit = (formData) => {
        axios.post('/users/login', formData)
            .then(response => {
                console.log(response.data)
                if (response.data.errors) {
                    alert(response.data.errors)
                } else {
                    const token = response.data.token
                    localStorage.setItem('userAuthToken', token)
                    this.props.history.push('/users/account')
                }
            })
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={this.handleSubmit}>
                    {({ errors, touched }) => (
                        <Form>
                            <label>
                                Email
                            <Field type="text" placeholder="Enter your Email" name="email" />
                                {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
                            </label><br /><br />

                            <label>
                                Password
                            <Field type="password" name="password" placeholder="*********" />
                                {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
                            </label><br /><br />
                            <button type="submit">submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default Login
