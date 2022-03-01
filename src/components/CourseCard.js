import React from 'react'

function CourseCard(props) {
  return (
    <div className='flex justify-between w-full py-3 bg-white border-gray-200 border rounded-xl'>
        <div className='flex justify-start items-center'>
            <div className='ml-10'>{props.courseName}</div>
        </div>
        <div className='flex justify-end items-center'>
            <div className='mr-10'>{props.enrolledDate}</div>
        </div>
    </div>
  )
}

export default CourseCard