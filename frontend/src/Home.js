import React from 'react';
import './App.css';
import Post from './Post';
import AllPosts from './AllPosts';
import AddPost from './AddPost';

function Home() {
  const [blogPosts, setBlogPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  async function fetchBlogPosts() {
    setIsLoading(true)
    const hr = await fetch('/blogposts/')
    const json = await hr.json()
    setBlogPosts(json)
    setIsLoading(false)
  }

  React.useEffect(() => {
    fetchBlogPosts()
  }, [])

  return (
    <div>
    {isLoading ? 'Loading...' : <AllPosts allBlogPosts={blogPosts} amount={blogPosts.length}/>}
    </div>
  )
}

export default Home
