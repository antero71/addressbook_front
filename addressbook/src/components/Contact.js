import React from "react"

const Contact = ({ contact }) => {
  return (
    <dl>
    <dt>{contact.name}</dt>
    <dd>{contact.address}</dd>
    <dd>{contact.email}</dd>
    <dd>{contact.phone}</dd>
    </dl>
  )
}

export default Contact