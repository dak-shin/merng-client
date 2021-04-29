import React,{useContext, useState, useRef} from 'react'
import {gql, useQuery, useMutation} from '@apollo/client';
import { Dimmer, Loader, Image, Segment, Grid, Card, Button, Label, Icon, Form } from 'semantic-ui-react'
import moment from 'moment';
import Linkify from 'react-linkify';

import {AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {

    const postId = props.match.params.postId;
    const commentInputRef = useRef(null);

        const {loading, data} = useQuery(FETCH_POST_QUERY,{
        variables:{
            postId
        }
    })
    let postMarkup;
    const deletePostCB = () => {
        props.history.push('/');
    }

    const [comment, setComment] = useState('');

    const [postComment] = useMutation(POST_COMMENT_MUTATION, {
        update(){
            setComment("");
            commentInputRef.current.blur();
        },variables:{
            postId,
            body: comment
        }

    });

    const {user } = useContext(AuthContext);

    if(!data){
        postMarkup = <Segment>
            <Dimmer active inverted>
                <Loader inverted content='Loading' />
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
    }else{
        const {id, username, body, likes, comments, likesCount, commentsCount, timeAt} = data.getPost

        postMarkup = (<Grid>
            <Grid.Row fluid style={{marginTop: "2rem"}}>
                <Grid.Column width={2}>
                <Image
                    floated='right'
                    size='small'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    />
                </Grid.Column>
                <Grid.Column width={13}>

                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta >{moment(timeAt).fromNow()}</Card.Meta>
                            <Linkify>
                            <Card.Description>{body}</Card.Description>
                            </Linkify>

                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{id,likes,likesCount}}/>

                            <Button   labelPosition='right' as="div" onClick={() => console.log('Comment')}>
                                <Button color='black' basic>
                                    <Icon name='comment' />
                                </Button>
                                <Label as='a' basic color='black' pointing='left'>
                                    {commentsCount}

                                </Label>
                            </Button>
                            {user && user.username === username && <DeleteButton postId={postId} callBack={deletePostCB}/>}
                        </Card.Content>
                    </Card>
                    {
                        user && (
                            <Card fluid>
                                <Card.Content>
                                <p>Post a comment </p>
                                <Form>
                                    <Form.Field>
                                        <label>First Name</label>
                                        <input 
                                        autoFocus
                                        placeholder='Comment...' 
                                        name="comment"
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                        ref={commentInputRef}
                                        />
                                    </Form.Field>
                                    <Button type="submit"disabled={comment.trim() === ""} 
                                    onClick={postComment} floated="right" secondary>Submit</Button>
                                </Form>
                                </Card.Content>
                            </Card>
                        )
                    }
                    {comments.map(comment => (
                        <Card fluid key={comment.id}>
                            <Card.Content>
                                {
                                    user && user.username === comment.username && 
                                    <DeleteButton postId={postId} commentId={comment.id}/>
                                }
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.timeAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}

                </Grid.Column>
            </Grid.Row>
        </Grid>)
        
    }

    return postMarkup;
}

const POST_COMMENT_MUTATION = gql`
    mutation(
        $postId: ID!
        $body: String!
    ){
        createComment(
            postId: $postId
            body: $body
        ){

            id
            comments{
                id body timeAt username
            }
            commentsCount

        }
    }
`;

const FETCH_POST_QUERY = gql`

    query(
        $postId: ID!
    ){
        getPost(postId: $postId){
            id
            body
            timeAt
            username
            likes{
                username
            }
            comments{
                id
                username
                body
                timeAt
            }
            commentsCount
            likesCount
        }
    }
`;

export default SinglePost
