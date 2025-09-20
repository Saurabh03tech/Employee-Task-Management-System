// src/components/TaskList/TaskList.jsx
import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({ data }) => {
  if (!data || !data.tasks) return null

  return (
    <div id='scrollbar' className='d-flex overflow-x-auto align-items-start gap-3 justify-content-start w-100 p-2 mt-4 rounded-3' style={{ height: 340 }}>
      {data.tasks.map((task, idx) => (
        <TaskCard key={idx} task={task} empId={data.id} taskIndex={idx} />
      ))}
    </div>
  )
}

export default TaskList
