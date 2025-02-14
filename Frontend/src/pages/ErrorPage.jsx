import React from 'react'
import { Simple404 } from '@404pagez/react'

const ErrorPage = () => {
  return (
    <div className='flex flex-row min-h-screen justify-center items-center'>
    <Simple404 size={20} isButton={false} />
    </div>
  )
}

export default ErrorPage
