import React from "react"

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Contacts app, Antero Oikkonen, Helsinki 2019</em>
    </div>
  )
}

export default Footer

