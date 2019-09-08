import React, { useState, useEffect } from "react"
import Contact from "./components/Contact"
import Notification from "./components/Notification"
import Togglable from './components/Togglable'
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import ContactForm from "./components/ContactForm"
import contactService from "./services/contacts"
import loginService from "./services/login"

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setContacts(initialContacts))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedContactappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      contactService.setToken(user.token)
    }
  }, [])


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem(
      "loggedContactappUser", JSON.stringify(user)
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedContactappUser", JSON.stringify(user)
      )
      contactService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("Wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => contacts.map(contact => 
    <Contact
      key={contact.id}
      contact={contact}
    />
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" }
    const showWhenVisible = { display: loginVisible ? "" : "none" }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleNameChange = (event) => {
    console.log('name',event.target.value)
    setNewName(event.target.value)
  }

  const contactFormRef = React.createRef()

  const addContact = (event) => {
    event.preventDefault()

    contactFormRef.current.toggleVisibility()

    const contactObject = {
      name: newName,
      address: newAddress,
      email: newEmail,
      phone: newPhone,
      date: new Date().toISOString(),
    }

    console.log('contactObject', contactObject)

    contactService
      .create(contactObject)
      .then(data => {
        setContacts(contacts.concat(data))
        setNewName('')
        setNewPhone('')
        setNewAddress('')
        setNewEmail('')
      })
  }

  return (
    <div>
      <h1>Contacts</h1>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new contact" ref={contactFormRef}>
            <ContactForm
              onSubmit={addContact}
              name={newName}
              address={newAddress}
              email={newEmail}
              phone={newPhone}
              handleNameChange={handleNameChange}
              handleAddressChange={({ target }) => setNewAddress(target.value)}
              handleEmailChange={({ target }) => setNewEmail(target.value)}
              handlePhoneChange={({ target }) => setNewPhone(target.value)}
            />
          </Togglable>
        </div>
      }
      <ul>
        {rows()}
      </ul>

      <Footer />
    </div>
  )
}

export default App