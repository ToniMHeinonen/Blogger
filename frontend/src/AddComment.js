import React from 'react'
import { Redirect } from 'react-router-dom'

function AddComment(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)

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
    await fetch(`/comments/ + ${props.location.state.id}`, conf)
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect push to="/"/>
  }

  return (
    <form onSubmit={send}>
      <label>
        Author:
        <br/>
        <input id="author" name="author" type="text"/>
      </label>
      <br/><br/>
      Comment:
      <br/>
      <textarea id="comment" name="comment" type="text"/>
      <br/><br/>
      <button disabled={sending}>Send</button>
    </form>
  )
}

export default AddComment
