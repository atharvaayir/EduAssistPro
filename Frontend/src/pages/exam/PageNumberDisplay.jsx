import React from 'react'
import FormInputBox from '../../components/FormInputBox'

const PageNumberDisplay = ({currentStage,steps}) => {
  return (
    <FormInputBox>
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-full"
        >
          {/* 🚀 Line Between Steps */}
          {index >= 0 && (
            <div
              className={`h-1 w-full transition-all duration-500 ${
                index <= currentStage
                  ? "bg-green-400"
                  : "bg-gray-300"
              }`}
            />
          )}
          {/* 🚀 Bob (Step Circle) */}
          <div className="translate-y-2 w-full flex flex-col">
            <div
              className={`w-10 h-10 flex items-center mx-auto justify-center rounded-full font-bold text-white transition-all duration-300 ${
                index <= currentStage
                  ? "bg-green-400 scale-110"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            {/* 🚀 Step Name */}
            <p className="mt-2 text-sm font-semibold text-center">
              {step}
            </p>
          </div>
        </div>
      ))}
    </div>
  </FormInputBox>
  )
}

export default PageNumberDisplay