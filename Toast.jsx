import React from 'react'

const Toast = ({data}) => {
  return (
    <div>
        <div className="toast toast-center toast-middle">
        <div className="alert alert-success">
            <span>{data}</span>
        </div>
    </div>
    </div>
  )
}

export default Toast
