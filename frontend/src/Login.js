import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginContext from './LoginContext'
import Cookies from 'universal-cookie'

function Login() {
  const [redirect, setRedirect] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  const cookies = new Cookies()
  
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

  if (redirect) {
    return <Redirect push to="/"/>
  }

  return (
    <div>
      Username: admin<br/>
      Password: admin<br/>
    <button onClick={send}>Login</button>
    </div>
  )
}

export default Login
