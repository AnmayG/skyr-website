import React from 'react'
import CourseCard from './CourseCard'

function CoursesList() {
  return (
    <div>
        <div className="mx-20 bg-white h-full">
            <CourseCard courseName="test" enrolledDate="22 02 2022" />
        </div>
    </div>
  )
}

export default CoursesList