import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';
import ApolloProvider from './apolloProvider';
// import { ApolloProvider } from '@apollo/client/react';

render(
  ApolloProvider,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
