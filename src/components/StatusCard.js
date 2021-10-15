import React from 'react'

function StatusCard(props){
    return (
        <>
           <div className="bg-white status-card p-9 shadow-lg rounded-xl">
              <div>{props.status}</div>
           </div>
        </>
    )
}

export default StatusCard