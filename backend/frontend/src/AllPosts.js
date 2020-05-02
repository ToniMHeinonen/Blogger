import React from 'react'
import Post from './Post'
import { Redirect } from 'react-router-dom'
import './css/post.css'

/**
 * Push each blogpost to array with properties.
 * @param {*} props - properties
 */
function AllPosts(props) {
  let data = []
  let newData = []
  let showPostsInPage = 5

  props.allBlogPosts.sort((a, b) => {
    let keyA = a.creationDate
    let keyB = b.creationDate
    if (keyA > keyB) return -1
    if (keyA < keyB) return 1
    return 0
  })

  for (let i = 0; i < props.amount; i++) {
    data.push(<Post 
      key={props.allBlogPosts[i].id}
      id={props.allBlogPosts[i].id}
      author={props.allBlogPosts[i].author}
      topic={props.allBlogPosts[i].topic} 
      creationDate={props.allBlogPosts[i].creationDate}
      lastModified={props.allBlogPosts[i].lastModified}
      text={props.allBlogPosts[i].text}>
      </Post>)
  }

  if (data.length > showPostsInPage) {
    for (let i = 0; i < showPostsInPage; i++) {
      newData[i] = data[i]
    }
  }

  // If AllPosts is called from Search.
  if (data.length === 0 && props.from === 'search') {
    return <div>No posts found.</div>
  }

  return (
    <div>{data.length > showPostsInPage && props.from != 'search' ? <>{newData}<br/></>: data}</div>
  )
}

export default AllPosts
