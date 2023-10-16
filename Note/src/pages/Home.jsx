import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import MainNote from '../Components/MainNote'
import { db } from '../firebase-config'
import { Navigate, useNavigate } from 'react-router-dom'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'


const Home = () => {
 const currentDateTime = new Date().toLocaleString();
// This usestate is the one getting my notes from the main and updating on the side bar
// so i open an empty array for allNotes and set my loading to true
  const [noteInfo, setNoteInfo] = useState({
    allNotes: [],
    loading: true,
  });

  const user = JSON.parse(localStorage.getItem("user"));
const navigate = useNavigate();

  const getAllNotes = async () => {
    setNoteInfo({ ...noteInfo, loading: true })
    try {
      const docRef = doc(db, "notes", user?.email);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return alert("No such document!");
      console.log(docSnap.data())

      // If there is a document, Set it into our all notes variable
      setNoteInfo({
        ...noteInfo,
        allNotes: docSnap.data().notes,
        loading: false
      });

      return docSnap.data().notes;
    } catch (error) {
      console.log(error)
      setNoteInfo({
        ...noteInfo,
        loading: false
      });

    }
  }

  // this is a handler for our delete button
  // we will pass in th e props to our sidebar
  // this gets the id of the object we want to delete 
  // and it deletes the note from our collection
  // 
  const deleteNote = async (id) => {
    const filteredNotes = noteInfo.allNotes.filter((note) => note.id !== id)
    // setNoteInfo((prevNoteInfo) => ({ ...prevNoteInfo, loading: true }))
    setNoteInfo({ ...noteInfo, loading: true })

    const notesRef = collection(db, "notes");

    
// this enables you to get data from the browser from the local storage
// Kind of works like a cache
    const user = JSON.parse(localStorage.getItem("user"))


    try {
      await setDoc(doc(notesRef, user?.email), {
        notes: filteredNotes,
      });

      setNoteInfo({ ...noteInfo, allNotes: filteredNotes, loading: false })


      // setNoteInfo((prevNoteInfo) => ({ allNotes: filteredNotes, loading: false }))

      return alert("Note Deleted Successfully");

    } catch (error) {
      console.log(error)
      alert("Error deleting document: ", error);
    }
  }


// This use Effect is explaining that when a user hasnt signed in he should be navigated to the home page
useEffect(() =>{
  const tempUser = localStorage.getItem('user');
  if(!tempUser){
    navigate('/')
  }
},[])

  useEffect(() => {
    if (user) {
      getAllNotes()
    }
  }, [])
  return (
    <>
      <div className='flex overflow-hidden h-screen w-full'>
        <Sidebar noteInfo={noteInfo} setNoteInfo={setNoteInfo} deleteNote={deleteNote} />
        <MainNote noteInfo={noteInfo} setNoteInfo={setNoteInfo} />
      </div>
    </>
  )
}

export default Home
