// src/components/Auth/Login.jsx
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    handleLogin(email.trim(), password)
    setEmail('')
    setPassword('')
  }

  return (
    <div className='container d-flex align-items-center justify-content-center min-vh-100 bg-light'>
      <div className='card shadow p-4' style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className='text-center mb-4'>Login</h2>
        <form onSubmit={submitHandler}>
          <div className='mb-3 row align-items-center'>
            <label htmlFor='email' className='col-sm-4 col-form-label'>Email Address</label>
            <div className='col-sm-8'>
              {/* fixed bootstrap classname to lowercase */}
              <input
                value={email}
                type='email'
                className='form-control'
                id='email'
                placeholder='xyz@example.com'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className='mb-3 row align-items-center'>
            <label htmlFor="password" className='col-sm-4 col-form-label'>Password</label>
            <div className='col-sm-8'>
              <input
                value={password}
                type="password"
                className='form-control'
                id="password"
                placeholder='.......'
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div className='form-check'>
              <input className='form-check-input' type='checkbox' id='remember' />
              <label htmlFor="remember" className='form-check-label'>Remember me</label>
            </div>
            <a href='#' className='text-decoration-none'>Forgot password?</a>
          </div>

          <div className='d-grid'>
            <button type='submit' className='btn btn-primary'>Sign-In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
