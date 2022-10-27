import React from 'react'

export default function LazyLoader() {
  return (
    <div className="flex items-center justify-center ">
        <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
        <i className='text-gray-500'>Loading...</i>
    </div>
  )
}
