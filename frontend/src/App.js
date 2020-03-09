import React from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post'
import AllPosts from './AllPosts'

function App() {
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
    <div>{isLoading ? 'Loading...' : <AllPosts posting={blogPosts} amount={blogPosts.length}/>}</div>
  )
}

export default App;
