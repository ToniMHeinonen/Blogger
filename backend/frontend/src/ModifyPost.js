import React from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'
import './css/addpost.css'

/**
 * Modify blogpost.
 * @param {*} props - properties received from Post (id, author, topic, text) 
 */
function ModifyPost(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const cookies = new Cookies()

  /**
   * Post modified blogpost.
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
      await fetch(`/blogposts/${props.location.state.id}`, conf)
      setRedirect(true)
    }
  }

  // Go back to homepage, after posting blogpost.
  if (redirect) {
    return <Redirect push to="/"/>
  }

  // If user is admin, show form.
  if (cookies.get('authCookie') === 'true') {
    return (
      <form className="wholeform" onSubmit={send}>
        <label className="topictext">
          Topic:
          <br/>
          <input className="topicinput" id="topic" name="topic" type="text" defaultValue={props.location.state.topic}/>
        </label>
        <br/><br/>
        <label className="authortext">
          Author:
          <br/>
          <input className="authorinput" id="author" name="author" type="text" defaultValue={props.location.state.author}/>
        </label>
        <br/><br/>
        <label className="textbeforetextarea">
        Your story:
        <br/>
        <textarea className="textarea" id="blogi" name="blogi" type="text" defaultValue={props.location.state.text}/>
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

export default ModifyPost
