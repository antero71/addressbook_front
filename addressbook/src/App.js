import React, { useState, useEffect } from "react"
import Contact from "./components/Contact"
import Notification from "./components/Notification"
import Togglable from './components/Togglable'
import Footer from "./components/Footer"
import LoginForm from "./components/LoginForm"
import ContactForm from "./components/ContactForm"
import contactService from "./services/contacts"
import loginService from "./services/login"

const App = () => {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState("")
  const [showAll, setShowAll] = useState(true)
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

  const contactsToShow = showAll
  ? contacts
  : contacts.filter(contact => contact.name)

  const rows = () => contactsToShow.map(contact =>
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

  const handleContactChange = (event) => {
    setNewContact(event.target.value)
  }

  const contactFormRef = React.createRef()

  const addContact = (event) => {
    event.preventDefault()


    const contactObject = {
      content: newContact,
    }

    contactService
      .create(contactObject)
      .then(data => {
        setContacts(contacts.concat(data))
        setNewContact("")
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
              value={newContact}
              handleChange={handleContactChange}
            />
          </Togglable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {rows()}
      </ul>

      <Footer />
    </div>
  )
}

export default App