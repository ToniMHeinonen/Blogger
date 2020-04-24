import React from 'react'
import './css/search.css'

/**
 * Used to get topic of all blogposts to the form in Search.
 * @param {*} props - properties
 */
function SearchResult(props) {

  let data = []

  for (let i = 0; i < props.amount; i++) {
    data.push(
    <option key={props.blogPosts[i].id} value={props.blogPosts[i].id}>
        {props.blogPosts[i].topic}
    </option>)
  }

  return (
    <select className="commentdropdown" id="blogID" name="blogID">
      {data}
    </select>
  )
}

export default SearchResult
