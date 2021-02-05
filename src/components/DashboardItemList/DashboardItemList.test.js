import React from 'react'
import ReactDOM from 'react-dom'
import DashboardItemList from './DashboardItemList'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DashboardItemList/>, div)
  ReactDOM.unmountComponentAtNode(div)
})