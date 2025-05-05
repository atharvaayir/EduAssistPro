import React from 'react'

const FormInputBox = ({children}) => {
  return (
    <div className='p-6 mb-5 overflow-x-auto rounded-box border border-base-content/5 bg-white/90 shadow-lg shadow-black/20'>
        {children}
    </div>
  )
}

export default FormInputBox