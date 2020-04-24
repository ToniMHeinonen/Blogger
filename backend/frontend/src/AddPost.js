import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import './css/addpost.css'

/**
 * Add new blogpost.
 */
function AddPost() {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const cookies = new Cookies()

  /**
   * Called, when use have pressed send-button. Get data from form and post it.
   * @param {*} event - event from form
   */
  const send = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { author: data.get('author'), topic: data.get('topic'), text: data.get('blogi') }
    if (newPost.author.length > 0 && newPost.topic.length > 0 && newPost.text.length > 0) {
      isSending(true)
      const conf = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newPost)
      }
      await fetch('/blogposts/', conf)
      setRedirect(true)
    }
  }

  // Redirect to frontpage, when post is complete.
  if (redirect) {
    return <Redirect push to="/"/>
  }

  // If user is admin, show form.
  if (cookies.get('authCookie') === 'true') {
    return (
      <form onSubmit={send}>
        <label className="topictext">
          Topic:
          <br/>
          <input className="topicinput" id="topic" name="topic" type="text"/>
        </label>
        <br/><br/>
        <label className="authortext">
          Author:
          <br/>
          <input className="authorinput" id="author" name="author" type="text"/>
        </label>
        <br/><br/>
        <label className="textbeforetextarea">
        Your story:
        <br/>
        <textarea className="textarea" id="blogi" name="blogi" type="text"/>
        </label>
        <br/><br/>
        <button className="sendbutton" disabled={sending}>Send</button>
      </form>
    )
  }

  // If user isn't admin, show error-message.
  return (
    <div>
      You are not allowed to add posts.
    </div>
  )
}

export default AddPost
