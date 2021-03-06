import React from 'react'
import './App.css'
import './css/navigation.css'
import AddPost from './AddPost'
import Home from './Home'
import ModifyPost from './ModifyPost'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AddComment from './AddComment'
import Search from './Search'
import Login from './Login'
import LoginContext from './LoginContext'
import Cookies from 'universal-cookie'
import NotFound from './NotFound'
import ModifyComment from './ModifyComment'
import OlderPosts from './OlderPosts'

/**
 * Called, when app starts.
 */
function App() {
  const cookies = new Cookies()
  let booleanValue = false

  // If user hasn't visited page before or cookies have expired, set authCookie to false.
  if (cookies.get('authCookie') === undefined) {
    cookies.set('authCookie', false, { path: '/' })
  }

  // Has to use booleanValue, because authCookies returns string.
  if (cookies.get('authCookie') === 'false') {
    booleanValue = false
  } else {
    booleanValue = true
  }

  // LoginContext variables.
  const [loggedIn, setLoggedIn] = React.useState(booleanValue)
  const changeLogin = (attr) => setLoggedIn(attr)

  return (
    <LoginContext.Provider value={{loggedIn, changeLogin}}>
    <Router>
      <div className="wholelayout">
        <div className="header">
        <h1>Blogger</h1>
        by Toni Heinonen & Olli Ahonen
        </div>
        <nav className="upnavi">
            <ul className="navi">
              <li>
                <Link to="/">Home</Link>
              </li>
                {!loggedIn ? null : 
                <li>
                <Link to="/addPost">Add new post</Link>
                </li>}
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="olderPosts">All posts</Link>
              </li>
            </ul>
          </nav>
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/addPost" component={AddPost}/>
          <Route path="/modifyPost" component={ModifyPost}/>
          <Route path="/addComment" component={AddComment}/>
          <Route path="/search" component={Search}/>
          <Route path="/login" component={Login}/>
          <Route path="/modifyComment" component={ModifyComment}/>
          <Route path="/olderPosts" component={OlderPosts}/>
          <Route parh="/*" component={NotFound}/>
        </Switch>
      </div>
    </Router>
    </LoginContext.Provider>
  )
}

export default App
