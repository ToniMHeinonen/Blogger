import React from 'react'
import AllPosts from './AllPosts'
import SearchResult from './SearchResult'
import AllComments from './AllComments'
import './css/search.css'

/**
 * Search-function.
 */
function Search() {
  const [sending, isSending] = React.useState(false)
  const [blogResult, setBlogResult] = React.useState([])
  const [hideBlogResult, setHideBlogResult] = React.useState(true)
  const [showBlogChoice, setShowBlogChoice] = React.useState(true)
  const [blogPosts, setBlogPosts] = React.useState([])
  const [commentResult, setCommentResult] = React.useState([])
  const [hideCommentResult, setHideCommentResult] = React.useState(true)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  /**
   * Fetch blogposts.
   */
  async function fetchBlogPosts() {
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    return json
  }

  /**
   * Get data from the form and fetch blogposts/comments.
   * @param {*} event - event from form.
   */
  const search = async (event) => {
    isSending(true)
    event.preventDefault()
    const data = new FormData(event.target)
    const newPost = { searchFrom: data.get('items'), searchText: data.get('searchText'), blogID: data.get('blogID') }
    if (newPost.searchText !== '' && newPost.searchText.length < 30) {
      if (newPost.searchFrom === 'blogposts') {
        const hr = await fetch(`/${newPost.searchFrom}/search/${newPost.searchText}`)
        const json = await hr.json()
        setBlogResult(json)
        setHideBlogResult(false)
        setHideCommentResult(true)
      } else if (newPost.searchFrom === 'comments') {
        const hr = await fetch(`/comments/${newPost.blogID}/search/${newPost.searchText}`)
        const json = await hr.json()
        setCommentResult(json)
        setHideCommentResult(false)
        setHideBlogResult(true)
      }
    }
    isSending(false)
  }

  /**
   * Chech if comments are selected from dropdown-list and show/hide blog-choice.
   * @param {*} event - event from form
   */
  const check = (event) => {
    if (event.target.value === 'comments') {
      setShowBlogChoice(false)
    } else {
      setShowBlogChoice(true)
    }
  }

  /**
   * Fetch blogposts, when mounted. Cancel fetch, if user moves away from /search
   * in the middle of fetching.
   */
  React.useEffect(() => {
    let isCancelled = false

    fetchBlogPosts().then((result) => {
      if (!isCancelled) {
        setBlogPosts(result)
      }
    })
    .catch(() => setErrorWhenFetching(true))

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div className="wholesearch">
    <form onSubmit={search}>
      <label className="searchfromtext">Search from: </label>
      <select className="blogcommentdropdown" id="items" name="items" onChange={check}>
        <option value="blogposts">Blogposts</option>
        <option value="comments">Comments</option>
      </select>
      <br/>
      {showBlogChoice ? null : [
      <label className="searchfromcommentstext" key="search">Search comments from blog:</label>,
      <SearchResult key="posts" blogPosts={blogPosts} amount={blogPosts.length}/>,
      <br key="space"/>
      ]}
      <label className="searchtext">
        Text (1-29 characters):
        <input className="inputtext" id="searchText" name="searchText" type="text"/>
      </label><br/>
      <button className="searchbutton" disabled={sending}>Search</button>
    </form>
    {hideBlogResult ? null : <AllPosts allBlogPosts={blogResult} amount={blogResult.length} from='search'/>}
    {hideCommentResult ? null : <AllComments allComments={commentResult} amount={commentResult.length} from='search'/>}
    {errorWhenFetching ? 'Error, when fetching blogposts. Try to reload the page.' : null}
    </div>
  )
}

export default Search
