import React from 'react'

const GetProperDate = (time) => {
  const date = new Date(time)
  
  return <>{date.getDate()}.{date.getMonth()+1}.{date.getFullYear()} {(date.getHours() < 10 ? '0':'') + 
  date.getHours()}:{(date.getMinutes() < 10 ? '0':'') + date.getMinutes()}</>
}

export default GetProperDate
