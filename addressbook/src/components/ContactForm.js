import React from 'react'

const ContactForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2>Create a new contact</h2>

      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default ContactForm