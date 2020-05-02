import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginContext from './LoginContext'
import Cookies from 'universal-cookie'
import './css/login.css'

/**
 * Login-function.
 */
function Login() {
  const [redirect, setRedirect] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  const cookies = new Cookies()
  
  /**
   * If successful login, set contextvalues and cookies to true.
   * @param {*} event 
   */
  const send = async (event) => {
    event.preventDefault()
    const conf = {
      method: 'POST',
    }
    const hr = await fetch('/login', conf)
    if (hr.ok === true) {
      changeLogin(true)
      cookies.set('authCookie', true, { path: '/' })
      setRedirect(true)
    }
  }

  // Redirect back to frontpage after successful login.
  if (redirect) {
    return <Redirect push to="/"/>
  }

  return (
    <div className="login">
      Click to login.<br/>
    <button className="loginbutton" onClick={send}>Login</button>
    </div>
  )
}

export default Login
