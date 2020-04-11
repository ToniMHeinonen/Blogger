import React from 'react'
import Post from './Post'

/**
 * Push each blogpost to array with properties.
 * @param {*} props - properties
 */
function AllPosts(props) {
  let data = []
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

  // If AllPosts is called from Search.
  if (data.length === 0 && props.from === 'search') {
    return <div>No posts found.</div>
  }

  return <div>{data}</div>
}

export default AllPosts
