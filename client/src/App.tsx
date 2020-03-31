import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Login from './routes/Login';
import Register from './routes/Register';
import Container from 'react-bootstrap/Container';

const App: React.FC = () => {
    return (
        <Router>
            <Container fluid="lg">
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
            </Container>
        </Router>
    );
};

export default App;
