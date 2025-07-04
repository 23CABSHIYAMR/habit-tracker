import React from 'react'

export default function ProgressBar({progressVal}) {
    
  return (
    <div id='parent-bar' className='rounded-2xl w-full h-3 bg-[#ebf1fc] '>
        <div id='child-bar' className="rounded-2xl bg-blue-500 h-3 transition-w duration-250" style={{width:progressVal+"%"}}></div>
    </div>
  )
}
