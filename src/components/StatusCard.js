import React from 'react'

function StatusCard(props){
    return (
        <>
           <div className="bg-white status-card flex items-center justify-content p-9 shadow-lg rounded-xl">
              <div className="font-extrabold">{props.status}</div>
           </div>
        </>
    )
}

export default StatusCard