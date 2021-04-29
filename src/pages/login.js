import React,{useContext, useState} from 'react'
import {Form, Button} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

import {AuthContext } from '../context/auth';

import {useForm} from '../util/hooks'

function Login(props) {
    const [errors,setErrors] = useState({})
    const context = useContext(AuthContext);

    const {onChange, onSubmit, values} = useForm(login_User, {
        username:"",
        password:""
    })

    const [loginUser , {loading}] = useMutation(LOGIN_USER_MUTATION,{
        update(proxy, {data:{login:userData}}){
            context.login(userData);
            // console.log(userData);
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
        ,variables:values
    })

    function login_User(){
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <div className="page-title">
                    <h1>Register</h1>
                </div>

                <Form.Input 
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    error={errors.username? true: false}
                    value ={values.username}
                    onChange={onChange}
                />

                <Form.Input 
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    error={errors.password? true: false}
                    value ={values.password}
                    onChange={onChange}
                />

                <Button secondary type="Submit"> Submit </Button>

            </Form>
            {Object.keys(errors).length > 0 && 
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>

                </div>
            }
        </div>
    )
}


const LOGIN_USER_MUTATION = gql`

    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        )
        {
            id
            email
            username
            token
        }
    }

`;

export default Login;
