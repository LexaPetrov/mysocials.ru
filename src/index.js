import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import './css/index.css'
import './css/Logo.css'
import './css/Modal.css'
import './css/News.css'
import './css/loader.css'
import './css/input.css'
import './css/media.css'
// import './css/dark.css'

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <App />
  </Router>,
  document.getElementById('root')
);

