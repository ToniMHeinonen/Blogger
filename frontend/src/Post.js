import React from 'react';

function Post(props) {
  return (
    <div>
    <h2>{props.topic}</h2>
    <h3>{props.creationDate}</h3>
    <p>{props.text}</p>
    <button>Edit</button>
    <button>Delete</button>
    </div>
    )
}

export default Post