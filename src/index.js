import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import { ItemProvider } from './Context';


ReactDOM.render(
  <BrowserRouter>
  <ItemProvider>
    <App />
    </ItemProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
