import React,{useContext} from 'react'
import {Card, Icon, Label, Image, Button, Popup} from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Linkify from 'react-linkify';

import LikeButton from './LikeButton';
import {AuthContext } from '../context/auth';
import DeleteButton from './DeleteButton';

const PostCard = (props)=> {


    const { id,
            body,
            timeAt,
            username,
            likesCount,
            commentsCount,
            likes,
            comments} = props.props;

    const {user} = useContext(AuthContext);

    return (
    //Options number 1 

    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>

        <Card.Meta >{moment(timeAt).fromNow()}</Card.Meta>
        <Linkify>
        <Card.Description>{body}</Card.Description>
        </Linkify>

      </Card.Content>
      <Card.Content extra>

          <LikeButton  user={user} post={{id,likes,likesCount}}/> 
        
        <Popup
        content={`Comment on post by ${username}`}
        inverted
        trigger={
          <Button   labelPosition='right' as={Link} to={`/post/${id}`} >
            <Button color='black' basic>
                <Icon name='comment' />
                
            </Button>
            <Label as='a' basic color='black' pointing='left'>
                {commentsCount}

            </Label>
        </Button>
        }
        />


        {  
            user && user.username === username && (
                <DeleteButton postId={id} />
            )
        }
      </Card.Content>
    </Card>

    //Option number 2 

    // <Card>
    // <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
    //     <Card.Content>
    //   <Card.Header>{username}</Card.Header>
    //   <Card.Meta>
    //     <span className='date'>{moment(timeAt).fromNow()}</span>
    //   </Card.Meta>
    //   <Card.Description>
    //       {body}
    //   </Card.Description>
    // </Card.Content>
    // <Card.Content extra>
    //   Buttons here
    // </Card.Content>
    // </Card>

    )
}

export default PostCard
