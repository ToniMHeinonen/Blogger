import React from 'react';
import { Redirect } from 'react-router-dom';

function Post(props) {
  const [redirect, setRedirect] = React.useState(false)

  const deleted = (event) => {
    fetch('/blogposts/' + props.id, {
      method: 'DELETE',
    })
    .then(window.location.reload())
  }

  const edited = (event) => {
    event.preventDefault()
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={{
      pathname: '/modifyPost',
      state: { id: props.id, topic: props.topic, text: props.text }
  }}
/>
  }

  return (
    <div>
    <h2>{props.topic}</h2>
    <h3>{props.creationDate}</h3>
    <p>{props.text}</p>
    <button onClick={edited}>Edit</button>
    <button onClick={deleted}>Delete</button>
    </div>
    )
}

export default Post