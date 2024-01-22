import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './css/styles.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


createRoot.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

