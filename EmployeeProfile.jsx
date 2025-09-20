// src/components/Profile/EmployeeProfile.jsx
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const uiAvatarUrl = (fullname) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(fullname)}&background=0D8ABC&color=fff&size=200`

const EmployeeProfile = ({ data, onClose }) => {
  const auth = useContext(AuthContext)
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    avatar: '', // base64
    role: '',
    joinDate: '',
    id: null
  })

  useEffect(() => {
    if (data) {
      setForm({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        email: data.email || '',
        avatar: data.avatar || '',
        role: data.role || 'employee',
        joinDate: data.joinDate || '',
        id: data.id
      })
    }
  }, [data])

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({ ...prev, avatar: reader.result }))
    }
    reader.readAsDataURL(f)
  }

  const avatarSrc = form.avatar || uiAvatarUrl(`${form.firstname} ${form.lastname}`)

  const saveProfile = () => {
    const all = JSON.parse(localStorage.getItem('Employee')) || []
    const idx = all.findIndex(x => x.id === form.id)
    if (idx === -1) {
      alert('Employee not found')
      return
    }

    // basic validation
    if (!form.firstname || !form.lastname || !form.email) {
      alert('Please fill all required fields')
      return
    }

    // update
    all[idx] = {
      ...all[idx],
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      avatar: form.avatar,
      // keep role and joinDate unchanged unless you want to allow edit
      role: all[idx].role || form.role,
      joinDate: all[idx].joinDate || form.joinDate
    }

    localStorage.setItem('Employee', JSON.stringify(all))
    if (auth && typeof auth.refreshAuth === 'function') auth.refreshAuth()

    // If the currently logged in user is this employee, update loggedInUser localStorage too
    try {
      const loggedRaw = localStorage.getItem('loggedInUser')
      if (loggedRaw) {
        const logged = JSON.parse(loggedRaw)
        if (logged.role === 'employee' && logged.data && logged.data.id === form.id) {
          logged.data = all[idx]
          localStorage.setItem('loggedInUser', JSON.stringify(logged))
        }
      }
    } catch (e) {
      // ignore
    }

    alert('Profile saved')
    if (typeof onClose === 'function') onClose()
  }

  return (
    <div className='container mt-4'>
      <div className='card p-4' style={{ maxWidth: 900 }}>
        <div className='d-flex gap-4'>
          <div style={{ width: 200, textAlign: 'center' }}>
            <img src={avatarSrc} alt='avatar' className='rounded-circle mb-2' style={{ width: 160, height: 160, objectFit: 'cover' }} />
            <div className='mt-2'>
              <input type='file' accept='image/*' onChange={handleFile} />
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='row g-3'>
              <div className='col-md-6'>
                <label className='form-label'>First name</label>
                <input className='form-control' value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Last name</label>
                <input className='form-control' value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Email</label>
                <input className='form-control' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Role</label>
                <input className='form-control' value={form.role} disabled />
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Join date</label>
                <input className='form-control' value={form.joinDate} disabled />
              </div>
            </div>

            <div className='d-flex gap-2 justify-content-end mt-4'>
              <button className='btn btn-secondary' onClick={() => onClose && onClose()}>Cancel</button>
              <button className='btn btn-primary' onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile
