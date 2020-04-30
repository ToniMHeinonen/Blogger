import React from 'react'
import OlderPostsTopics from './OlderPostsTopics'

function OlderPosts() {
  const [blogPosts, setBlogPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  async function fetchBlogPosts() {
    setIsLoading(true)
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    return json
  }

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
    {isLoading ? 'Loading...' : <OlderPostsTopics blogposts={blogPosts} amount={blogPosts.length}></OlderPostsTopics>}
    </div>
  )
}

export default OlderPosts
