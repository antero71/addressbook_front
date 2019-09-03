import React from "react"

const Contact = ({ contact }) => {
  return (
    <li>{contact.name}</li>,
    <li>{contact.phone}</li>
  )
}

export default Contact