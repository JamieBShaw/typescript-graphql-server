import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './routes/home/Home';
import Login from './routes/login/Login';
import Register from './routes/register/Register';

import NavBar from './components/NavBar/NavBar';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Router>
    );
};

export default App;
