import React from 'react'
import ReactDOM from 'react-dom'
import contacts from './components/Contacts'

import App from './App'

ReactDOM.render(
  <App contacts={contacts} />,
  document.getElementById('root')
)