import React from 'react'
import { Redirect } from 'react-router-dom'
import AllComments from './AllComments'

function Post(props) {
  const [redirect, setRedirect] = React.useState(false)
  const [sending, isSending] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  // Delete clicked post.
  const deleted = async (event) => {
    isSending(true)
    await fetch('/blogposts/' + props.id, {
      method: 'DELETE',
    })
    window.location.reload()
  }

  // If Edit-button is clicked, setRedirect to true.
  const edited = (event) => {
    setRedirect(true)
  }

  // Fetch comments from current blogpost.
  async function fetchComments() {
    setIsLoading(true)
    const hr = await fetch(`/comments/${props.id}`)
    const json = await hr.json()
    setComments(json)
  }

  // Fetch comments, when mounted.
  React.useEffect(() => {
    fetchComments().then(() => setIsLoading(false)).catch(() => setErrorWhenFetching(true))
  }, [])

  // Redirect to /modifyPost, if Edit-button is clicked.
  if (redirect) {
    return <Redirect to={{
      pathname: '/modifyPost',
      state: { id: props.id, author: props.author, topic: props.topic, text: props.text }
    }}/>
  }

  // Show error-message, if fetching comments failed.
  if (errorWhenFetching) {
    return <div>Error, when fetching comments. Try to reload the page.</div>
  }

  return (
    <div>
    <h1>{props.topic}</h1>
    <h5>Author: {props.author} <br/>Created: {props.creationDate}</h5>
    <p>{props.text}</p>
    <button disabled={sending} onClick={edited}>Edit</button>
    <button disabled={sending} onClick={deleted}>Delete</button>
    <br/><br/>
    <h4>Comments</h4>
    {isLoading ? 'Loading...' : <AllComments allComments={comments} amount={comments.length}/>}
    </div>
    )
}

export default Post
