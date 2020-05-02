import React from 'react'
import Post from './Post'
import GetProperDate from './util/GetProperDate'
import './css/olderposts.css'

function OlderPostsTopics(props) {
  let topics = []
  const [showPost, setShowPost] = React.useState([0, false])
  const [goBack, setGoBack] = React.useState(false)

  props.blogposts.sort((a, b) => {
    let keyA = a.creationDate
    let keyB = b.creationDate
    if (keyA > keyB) return -1
    if (keyA < keyB) return 1
    return 0
  })

  const clicked = (event) => {
    console.log(event.target.id)
    setShowPost([event.target.id, true])
  }

  const backClicked = (event) => {
    setGoBack(true)
  }

  for (let i = 0; i < props.amount; i++) {
    topics.push(
        <li key={props.blogposts[i].id}
            id={props.blogposts[i].id} 
            onClick={clicked}>
          {props.blogposts[i].topic}<br/>{GetProperDate(props.blogposts[i].creationDate)}
        </li>)
  }

  if (goBack) {
    window.location.reload()
  }

  if (showPost[1]) {
    for (let i = 0; i < props.amount; i++) {
      if (props.blogposts[i].id + '' === showPost[0]) {
        return <><Post 
        key={props.blogposts[i].id}
        id={props.blogposts[i].id}
        author={props.blogposts[i].author}
        topic={props.blogposts[i].topic} 
        creationDate={props.blogposts[i].creationDate}
        lastModified={props.blogposts[i].lastModified}
        text={props.blogposts[i].text}>
        </Post><br/>
        <button className="backbutton" onClick={backClicked}>Back</button></>
      }
    }
  }

  return <ol className="topics">{topics}</ol>
}

export default OlderPostsTopics