import React from 'react'
import LoginContext from './LoginContext'

function Comment(props) {
  const [sending, isSending] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  const date = new Date(props.creationDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()

  // Delete clicked comment.
  const deleted = async (event) => {
    isSending(true)
    await fetch('/comments/' + props.id, {
      method: 'DELETE',
    })
    window.location.reload()
  }

  // Like clicked comment.
  const liked = async (event) => {
    isSending(true)
    await fetch('/comments/like/' + props.id, {
      method: 'POST',
    })
    window.location.reload()
  }

  return (
    <div>
    <h5>Author: {props.author} <br/>
    Created: {day}.{month+1}.{year} {(hour < 10 ? '0':'') + hour}:{(minute < 10 ? '0':'') + minute}
    <br/>Likes: {props.likes}</h5>
    <p>{props.text}</p>
    <button disabled={sending} onClick={liked}>Like</button>
    {!loggedIn ? null : <button disabled={sending} onClick={deleted}>Delete comment</button>}
    <br/>
    </div>
  )
}

export default Comment
