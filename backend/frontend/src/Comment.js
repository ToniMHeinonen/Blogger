import React from 'react'
import LoginContext from './LoginContext'
import { Redirect } from 'react-router-dom'
import CheckComment from './util/CheckCommentLikes'
import GetProperDate from './util/GetProperDate'

/**
 * Comment-function. Contains data in comment.
 * @param {*} props - properties (id, author, text, creationDate, lastModified, likes)
 */
function Comment(props) {
  const [sending, isSending] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  const [redirectToModify, setRedirectToModify] = React.useState(false)
  const [commentLiked, setCommentLiked] = CheckComment('comment' + props.id)

  /**
   * If Edit-button is clicked, setRedirectToModify to true.
   * @param {*} event - event from form
   */
  const edited = (event) => {
    setRedirectToModify(true)
  }

  /**
   * Delete clicked comment.
   * @param {*} event - event from form
   */
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

  /**
   * Like clicked comment.
   * @param {*} event - event from form
   */
  const liked = async (event) => {
    isSending(true)
    await fetch('/comments/like/' + props.id, {
      method: 'POST',
    })
    setCommentLiked('true')
    window.location.reload()
  }

  return (
    <div>
    <h5>Author: {props.author}<br/>
    {GetProperDate('Created', props.creationDate)}<br/>
    {props.lastModified === null ? null : <>{GetProperDate('Last modified', props.lastModified)}<br/></>}
    Likes: {props.likes}</h5>
    <p style={{whiteSpace: "pre-wrap"}}>{props.text}</p>
    {commentLiked !== 'true' ? <button disabled={sending} onClick={liked}>Like</button> : null}
    {!loggedIn ? null : <button disabled={sending} onClick={edited}>Edit comment</button>}
    {!loggedIn ? null : <button disabled={sending} onClick={deleted}>Delete comment</button>}
    <br/>
    </div>
  )
}

// {commentLiked != null ? null : <button disabled={sending} onClick={liked}>Like</button>}

export default Comment
