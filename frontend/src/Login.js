import React from 'react'
import { Redirect } from 'react-router-dom'

function Login() {
  const [redirect, setRedirect] = React.useState(false)
  
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
