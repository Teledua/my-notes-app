import React from 'react'
// start

const Sidebar = ({ noteInfo, deleteNote }) => {
 
  return (
    <div className='w-1/4 h-screen border-r-4'>
      <div className='flex justify-between py-5 px-5'>
        <h1 className='m-0 font-bold'>Notes</h1>
        {/* <button className='text-emerald-300'>+ New Note</button> */}
      </div>
      <div className='h-screen overflow-y-scroll'>
        {
          // This is my map for all my note from my sidebar
          // to be able to pass my input from my main note into the sidebar
          // the props controlling this is my noteinfo

          noteInfo.allNotes.map((note)=>(
            <div className={`p-5  hover:bg-emerald-400 hover:text-white`}>
              <div className='flex justify-between'>
                <strong className='truncate'>{note.title}</strong>
                <button type='button' onClick={() => deleteNote(note.id)} className='text-red-500'>Delete</button>
              </div>

            <p className='my-2.5 truncate'>{note.note}</p>
              <small className='text-slate-500 block'>{note.time}</small>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
