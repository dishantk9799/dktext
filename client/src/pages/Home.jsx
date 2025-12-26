import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../component/Navbar';
import axios from 'axios';
import LimitRate from '../component/LimitRate';
import NoteCard from '../component/NoteCard';
import api from '../utils/api.js';
import EmptyNote from '../component/EmptyNote.jsx';


function Home() {
  const [loading, setLoading] = useState(true);
  const [ratelimit, setRatelimit] = useState(false);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getnotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data.data);
        setRatelimit(false);
      } catch (error) {
        console.log(error.message);
        if (error.response?.status === 429) {
          setRatelimit(true)
        } else {
          toast.error("Failed to load notes")
        }
      } finally {
        setLoading(false);
      }
    }
    getnotes();
  }, []);
  return (
    <div className='w-full h-screen flex flex-col'>
      <Navbar />
      <div className='flex justify-center items-center flex-1 p-10'>
        {loading && (<span className="loading loading-spinner loading-lg" />)}
        {!loading && ratelimit && <LimitRate />}
        {!loading && !ratelimit && notes.length === 0 && <EmptyNote />}
        {!loading && !ratelimit && notes.length > 0 && (
          <div className='flex gap-10 justify-center items-center flex-wrap'>
            <NoteCard notes={notes} setNotes={setNotes} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
