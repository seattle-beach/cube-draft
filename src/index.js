import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {UntapClient} from './untap/Client';
import axios from "axios"
import {ServiceDiscovery} from "./ServiceDiscovery"
import {BrowserRouter} from "react-router-dom";
import "./styles/all.css"

const serviceDiscovery = new ServiceDiscovery();
const untapClient = new UntapClient(serviceDiscovery.untapURI(), axios)
ReactDOM.render(
<BrowserRouter>
    <App
        untapClient={untapClient} 
    />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
