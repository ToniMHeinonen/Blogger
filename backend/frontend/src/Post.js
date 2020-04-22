import React from 'react'
import { Redirect } from 'react-router-dom'
import AllComments from './AllComments'
import LoginContext from './LoginContext'

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

  /**
   * Get date in a valid format.
   * @param {*} text - text before date
   * @param {*} time - value to transform to valid format
   */
  function getDate(text, time) {
    const date = new Date(time)
    return <>{text}: {date.getDate()}.{date.getMonth()+1}.{date.getFullYear()} {(date.getHours() < 10 ? '0':'') + 
    date.getHours()}:{(date.getMinutes() < 10 ? '0':'') + date.getMinutes()}</>
  }

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
    setHideLongText(!hideLongText)
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

    if (props.text.length > 200) {
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
    <div>
    <h1>{props.topic}</h1>
    <h5>Author: {props.author}<br/>
    {getDate('Created', props.creationDate)}<br/>
    {props.lastModified === null ? null : <> {getDate('Last modified', props.lastModified)}</>}
    </h5>
    {hideLongText ? <p style={{whiteSpace: "pre-wrap"}}>{props.text.substring(0, 800) + '...'}<br/>
    <button onClick={showMoreClicked}>Show more</button></p> :
    <p style={{whiteSpace: "pre-wrap"}}>{props.text} 
    {props.text.length > 800 ? <button onClick={showMoreClicked}>Show less</button> : null}</p>}
    {!loggedIn ? null : <button disabled={sending} onClick={edited}>Edit</button>}
    {!loggedIn ? null : <button disabled={sending} onClick={deleted}>Delete</button>}
    <br/><br/>
    <h4>Comments</h4>
    <button disabled={sending} onClick={addcomment}>Add comment</button>
    {isLoading ? 'Loading...' : <AllComments allComments={comments} amount={comments.length}/>}
    </div>
    )
}

export default Post
