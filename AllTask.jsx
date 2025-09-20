// src/components/other/AllTask.jsx
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
  const authData = useContext(AuthContext)
  const employees = authData?.employee || []

  return (
    <>
      <div className='bg-dark mt-3 p-3 rounded-2'>
        <div className='border text-dark bg-light border-ouline-light p-1 rounded-3 mb-2 d-flex justify-content-between align-items-center'>
          <h5 className='fs-4 font-semibold w-25'>Employee Name</h5>
          <h5 className='fs-4 font-semibold w-25'>New Task</h5>
          <h5 className='fs-4 font-semibold w-25'>Active Task</h5>
          <h5 className='fs-4 font-semibold w-25'>Completed Task</h5>
          <h5 className='fs-4 font-semibold w-25'>Failed Task</h5>
        </div>

        <div>
          {employees.length === 0 ? (
            <div className='text-white p-3'>No employees found.</div>
          ) : (
            employees.map((elem, idx) => (
              <div key={idx} className='border border-outline-light p-2 rounded-3 mb-2 d-flex justify-content-between align-items-center'>
                <h3 className='fs-4 font-semibold w-25 text-white'>{elem.firstname}</h3>
                <h4 className='fs-4 font-semibold w-25' style={{ color: 'blue' }}>{elem.taskSummary?.newTask ?? 0}</h4>
                <h4 className='fs-4 font-semibold w-25' style={{ color: 'yellow' }}>{elem.taskSummary?.active ?? 0}</h4>
                <h4 className='fs-4 font-semibold w-25' style={{ color: 'green' }}>{elem.taskSummary?.completed ?? 0}</h4>
                <h4 className='fs-4 font-semibold w-25' style={{ color: 'red' }}>{elem.taskSummary?.failed ?? 0}</h4>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default AllTask
