import {gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
    {
         getPosts{
             id
             body
             timeAt
             username
             likesCount
             commentsCount
             likes{
                 username
             }
             comments{
                 id
                 username
                 body
                 timeAt
             }
         }
    }
`;

