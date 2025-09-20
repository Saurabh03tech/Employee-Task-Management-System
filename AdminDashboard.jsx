import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const AdminDashboard = (props) => {
    return (
        <div className='p-4 bg-danger-subtle min-vh-100'>
            <Header changeUser={props.changeUser}/>
            <CreateTask/>
            <AllTask/>
        </div>
    )
}

export default AdminDashboard