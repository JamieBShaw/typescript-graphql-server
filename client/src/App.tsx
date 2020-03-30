import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Login from './routes/Login';
import Register from './routes/Register';

const App: React.FC = () => {
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
        </Router>
    );
};

export default App;
