import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client';
import {Button,Confirm, Icon, Popup} from 'semantic-ui-react';

function DeleteButton({postId, callBack, commentId}) {

    const [openConfirm, setOpenConfirm] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletPostorComment] = useMutation(mutation, {
        update(_,result){
            setOpenConfirm(false);
            if(callBack) callBack();
            window.location.reload(false); 
        },onError(error){
            // console.log(error.networkError.result.errors);
        }
        ,variables:{
            postId,
            commentId
        }
    })



    return (
        <>
            <Popup
            content={commentId ? "Delete Comment": "Delete Post"}
            trigger={
                
                <Button as="div" color="red" floated="right" onClick={() => {setOpenConfirm(true)}}>
                <Icon name="trash" style={{ margin: 0}}/>
                </Button>
                
            }
            />
            <Confirm
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={deletPostorComment}
                cancelButton='Cancel'
                confirmButton="Yes I'm sure"
                content="Are you sure you want to delete this post ?"
                />
        </>
    )
}

const DELETE_POST_MUTATION = gql`

    mutation deletePost(
        $postId : ID!
    ){
        deletePost(
            postId: $postId
        )
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment(
        $postId : ID!
        $commentId : ID!
    ){
        deleteComment(
            postId: $postId
         commentId: $commentId
        )
        {
            id
            body
            comments{
            body
            username
            timeAt
            }
            username
            timeAt
    }
        
    }
`;

export default DeleteButton
