import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

function AddPost() {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const cookies = new Cookies()

  // Called, when user have pressed send-button. Get data from form and post to backend.
  const send = async (event) => {
    isSending(true)
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { author: data.get('author'), topic: data.get('topic'), text: data.get('blogi') }
    const conf = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newPost)
    }
    await fetch('/blogposts/', conf)
    setRedirect(true)
  }

  // Redirect to frontpage, when post is complete.
  if (redirect) {
    return <Redirect push to="/"/>
  }

  if (cookies.get('authCookie') === 'true') {
    return (
      <form onSubmit={send}>
        <label>
          Topic:
          <br/>
          <input id="topic" name="topic" type="text"/>
        </label>
        <br/><br/>
        <label>
          Author:
          <br/>
          <input id="author" name="author" type="text"/>
        </label>
        <br/><br/>
        Your story:
        <br/>
        <textarea id="blogi" name="blogi" type="text"/>
        <br/><br/>
        <button disabled={sending}>Send</button>
      </form>
    )
  }

  return (
    <div>
      You are not allowed to add posts.
    </div>
  )
}

export default AddPost
