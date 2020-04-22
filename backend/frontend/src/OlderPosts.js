import React from 'react'
import { Redirect } from 'react-router-dom'
import Post from './Post'

function OlderPosts(props) {
  let topics = []
  const [showPost, setShowPost] = React.useState([0, false])
  const [goBack, setGoBack] = React.useState(false)

  const clicked = (event) => {
    setShowPost([event.target.id, true])
  }

  const backClicked = (event) => {
    setGoBack(true)
  }

  for (let i = 0; i < props.location.state.blogposts.length; i++) {
    topics.push(
      <div
        key={props.location.state.blogposts[i].id}
        id={props.location.state.blogposts[i].id} 
        onClick={clicked}>
          {props.location.state.blogposts[i].topic}
      </div>)
  }

  if (goBack) {
    window.location.reload()
  }

  if (showPost[1]) {
    for (let i = 0; i < props.location.state.blogposts.length; i++) {
      if (props.location.state.blogposts[i].id + '' === showPost[0]) {
        return <><Post 
        key={props.location.state.blogposts[i].id}
        id={props.location.state.blogposts[i].id}
        author={props.location.state.blogposts[i].author}
        topic={props.location.state.blogposts[i].topic} 
        creationDate={props.location.state.blogposts[i].creationDate}
        lastModified={props.location.state.blogposts[i].lastModified}
        text={props.location.state.blogposts[i].text}>
        </Post><br/>
        <button onClick={backClicked}>Back</button></>
      }
    }
  }

  return <div>{topics}</div>
}

export default OlderPosts
