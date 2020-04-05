import React from 'react'
import LoginContext from './LoginContext'

function Comment(props) {
  const [sending, isSending] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)

  // Delete clicked comment.
  const deleted = async (event) => {
    isSending(true)
    await fetch('/comments/' + props.id, {
      method: 'DELETE',
    })
    window.location.reload()
  }

  return (
    <div>
    <h5>Author: {props.author} <br/>Created: {props.creationDate}
    <br/>Likes: {props.likes}</h5>
    <p>{props.text}</p>
    {!loggedIn ? null : <button disabled={sending} onClick={deleted}>Delete comment</button>}
    <br/>
    </div>
  )
}

export default Comment
