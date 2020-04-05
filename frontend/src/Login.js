import React from 'react'
import { Redirect } from 'react-router-dom'
import LoginContext from './LoginContext'

function Login() {
  const [redirect, setRedirect] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  console.log(loggedIn)
  
  const send = async (event) => {
    event.preventDefault()
    const conf = {
      method: 'POST',
    }
    const hr = await fetch('/login', conf)
    if (hr.ok === true) {
      setRedirect(true)
    }
  }

  const test = () => {
    changeLogin(!loggedIn)
  }

  if (redirect) {
    return <Redirect push to="/"/>
  }

  return (
    <div>
      Username: admin<br/>
      Password: admin<br/>
    <button onClick={send}>Login</button>
    <button onClick={test}>Test</button>
    </div>
  )
}

export default Login
