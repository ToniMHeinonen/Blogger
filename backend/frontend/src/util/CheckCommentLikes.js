import React from 'react'

const CheckComment = (localStorageKey) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  )

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [localStorageKey, value])

  return [value, setValue]
}

export default CheckComment
