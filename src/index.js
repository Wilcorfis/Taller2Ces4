import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import SetupForm from './SetupForm'


ReactDOM.render(
  <BrowserRouter>
    <SetupForm/>
  </BrowserRouter>,
  document.getElementById('root')
)
