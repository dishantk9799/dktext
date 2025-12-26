import React from 'react'
import { SquarePen, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import { toast } from 'react-toastify';
function NoteCard({ notes, setNotes }) {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "numeric",
            year: "numeric",
        });
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Are you sure to delete this note")) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    }


    return (
        <>{
            notes.map((item) => (
                <div key={item._id} className="card bg-base-200 w-96 shadow-lg">

                    <div className="card-body">
                        <h2 className="card-title text-2xl">{item.title}</h2>
                        <p className='text-secondary-content'>{item.content}</p>
                        <div className="card-actions items-center justify-between mt-5">
                            <div className='text-secondary'>
                                <h1>{formatDate(item.createdAt)}</h1>
                            </div>
                            <div className="card-actions flex gap-5">
                                <button onClick={() => navigate(`/detail/${item._id}`)}><SquarePen className='text-blue-500 hover:text-blue-600 cursor-pointer' /></button>
                                <button onClick={(e) => handleDelete(e, item._id)}><Trash className='text-red-500 hover:text-red-600 cursor-pointer' /></button>
                            </div>
                        </div>
                    </div>

                </div>))
        }</>

    )
}

export default NoteCard;