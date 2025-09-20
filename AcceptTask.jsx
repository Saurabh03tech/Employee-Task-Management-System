import React from 'react'

const AcceptTask = ({data}) => {
  return (
    <div className='flex-shrink-0 w-25 h-100 p-2 rounded-3 bg-danger'>
            <div className='d-flex justify-content-between align-items-center pt-2 px-2'>
                <h3 className='bg-primary fs-5 fw-semibold  rounded-2 px-1 py-1 text-white '>{data.category}</h3>
                <h4 className='fs-6 text-white'>{data.date}</h4>

            </div>
        <h2 className='fs-5 text-light fw-bold fw-semibold ms-2'>{data.title}</h2>
        <p className='text-white fs-7 fw-light ms-2'>{data.description}</p>
        <div className='d-flex justify-content-between mt-2 px-2 py-2'>
            <button className='btn btn-outline-light text-dark fw-4'>Mark as accepted</button>
            <button className='btn btn-outline-light text-dark fw-4'>Mark as failed</button>
        </div>
    </div>
  )
}

export default AcceptTask