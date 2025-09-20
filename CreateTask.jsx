// src/components/other/CreateTask.jsx
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
  const auth = useContext(AuthContext)
  const employees = auth?.employee || []

  const [taskTitle, setTaskTitle] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignToId, setAssignToId] = useState('') // employee id
  const [priority, setPriority] = useState('Medium')
  const [description, setDescription] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    if (!assignToId) {
      alert('Please select an employee to assign task')
      return
    }

    const newTaskObj = {
      title: taskTitle,
      date,
      category,
      description,
      status: 'new',
      priority,
    }

    const data = JSON.parse(localStorage.getItem('Employee')) || []
    const empIndex = data.findIndex(emp => emp.id === Number(assignToId))
    if (empIndex === -1) {
      alert('Selected employee not found')
      return
    }

    data[empIndex].tasks.push(newTaskObj)

    // recalc summary
    const s = { newTask: 0, active: 0, completed: 0, failed: 0 }
    data[empIndex].tasks.forEach(t => {
      if (t.status === 'new') s.newTask++
      if (t.status === 'in-progress') s.active++
      if (t.status === 'completed') s.completed++
      if (t.status === 'failed') s.failed++
    })
    data[empIndex].taskSummary = s

    localStorage.setItem('Employee', JSON.stringify(data))
    if (auth && typeof auth.refreshAuth === 'function') auth.refreshAuth()

    // Reset form
    setTaskTitle('')
    setDate('')
    setCategory('')
    setAssignToId('')
    setPriority('Medium')
    setDescription('')
  }

  return (
    <div className='container-fluid mt-4 bg-warning-subtle text-white p-4 rounded'>
      <form onSubmit={submitHandler} className='row g-4'>
        <div className='col-md-6'>
          <div className='mb-3'>
            <label className='form-label text-dark'>Task Title</label>
            <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} type="text" className='form-control' required />
          </div>

          <div className='mb-3'>
            <label className='form-label text-dark'>Date</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className='form-control' required />
          </div>

          <div className='mb-3'>
            <label className='form-label text-dark'>Assign To</label>
            <select value={assignToId} onChange={(e) => setAssignToId(e.target.value)} className='form-select' required>
              <option value=''>-- Select Employee --</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {`${emp.firstname} ${emp.lastname || ''}`}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label className='form-label text-dark'>Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" className='form-control' required />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='mb-3'>
            <label className='form-label text-dark'>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='form-control' rows={6} required />
          </div>

          <div className='mb-3'>
            <label className='form-label text-dark'>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className='form-select'>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <button type='submit' className='btn btn-success w-100'>Create Task</button>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
