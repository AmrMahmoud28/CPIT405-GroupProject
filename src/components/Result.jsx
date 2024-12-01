import React from 'react'

const Result = ({payload}) => {
  console.log(JSON.stringify(payload))
  return (
    <div>
      <p>{
      JSON.stringify(payload)
      //uncomment this to check the result or print it in the console 👍
      }</p>
    </div>
  )
}

export default Result