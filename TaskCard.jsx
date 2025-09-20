// src/components/TaskList/TaskCard.jsx
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const daysBetween = (dateStr) => {
  if (!dateStr) return null
  const today = new Date()
  const d = new Date(dateStr)
  // clear hours
  const diff = Math.floor((d.setHours(0,0,0,0) - today.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))
  return diff
}

const recalcSummary = (tasks) => {
  const s = { newTask: 0, active: 0, completed: 0, failed: 0 }
  tasks.forEach(t => {
    if (t.status === 'new') s.newTask++
    else if (t.status === 'in-progress') s.active++
    else if (t.status === 'completed') s.completed++
    else if (t.status === 'failed') s.failed++
  })
  return s
}

const TaskCard = ({ task, empId, taskIndex }) => {
  const auth = useContext(AuthContext)

  const updateTaskStatus = (newStatus) => {
    const all = JSON.parse(localStorage.getItem('Employee')) || []
    const idx = all.findIndex(e => e.id === empId)
    if (idx === -1) return

    all[idx].tasks[taskIndex] = { ...all[idx].tasks[taskIndex], status: newStatus }
    // recalc summary
    all[idx].taskSummary = recalcSummary(all[idx].tasks)

    localStorage.setItem('Employee', JSON.stringify(all))
    if (auth && typeof auth.refreshAuth === 'function') auth.refreshAuth()

    // update loggedInUser if matches
    try {
      const loggedRaw = localStorage.getItem('loggedInUser')
      if (loggedRaw) {
        const logged = JSON.parse(loggedRaw)
        if (logged.role === 'employee' && logged.data && logged.data.id === empId) {
          logged.data = all[idx]
          localStorage.setItem('loggedInUser', JSON.stringify(logged))
        }
      }
    } catch (e) {}
  }

  const daysLeft = daysBetween(task.date)
  const overdue = typeof daysLeft === 'number' && daysLeft < 0

  // small style helpers
  const priorityBadge = {
    Low: 'badge bg-secondary',
    Medium: 'badge bg-warning text-dark',
    High: 'badge bg-danger'
  }[task.priority || 'Medium']

  const statusBadge = {
    'new': 'badge bg-info text-dark',
    'in-progress': 'badge bg-primary',
    'completed': 'badge bg-success',
    'failed': 'badge bg-danger'
  }[task.status]

  return (
    <div className='card p-3' style={{ minWidth: 280, maxWidth: 320 }}>
      <div className='d-flex justify-content-between align-items-start'>
        <h5>{task.title}</h5>
        <div className='text-end'>
          <div className={priorityBadge} style={{ fontSize: 12 }}>{task.priority}</div>
          <div className='mt-1'><span className={statusBadge} style={{ fontSize: 12 }}>{task.status}</span></div>
        </div>
      </div>

      <p className='small text-muted'>{task.description}</p>

      <div className='d-flex justify-content-between align-items-center'>
        <small>{task.date}</small>
        <small className={overdue ? 'text-danger' : 'text-muted'}>
          {typeof daysLeft === 'number' ? (overdue ? `${Math.abs(daysLeft)}d overdue` : `${daysLeft}d left`) : ''}
        </small>
      </div>

      <div className='d-flex gap-2 mt-3'>
        {task.status === 'new' && (
          <button className='btn btn-sm btn-primary' onClick={() => updateTaskStatus('in-progress')}>Start</button>
        )}
        {task.status === 'in-progress' && (
          <>
            <button className='btn btn-sm btn-success' onClick={() => updateTaskStatus('completed')}>Complete</button>
            <button className='btn btn-sm btn-danger' onClick={() => updateTaskStatus('failed')}>Fail</button>
          </>
        )}
        {task.status === 'completed' && <span className='text-success small'>Completed</span>}
        {task.status === 'failed' && <span className='text-danger small'>Failed</span>}
      </div>
    </div>
  )
}

export default TaskCard
