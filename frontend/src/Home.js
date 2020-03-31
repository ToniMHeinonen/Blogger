import React from 'react'
import './App.css'
import AllPosts from './AllPosts'

function Home() {
  const [blogPosts, setBlogPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  // Fetch all blogposts.
  async function fetchBlogPosts() {
    setIsLoading(true)
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    setBlogPosts(json)
  }

  // Fetch all blogposts, when mounted.
  React.useEffect(() => {
    fetchBlogPosts().then(() => setIsLoading(false)).catch(() => setErrorWhenFetching(true))
  }, [])

  // Show error-message, if fetching blogposts failed.
  if (errorWhenFetching) {
    return <div>Error, when fetching blogposts. Try to reload the page.</div>
  }

  return (
    <div>
    {isLoading ? 'Loading...' : <AllPosts allBlogPosts={blogPosts} amount={blogPosts.length}/>}
    </div>
  )
}

export default Home
