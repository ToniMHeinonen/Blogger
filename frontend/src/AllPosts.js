import React from 'react';
import Post from './Post'

function AllPosts(props) {
    let data = []
    for (let i = 0; i < props.amount; i++) {
        data.push(<Post 
            key={props.posting[i].id} 
            topic={props.posting[i].topic} 
            creationDate={props.posting[i].creationDate} 
            text={props.posting[i].text}>
            </Post>)
    }

    return <div>{data}</div>
}

export default AllPosts