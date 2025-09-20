// src/components/Dashboard/EmployeeDashboard.jsx
import React, { useState } from 'react'
import Header from '../other/Header'
import TaskList from '../TaskList/TaskList'
import TaskListNumber from '../other/TaskListNumber'
import EmployeeProfile from '../Profile/EmployeeProfile'

const EmployeeDashboard = (props) => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='p-4 bg-dark-subtle min-vh-100'>
      <Header changeUser={props.changeUser} data={props.data} onProfileClick={() => setShowProfile(true)} />
      {showProfile ? (
        <EmployeeProfile data={props.data} onClose={() => setShowProfile(false)} />
      ) : (
        <>
          <TaskListNumber data={props.data} />
          <TaskList data={props.data} />
        </>
      )}
    </div>
  )
}

export default EmployeeDashboard
