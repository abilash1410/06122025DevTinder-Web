import React from 'react'

const ProfileSingleCard = ({photoURL,firstName,About,Gender}) => {
  
    
  return (
    <div className="card bg-base-300 w-96 shadow-sm flex m-4">
        <div className='flex'>
            <figure>
    <img
      src={photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}</h2>
    <p>{About}</p>
     <p>{Gender}</p>

  </div>
        </div>
  
</div>
  )
}

export default ProfileSingleCard
