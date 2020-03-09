import React from 'react';
import Post from './Post'

function AllPosts(props) {
    let data = []
    for (let i = 0; i < props.amount; i++) {
        data.push(<Post 
            key={props.allBlogPosts[i].id} 
            topic={props.allBlogPosts[i].topic} 
            creationDate={props.allBlogPosts[i].creationDate} 
            text={props.allBlogPosts[i].text}>
            </Post>)
    }

    return <div>{data}</div>
}

export default AllPosts