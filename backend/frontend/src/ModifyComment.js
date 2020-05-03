import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import './css/addpost.css'

/**
 * Modify comment.
 * @param {*} props - properties received from Comment (id, author, text) 
 */
function ModifyComment(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const cookies = new Cookies()

  /**
   * Post modified comment.
   * @param {*} event - event from form
   */
  const send = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { author: data.get('author'), text: data.get('comment') }
    if (newPost.author.length > 0 && newPost.text.length > 0) {
      isSending(true)
      const conf = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newPost)
      }
      await fetch(`/comments/modify/${props.location.state.id}`, conf)
      setRedirect(true)
    }
  }

  // Go back to homepage, after posting comment.
  if (redirect) {
    return <Redirect push to="/"/>
  }

  // If user is admin, show form.
  if (cookies.get('authCookie') === 'true') {
    return (
      <form className="wholeform" onSubmit={send}>
        <label className="authortext">
          Author:
          <br/>
          <input className="authorinput" id="author" name="author" type="text" defaultValue={props.location.state.author}/>
        </label>
        <br/><br/>
        <label className="textbeforetextarea">
        Text:
        <br/>
        <textarea className="textarea" id="comment" name="comment" type="text" defaultValue={props.location.state.text}/>
        </label>
        <br/><br/>
        <button className="sendbutton" disabled={sending}>Send</button>
      </form>
    )
  }

  // If user isn't admin, show error-message.
  return (
    <div>
      You are not allowed to edit posts.
    </div>
  )
}

export default ModifyComment
