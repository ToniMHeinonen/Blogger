import React from 'react'
import SearchResult from './SearchResult'
import Post from './Post'
import AllPosts from './AllPosts'

function Search() {
  const [sending, isSending] = React.useState(false)
  const [result, setResult] = React.useState([])
  const [showNothing, setShowNothing] = React.useState(true)

  const search = async (event) => {
    isSending(true)
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { searchFrom: data.get('items'), searchText: data.get('searchText') }
    if (newPost.searchText !== '' && newPost.searchText.length < 30) {
      const hr = await fetch(`/${newPost.searchFrom}/search/${newPost.searchText}`)
      const json = await hr.json()
      setResult(json)
    }
    isSending(false)
    setShowNothing(false)
  }

  return (
    <div>
    <form onSubmit={search}>
      <label>Search from: </label>
      <select id="items" name="items">
        <option value="blogposts">Blogposts</option>
        <option value="comments">Comments</option>
      </select>
      <br/>
      <label>
        Text (1-29 characters):
        <input id="searchText" name="searchText" type="text"/>
      </label>
      <button disabled={sending}>Send</button>
    </form>
    {showNothing ? '' : <AllPosts allBlogPosts={result} amount={result.length}/>}
    </div>
  )
}

export default Search
