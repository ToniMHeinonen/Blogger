import React from 'react'

const GetProperDate = (text, time) => {
  const date = new Date(time)
  
  return <>{text}: {date.getDate()}.{date.getMonth()+1}.{date.getFullYear()} {(date.getHours() < 10 ? '0':'') + 
  date.getHours()}:{(date.getMinutes() < 10 ? '0':'') + date.getMinutes()}</>
}

export default GetProperDate
