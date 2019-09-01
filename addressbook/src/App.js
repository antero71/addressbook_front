import React from 'react'
import Contact from './components/Contact'

const App = ({ contacts }) => {
  const rows = () => contacts.map(contact =>
    <Contact
      key={contact.id}
      contact={contact}
    />
  )

  return (
    <div>
      <h1>Constacts</h1>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App