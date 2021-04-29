import React from 'react';
import App from './App';

import {URI} from './data';
import {  ApolloClient, createHttpLink ,InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri:URI
})

const AuthLink = setContext(() => {

    const token = localStorage.getItem('jwtToken');
    return {
        headers:{
            Authorization: token ? `Bearer ${token}`: ''
        }
    }

})

const client = new ApolloClient({
    link: AuthLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools:true
});


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

