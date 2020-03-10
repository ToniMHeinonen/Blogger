import React from 'react'
import logo from './logo.svg'
import './App.css'
import Post from './Post'
import AllPosts from './AllPosts'
import AddPost from './AddPost'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {

  return (
    <Router>
      <div>
        <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/addPost">Add new post</Link>
              </li>
            </ul>
          </nav>
        <Switch>
          <Route path="/addPost">
            <AddPost />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
