import React, {useState, useEffect} from 'react';
import { Button, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {useMutation, gql} from '@apollo/client'; 

function LikeButton({user,post:{id, likes, likesCount}}) {
    

    const [liked, setLiked] = useState(false);
    
    useEffect(() => {


        if(user && likes.find(like => like.username === user.username)){
            setLiked(true);
        }else 
        setLiked(false);

    },[user,likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId : id}
    });

    const Btn = user ? (
        liked ? (
            <Button color='black' >
                <Icon name='heart' />   
            </Button>
        ): (
            <Button color='black' basic >
                <Icon name='heart' />   
            </Button>
        )
    ): (
            <Button color='black' basic as={Link} to='/login'>
                <Icon name='heart' />   
            </Button>
            )

    return (
        <Button as='div'  labelPosition='right' onClick={likePost}>
            {Btn}
            <Label as='a' basic color='black' pointing='left'>
                {likesCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost(
        $postId: ID!
    ){
        likePost(
            postId: $postId
        ){
            id
            likes{
                id
                username
            }
            likesCount
        }
    }

`;

export default LikeButton
