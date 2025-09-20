// src/App.jsx
import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  // initialize storage only if missing (setLocalStorage checks that)
  useEffect(() => {
    setLocalStorage()
  }, [])

  const { employee: authEmployees } = useContext(AuthContext)

  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }
  }, [])

  const handleLogin = (email, password) => {
    // check admin from storage
    const { admin, employee } = getLocalStorage()

    if (admin && email === admin.email && password === admin.password) {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return
    }

    // prefer context employees if loaded, otherwise fallback to storage
    const employees = (authEmployees && authEmployees.length) ? authEmployees : (employee || [])
    const found = employees.find((e) => email === e.email && password === e.password)
    if (found) {
      setUser('employee')
      setLoggedInUserData(found)
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: found }))
      return
    }

    alert('INVALID CREDENTIALS')
  }

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : null}
      {user === 'admin' ? (
        <AdminDashboard changeUser={setUser} />
      ) : user === 'employee' ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  )
}

export default App
