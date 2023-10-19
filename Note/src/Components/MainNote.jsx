import React, { useState } from 'react'
import { collection, doc, getDoc, setDoc } from "firebase/firestore";// start
import { db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MainNote = ({ setNoteInfo, noteInfo }) => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
const navigate=useNavigate;
  const notesRef = collection(db, "notes");

  // this is the one handling the saving of note in the side bar
  const saveNote = async (e) => {
    e.preventDefault()
    setNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, loading: true }))
    try {
      console.log(noteInfo.allNotes, 'noteds')
      const data = [...noteInfo.allNotes, {
        id: noteInfo.allNotes.length + 1,
        title,
        note
      }]

      const user = JSON.parse(localStorage.getItem("user"))

      // save to firebase(my database) this save sthe note with the user+his email
      // so this await promise is telling my browser that it hould wait for my code to be added to the databse
      // before returning the note to an empty string and bringing the alert
      // but if it is not successfull it should catch the error
      await setDoc(doc(notesRef, user?.email), {
        notes: data,
      });
      // this is to set the values of my form to empty after i have carried out the save function
  setNote("")
  setTitle("")
      setNoteInfo({ ...noteInfo, allNotes: data, loading: false })
      // setNoteInfo((prevNoteInfo) => ({ allNotes: [...prevNoteInfo.allNotes, { title, note }], loading: false }))

      return alert("Note Added Successfully");

    } catch (error) {
      alert("Error adding document: ", error);
    }
  }

  // This targets the object in the input
  // this is an event created to change the values of my form
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeNote = (e) => {
    setNote(e.target.value)
  }

  
 


  return (
    <div className='h-screen w-full'>
      <form onSubmit={saveNote} className='h-screen border-b-4 p-2.5'>
        <input onChange={handleChangeTitle} className='block w-full h-20 border-4' type="text" name="" required autoFocus value={title} />
        <textarea onChange={handleChangeNote} name="" placeholder='Write something here...' className='h-4/6 w-full border-4 mt-2.5' required value={note} />
         <div className='flex justify-end gap-2 mt-3'>
      <button className='  text-white font-bold bg-red-500 py-2 px-8 rounded-full active:bg-red-300' ><Link to="/">Sign out</Link></button>
      <button className='  text-white font-bold bg-emerald-500 active:bg-emerald-300 py-2 px-10 rounded-full'>Save</button>
      </div>
        
      </form>
     
      {/* <div className='p-3'>
          <h1 className='font-bold'>Title</h1>
          <div>note</div>
    
        </div> */}
    </div>
  )
}

export default MainNote
