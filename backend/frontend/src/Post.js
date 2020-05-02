import React from 'react'
import { Redirect } from 'react-router-dom'
import AllComments from './AllComments'
import LoginContext from './LoginContext'
import GetProperDate from './util/GetProperDate'
import './css/post.css'

/**
 * Post-function. Contains data in blogpost.
 * @param {*} props - properties (id, author, topic, text, creationDate, lastModified)
 */
function Post(props) {
  const [redirectToModify, setRedirectToModify] = React.useState(false)
  const [redirectToAddComment, setRedirectToAddComment] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)
  const {loggedIn, changeLogin} = React.useContext(LoginContext)
  const [hideLongText, setHideLongText] = React.useState(false)
  const [showComments, setShowComments] = React.useState(false)
  const ref = React.createRef()
  let previewPostLimit = 800

  /**
   * Delete clicked post.
   * @param {*} event - event from form.
   */
  const deleted = async (event) => {
    isSending(true)
    await fetch('/blogposts/' + props.id, {
      method: 'DELETE',
    })
    window.location.reload()
  }

  /**
   * If Edit-button is clicked, setRedirectToModify to true.
   * @param {*} event - event from form
   */
  const edited = (event) => {
    setRedirectToModify(true)
  }

  /**
   * If Add comment -button is clicked, set RedirectToAddComment to true.
   * @param {*} event - event from form.
   */
  const addcomment = (event) => {
    setRedirectToAddComment(true)
  }

  const showMoreClicked = (event) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    setHideLongText(!hideLongText)
  }

  const commentsClicked = (event) => {
    setShowComments(!showComments)
  }

  /**
   * Fetch comments from current blogpost.
   */
  async function fetchComments() {
    setIsLoading(true)
    const hr = await fetch(`/comments/${props.id}`)
    const json = await hr.json()
    return json
  }

  /**
   * Fetch comments, when mounted. Cancel fetch, if user moves away from the current page
   * in the middle of fetching.
   */
  React.useEffect(() => {
    let isCancelled = false

    if (props.text.length > previewPostLimit) {
      setHideLongText(true)
    }

    fetchComments()
      .then((result) => {
        if (!isCancelled) {
          setComments(result)
          setIsLoading(false)
        }
      })
      .catch(() => setErrorWhenFetching(true))

    return () => {
      isCancelled = true
    }

  }, [])

  // Redirect to /modifyPost, if Edit-button is clicked.
  if (redirectToModify) {
    return <Redirect to={{
      pathname: '/modifyPost',
      state: { id: props.id, author: props.author, topic: props.topic, text: props.text }
    }}/>
  }

  // Redirect to /addComment, if Add comment -button is clicked.
  if (redirectToAddComment) {
    return <Redirect to={{
      pathname: '/addComment',
      state: { id: props.id }
    }}/>
  }

  // Show error-message, if fetching comments failed.
  if (errorWhenFetching) {
    return <div>Error, when fetching comments. Try to reload the page.</div>
  }

  return (
    <div className="wholepost">
    <h1 className="topic" ref={ref}>{props.topic}</h1>
    <h5 className="bloginfo">Author: {props.author}<br/>
    Created: {GetProperDate(props.creationDate)}<br/>
    {props.lastModified === null ? null : <> Last modified: {GetProperDate(props.lastModified)}</>}
    </h5>
    {hideLongText ? <p className="blogtext">{props.text.substring(0, previewPostLimit) + '...'}<br/>
    <button className="showtextbutton" onClick={showMoreClicked}>Show more</button></p> :
    <p className="blogtext">{props.text}<br/>
    {props.text.length > previewPostLimit ? <button className="showtextbutton" onClick={showMoreClicked}>Show less</button> : null}</p>}
    {!loggedIn ? null : <button className="editbutton" disabled={sending} onClick={edited}>Edit</button>}
    {!loggedIn ? null : <button className="deletebutton" disabled={sending} onClick={deleted}>Delete</button>}
    <br/><br/>
    <h4 className="commentstext" onClick={commentsClicked}>
    {showComments ? <i className="arrowdown"></i> : <i className="arrowright"></i>} Comments ({comments.length})</h4>
    <button className="addcommentbutton" disabled={sending} onClick={addcomment}>Add comment</button>
    {isLoading ? 'Loading...' : 
    <div> {!showComments ? null : 
    <AllComments allComments={comments} amount={comments.length}/>}</div>}
    </div>
    )
}

export default Post
