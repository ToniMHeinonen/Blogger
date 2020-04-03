import React from 'react'

function SearchResult(props) {

  let data = []

  for (let i = 0; i < props.amount; i++) {
    data.push(
    <option key={props.blogPosts[i].id} value={props.blogPosts[i].id}>
        {props.blogPosts[i].topic}
    </option>)
  }

  return (
    <select id="blogID" name="blogID">
      {data}
    </select>
  )
}

export default SearchResult