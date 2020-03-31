import React from 'react'
import './App.css'
import AddPost from './AddPost'
import Home from './Home'
import ModifyPost from './ModifyPost'
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
          <Route exact={true} path="/" component={Home}/>
          <Route path="/addPost" component={AddPost}/>
          <Route path="/modifyPost" component={ModifyPost}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App
