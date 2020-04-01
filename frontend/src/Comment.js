import React from 'react'

function Comment(props) {
  const [sending, isSending] = React.useState(false)

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
    <button disabled={sending} onClick={deleted}>Delete comment</button>
    <br/>
    </div>
  )
}

export default Comment
