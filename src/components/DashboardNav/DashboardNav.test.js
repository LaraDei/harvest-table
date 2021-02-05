import React from 'react'
import ReactDOM from 'react-dom'
import DashboardNav from './DashboardNav'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><DashboardNav/></BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
})