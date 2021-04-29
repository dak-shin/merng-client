import React,{useContext,useState} from 'react'
import {Form, Button} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

import {AuthContext } from '../context/auth';
import {useForm} from '../util/hooks'


function Register(props) {
    const [errors,setErrors] = useState({})
    const context = useContext(AuthContext);

    const {onChange, onSubmit, values} = useForm(resgisteruser, {
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER_MUTATION,{
        update(proxy, {data:{register:userData}}){
            context.login(userData);
            // console.log(userData);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
        ,variables:values
    })

    function resgisteruser(){
        addUser();
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
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    error={errors.email? true: false}
                    type="email"
                    value ={values.email}
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

                <Form.Input 
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword? true: false}
                    value ={values.confirmPassword}
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


const REGISTER_USER_MUTATION = gql`

    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        )
        {
            id
            email
            username
            token
        }
    }

`;

export default Register
