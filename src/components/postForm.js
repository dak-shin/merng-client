import React from 'react'
import {Button, Form } from 'semantic-ui-react';

import {gql, useMutation} from '@apollo/client';
import {useForm} from '../util/hooks';

// import {FETCH_POSTS_QUERY} from '../util/grapql';

function PostForm(){

    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body:""
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables:values,
        update(proxy,result){
            console.log(result);
            // const data = proxy.readQuery({
            //     query : FETCH_POSTS_QUERY
            // })
            // data.getPosts = [result.data.createPost, ...data.getPosts ];
            // proxy.writeQuery({ query : FETCH_POSTS_QUERY, data});
            window.location.reload(false);
            values.body ="";
        },
        onError(err){
        }
    });

    function createPostCallback(){
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post : </h2>
                <Form.Field>
                    <Form.TextArea
                        placeholder='Hardcore Parkour!!!'
                        name='body'
                        onChange={onChange}
                        error={error? true : false}
                        value={values.body}
                        />
                    <Button type="submit" color="black">Post</Button>
                </Form.Field>
            </Form>
            {
                error  && (
                    <div className="ui error message" style={{ marginTop: 10, marginBottom: 20}}>
                        <ul className="list">
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>
                    </div>
                )
            }
            
        </>
    );

}

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
    ){
        createPost(
            body: $body
        ){
            id
            timeAt
            body
            username
            likesCount
            likes{
                id username 
                timeAt
            }
            commentsCount
            comments{
                id username
                timeAt
            }

        }
    }
    `;

export default PostForm;


