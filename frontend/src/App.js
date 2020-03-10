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

  const addPost = async () => {
    const newPost = { topic: 'hello', text: 'uutta tekstiä' }
    const conf = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newPost)
    }
    await fetch('/blogposts/', conf)
    window.location.reload()
  }

  return (
    <div>
      <button onClick={addPost}>Add</button>
      {isLoading ? 'Loading...' : <AllPosts allBlogPosts={blogPosts} amount={blogPosts.length}/>}
    </div>
  )
}

export default App;
