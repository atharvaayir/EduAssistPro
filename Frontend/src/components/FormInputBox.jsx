import React from 'react'

const FormInputBox = ({children}) => {
  return (
    <div className='p-6 bg-white shadow-md rounded-lg mb-5 border-2 border-black/40'>
        {children}
    </div>
  )
}

export default FormInputBox