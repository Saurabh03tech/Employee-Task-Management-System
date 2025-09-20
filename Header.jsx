// src/components/other/Header.jsx
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = (props) => {
  const logOutUser = () => {
    localStorage.removeItem('loggedInUser') // remove
    props.changeUser(null)
  }

  const userName = props.data ? `${props.data.firstname} ${props.data.lastname || ''}` : "Admin"

  return (
    <>
      <div className='d-flex justify-content-between align-items-end mb-3'>
        <div>
          <h1 className='fs-3'>
            Hello <br />
            <span className='fs-1 fw-bold'>{userName}</span> 👋
          </h1>
        </div>

        <div className='d-flex align-items-center'>
          {props.data ? (
            <button className='btn btn-outline-secondary me-2' onClick={() => props.onProfileClick && props.onProfileClick()}>
              Profile
            </button>
          ) : null}
          <button onClick={logOutUser} className='btn btn-outline-danger'>Log Out</button>
        </div>
      </div>
    </>
  )
}

export default Header
