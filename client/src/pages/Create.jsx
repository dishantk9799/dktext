import { ArrowBigLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api.js';

function Create() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleclick = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return toast.error("Field is required");
    }

    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      setTitle("");
      setContent("");
      navigate(-1);
    } catch (error) {
      if (error.response?.status === 429) {
        return toast.error("Rate limit, try again later");
      }
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xl bg-base-100 shadow-lg rounded-2xl p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-semibold">Create Note</h2>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm"
          >
            <ArrowBigLeft />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleclick} className="space-y-5">
          <div className="form-control w-full flex flex-col gap-3">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter note title"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full flex flex-col gap-3">
            <label className="label">
              <span className="label-text font-medium">Content</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Write your note here..."
              className="textarea textarea-bordered resize-none w-full"
            />
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Create Note
          </button>
        </form>

      </div>
    </div>
  )
}

export default Create;
