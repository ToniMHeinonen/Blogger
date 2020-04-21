import React from 'react'
import Post from './Post'
import { Redirect } from 'react-router-dom'

/**
 * Push each blogpost to array with properties.
 * @param {*} props - properties
 */
function AllPosts(props) {
  const [redirect, setRedirect] = React.useState(false)
  let data = []
  let newData = []
  let showPostsInPage = 5

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

  const clicked = (event) => {
    setRedirect(true)
  }

  if (redirect) {
    return <Redirect to={{
      pathname: '/olderPosts',
      state: {blogposts: props.allBlogPosts}
    }}/>
  }

  // If AllPosts is called from Search.
  if (data.length === 0 && props.from === 'search') {
    return <div>No posts found.</div>
  }

  return (
    <div>{data.length > showPostsInPage ? <>{newData}<br/><button onClick={clicked}>Older posts</button></>: data}</div>
  )
}

export default AllPosts
