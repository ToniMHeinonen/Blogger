import React from 'react'
import LoginContext from './LoginContext'
import { Redirect } from 'react-router-dom'

function Comment(props) {
  const [sending, isSending] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  const [redirectToModify, setRedirectToModify] = React.useState(false)

  function getDate(text, time) {
    const date = new Date(time)
    return <>{text}: {date.getDay()}.{date.getMonth()+1}.{date.getFullYear()} {(date.getHours() < 10 ? '0':'') + 
    date.getHours()}:{(date.getMinutes() < 10 ? '0':'') + date.getMinutes()}</>
  }

    // If Edit-button is clicked, setRedirectToModify to true.
    const edited = (event) => {
      setRedirectToModify(true)
    }

  // Delete clicked comment.
  const deleted = async (event) => {
    isSending(true)
    await fetch('/comments/' + props.id, {
      method: 'DELETE',
    })
    window.location.reload()
  }

    // Redirect to /modifyComment, if Edit-button is clicked.
    if (redirectToModify) {
      return <Redirect to={{
        pathname: '/modifyComment',
        state: { id: props.id, author: props.author, text: props.text }
      }}/>
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
    <h5>Author: {props.author}<br/>
    {getDate('Created', props.creationDate)}<br/>
    {props.lastModified === null ? null : <> {getDate('Last modified', props.lastModified)}</>}
    <br/>Likes: {props.likes}</h5>
    <p>{props.text}</p>
    <button disabled={sending} onClick={liked}>Like</button>
    {!loggedIn ? null : <button disabled={sending} onClick={edited}>Edit comment</button>}
    {!loggedIn ? null : <button disabled={sending} onClick={deleted}>Delete comment</button>}
    <br/>
    </div>
  )
}

export default Comment
