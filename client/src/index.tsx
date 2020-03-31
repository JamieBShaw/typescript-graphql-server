import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { WrappedApp } from './ApolloProvider';

render(WrappedApp, document.getElementById('root'));

serviceWorker.unregister();
