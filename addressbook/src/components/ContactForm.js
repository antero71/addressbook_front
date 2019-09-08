import React from 'react'

const ContactForm = ({ onSubmit, handleChange, name, address, email, phone }) => {
  return (
    <div>
      <h2>Create a new contact</h2>

      <form onSubmit={onSubmit}>
        <input
          name={name}
          address={address}
          email={email}
          phone={phone}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  
  )
  console.log(name,address)
}

export default ContactForm