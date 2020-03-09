import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [blogPost, setBlogPost] = React.useState([])

  async function fetchBlogPost() {
    const hr = await fetch('/blogposts/1/')
    const json = await hr.json()
    const result = await json.text
    setBlogPost(result)
  }

  React.useEffect(() => {
    fetchBlogPost()
  })

  return (
    <div>
      {blogPost}
    </div>
  );
}

export default App;
