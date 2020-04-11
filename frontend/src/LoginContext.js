import React from 'react'

/**
 * Use LoginContext, because it can be used in multiple components without using props.
 */
const LoginContext = React.createContext({
    loggedIn: false, 
    changeLogin: () => {},
})

export default LoginContext
