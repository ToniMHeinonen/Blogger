import React from 'react';

function Post(props) {
  const deleted = (event) => {
    fetch('/blogposts/' + props.id, {
      method: 'DELETE',
    })
    .then(window.location.reload())
  }

  return (
    <div>
    <h2>{props.topic}</h2>
    <h3>{props.creationDate}</h3>
    <p>{props.text}</p>
    <button>Edit</button>
    <button onClick={deleted}>Delete</button>
    </div>
    )
}

export default Post