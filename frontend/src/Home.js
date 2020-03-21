import React from 'react';
import './App.css';
import AllPosts from './AllPosts';

function Home() {
  const [blogPosts, setBlogPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorWhenFetching, setErrorWhenFetching] = React.useState(false)

  async function fetchBlogPosts() {
    setIsLoading(true)
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    setBlogPosts(json)
  }

  React.useEffect(() => {
    fetchBlogPosts().then(() => setIsLoading(false)).catch(() => setErrorWhenFetching(true))
  }, [])

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
