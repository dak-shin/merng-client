import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import {AuthProvider} from './context/auth';
import AuthRoute from './util/authRoute';

//Components
import Navbar from './components/navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Register from "./pages/register";
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <AuthRoute exact path="/Login" component={Login}/>
          <AuthRoute exact path="/Register" component={Register}/>
          <Route exact path="/post/:postId" component={SinglePost}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
