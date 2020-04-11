import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

function ModifyComment(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const cookies = new Cookies()

  // Post modified blogpost.
  const send = async (event) => {
    isSending(true)
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { author: data.get('author'), text: data.get('comment') }
    const conf = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newPost)
    }
    await fetch(`/comments/modify/${props.location.state.id}`, conf)
    setRedirect(true)
  }

  // Go back to homepage, after posting blogpost.
  if (redirect) {
    return <Redirect push to="/"/>
  }

  if (cookies.get('authCookie') === 'true') {
    return (
      <form onSubmit={send}>
        <label>
          Author:
          <br/>
          <input id="author" name="author" type="text" defaultValue={props.location.state.author}/>
        </label>
        <br/><br/>
        Text:
        <br/>
        <textarea id="comment" name="comment" type="text" defaultValue={props.location.state.text}/>
        <br/><br/>
        <button disabled={sending}>Send</button>
      </form>
    )
  }

  return (
    <div>
      You are not allowed to edit posts.
    </div>
  )
}

export default ModifyComment
