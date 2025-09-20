import React from 'react'

const TaskListNumber = ({data}) => {
  return (
    <div className='d-flex mt-1 justify-content-between gap-3'>
        <div className='rounded-3 py-5 w-50 px-2 bg-secondary bg-gradient border border-warning'>
            <h3 className='fs-1 fw-bolder '>{data.taskSummary.newTask}</h3>
            <h2 className='fs-1 fw-semibold'>New Task</h2>
        </div>
        <div className='rounded-3 py-5 w-50 px-2 bg-primary bg-gradient border border-warning'>
            <h3 className='fs-1 fw-bolder '>{data.taskSummary.active}</h3>
            <h2 className='fs-1 fw-semibold'>Active Task</h2>
        </div>
        <div className='rounded-3 py-5 w-50 px-2 bg-success bg-gradient border border-warning'>
            <h3 className='fs-1 fw-bolder '>{data.taskSummary.completed}</h3>
            <h2 className='fs-1 fw-semibold'>Completed Task</h2>
        </div>
        <div className='rounded-3 py-5 w-50 px-2 bg-danger bg-gradient border border-warning'>
            <h3 className='fs-1 fw-bolder '>{data.taskSummary.failed}</h3>
            <h2 className='fs-1 fw-semibold'>failed Task</h2>
        </div>
        
    </div>
  )
}

export default TaskListNumber
