import React from 'react'

const Container = ({children}) => {
  return (
    <div className="mx-auto w-full max-w-6xl xl:px-20 md:px-10 px-5" >{children}</div>
  )
}

export default Container