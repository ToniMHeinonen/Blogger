import React from 'react'

function Comment(props) {

    return (
        <div>
        <h5>Author: {props.author} <br/>Created: {props.creationDate}
        <br/>Likes: {props.likes}</h5>
        <p>{props.text}</p>
        <br/>
        </div>
        )
}

export default Comment
