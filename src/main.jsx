import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'

import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div>
        <App />
      </div>
    </Router>
  </React.StrictMode>,
)
