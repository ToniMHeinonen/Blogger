import React from 'react'
import { Redirect } from 'react-router-dom'

/**
 * Add comment.
 * @param {*} props - properties(blog's id) received from Post.js. 
 */
function AddComment(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)

  /**
   * Called, when user have pressed send-button. Get data from form and post it.
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
      await fetch(`/comments/${props.location.state.id}`, conf)
      setRedirect(true)
    }
  }

  // Redirect to frontpage, when post is complete.
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
