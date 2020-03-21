import React from 'react';
import { Redirect } from 'react-router-dom';

function Post(props) {
  const [redirect, setRedirect] = React.useState(false)

  const deleted = async (event) => {
    await fetch('/blogposts/' + props.id, {
      method: 'DELETE',
    })
    .then(window.location.reload())
  }

  const edited = (event) => {
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={{
      pathname: '/modifyPost',
      state: { id: props.id, author: props.author, topic: props.topic, text: props.text }
  }}
/>
  }

  return (
    <div>
    <h3>{props.topic}</h3>
    <h4>Author: {props.author}</h4>
    <h4>Created: {props.creationDate}</h4>
    <p>{props.text}</p>
    <button onClick={edited}>Edit</button>
    <button onClick={deleted}>Delete</button>
    <br></br><br></br>
    </div>
    )
}

export default Post