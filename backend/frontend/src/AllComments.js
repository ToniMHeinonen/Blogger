import React from 'react'
import Comment from './Comment'
import './css/comment.css'

/**
 * Push each comment to array with properties.
 * @param {*} props - properties
 */
function AllComments(props) {
  let data = []

  props.allComments.sort((a, b) => {
    let keyA = a.creationDate
    let keyB = b.creationDate
    if (keyA > keyB) return -1
    if (keyA < keyB) return 1
    return 0
  })

  for (let i = 0; i < props.amount; i++) {
    data.push(<Comment 
      key={props.allComments[i].id}
      id={props.allComments[i].id}
      author={props.allComments[i].author}
      creationDate={props.allComments[i].creationDate}
      lastModified={props.allComments[i].lastModified}
      text={props.allComments[i].text}
      likes={props.allComments[i].likes}>
      </Comment>)
  }

  // If AllComments is called from Search.
  if (data.length === 0 && props.from === 'search') {
    return <div className="nocomments">No comments found.</div>
  }

  return <div>{data}</div>
}

export default AllComments
