import { render } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { WrappedApp } from './ApolloProvider';

render(WrappedApp, document.getElementById('root'));

serviceWorker.unregister();
