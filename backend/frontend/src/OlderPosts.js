import React from 'react'
import OlderPostsTopics from './OlderPostsTopics'

/**
 * Fetch all blogposts in /olderposts.
 */
function OlderPosts() {
  const [blogPosts, setBlogPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  /**
   * Fetch all blogposts.
   */
  async function fetchBlogPosts() {
    setIsLoading(true)
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    return json
  }

  /**
   * Fetch blogposts, when mounted. Cancel fetch, if user moves away from /olderposts
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

  if (errorWhenFetching) {
    return <div>Error, when fetching blogposts. Try to reload the page.</div>
  }

  return (
    <div>
    {isLoading ? <div className="loading">Loading...</div> : 
    <OlderPostsTopics blogposts={blogPosts} amount={blogPosts.length}></OlderPostsTopics>}
    </div>
  )
}

export default OlderPosts
