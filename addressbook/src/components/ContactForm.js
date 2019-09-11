import React from 'react'

const ContactForm = ({ onSubmit, 
  handleNameChange, 
  handleAddressChange,
  handleEmailChange,
  handlePhoneChange,
  name, address, email, phone }) => {
  return (
    <div>
      <h2>Create a new contact</h2>

      <form onSubmit={onSubmit}>
      <div>
        Name
        <input
          name={name}
          onChange={handleNameChange}
        />
        </div>
        <div>
          Address
        
        <input
          address={address}
          onChange={handleAddressChange}
        />
        </div>
        <div>
          Email
        <input
          email={email}
          onChange={handleEmailChange}
        />
        </div>
        <div>
          Phone
          <input
            phone={phone}
          onChange={handlePhoneChange}
        />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  
  )
  console.log(name,address)
}

export default ContactForm