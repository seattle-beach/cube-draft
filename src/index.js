import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {UntapClient} from './untap/Client';
import axios from "axios"

const untapClient = new UntapClient("http://localhost:8080", axios)
ReactDOM.render(<App
    untapClient={untapClient} 
/>, document.getElementById('root'));
registerServiceWorker();
