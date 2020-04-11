import React from 'react'
import './App.css'
import AllPosts from './AllPosts'

/**
 * Homepage.
 */
function Home() {
  const [blogPosts, setBlogPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  /**
   * Fetch all blogposts and return it in json-format.
   */
  async function fetchBlogPosts() {
    setIsLoading(true)
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    return json
  }

  /**
   * Fetch all blogposts, when mounted. Cancel fetch, if user moves away from homepage
   * in the middle of fetching.
   */
  React.useEffect(() => {
    let isCancelled = false

    fetchBlogPosts()
      .then((result) => {
        if (!isCancelled) {
          setBlogPosts(result)
          setIsLoading(false)
        }
      })
      .catch(() => setErrorWhenFetching(true))

    return () => {
      isCancelled = true
    }

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
