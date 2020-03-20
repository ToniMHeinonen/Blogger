import React from 'react';
import { Redirect } from 'react-router-dom';

function ModifyPost(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)

  const send = async (event) => {
    isSending(true)
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { topic: data.get('topic'), text: data.get('blogi') }
    const conf = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newPost)
    }
    await fetch(`/blogposts/ + ${props.location.state.id}`, conf)
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect push to="/"/>
  }

  return (
    <form onSubmit={send}>
      <label>
        Topic:
        <br/>
        <input
          id="topic"
          name="topic"
          type="text"
          defaultValue={props.location.state.topic}/>
      </label>
      <br/><br/>
      Your story:
      <br/>
      <textarea
        id="blogi"
        name="blogi"
        type="text"
        defaultValue={props.location.state.text}/>
        <br/><br/>
      <button disabled={sending}>Send</button>
    </form>
  )
}

export default ModifyPost
