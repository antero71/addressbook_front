import React from 'react'
import ReactDOM from 'react-dom'

const contacts = [
  {
    id: 1,
    address: 'Kuusitie',
    email: 'olli6@gmail.com',
    phone: '+358445046433',
    name: 'Olli Kuutonen',
    saved: '2019-09-01T18:30:31.098Z',
  },
  {
    id: 2,
    address: 'Koivupolku',
    email: 'satu100@gmail.com',
    phone: '+358445266433',
    name: 'Satu Satanen',
    saved: '2019-09-01T18:33:31.098Z',
  },
  {
    id: 3,
    address: 'Kuusitie',
    email: 'taina55@gmail.com',
    phone: '+358445066233',
    name: 'Taina Jouksio',
    saved: '2019-09-01T18:20:31.098Z',
  }
]

const App = (props) => {
  const { contacts } = props

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        <li>{contacts[0].name}</li>
        <li>{contacts[1].name}</li>
        <li>{contacts[2].name}</li>
      </ul>
    </div>
  )
}

ReactDOM.render(
  <App contacts={contacts} />,
  document.getElementById('root')
)