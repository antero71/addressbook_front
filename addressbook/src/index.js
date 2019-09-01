import React from 'react'
import ReactDOM from 'react-dom'
import contacts from './components/Contacts'

const App = (props) => {
  const { contacts } = props

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        <li>{contacts[0].name}, {contacts[0].email}</li>
        <li>{contacts[1].name}, {contacts[1].email}</li>
        <li>{contacts[2].name}, {contacts[2].email}</li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <App contacts={contacts} />,
  document.getElementById('root')
)