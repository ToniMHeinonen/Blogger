import React from 'react'

const LoginContext = React.createContext({
    loggedIn: false, 
    changeLogin: () => {},
})

export default LoginContext
