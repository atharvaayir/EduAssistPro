import React from 'react'

const PageHeader = (params) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='font-bold text-2xl py-5'>
          <p>{params.heading}</p>
      </h1>
      <div>
        {params.action}
      </div>
    </div>
  )
}

export default PageHeader