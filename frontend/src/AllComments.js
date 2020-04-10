import React from 'react'
import Comment from './Comment'

// Push each comment to array with properties.
function AllComments(props) {
  let data = []
  for (let i = 0; i < props.amount; i++) {
    data.push(<Comment 
      key={props.allComments[i].id}
      id={props.allComments[i].id}
      author={props.allComments[i].author}
      creationDate={props.allComments[i].creationDate} 
      text={props.allComments[i].text}
      likes={props.allComments[i].likes}>
      </Comment>)
  }

  if (data.length === 0 && props.from === 'search') {
    return <div>No comments found.</div>
  }

  return <div>{data}</div>
}

export default AllComments
