import React, { useState, useEffect } from 'react'
import PT from 'prop-types'

import { useNavigate } from "react-router-dom"

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // const [disabled, setDisabled] = useState(true)
  // ✨ where are my props? Destructure them here
  
  const  navigate  = useNavigate();
  const { setMessage, message, login } = props
  
  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
    
    
  }
  
  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    login(values)
    
  }
  
  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    if(values.username.trim().length >= 3 && values.password.trim().length >= 8) {
      return false 
     
    } else {
      return true
    }
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
      
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
