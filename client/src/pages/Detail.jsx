import { ArrowBigLeft, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [originalNote, setOriginalNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const fetchnote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote({
          title: response.data.data.title || "",
          content: response.data.data.content || "",
        });
        setOriginalNote({
          title: response.data.data.title || "",
          content: response.data.data.content || "",
        });
      } catch (error) {
        toast.error("Note not found")
      } finally {
        setLoading(false);
      }
    }
    fetchnote();
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }
    if (note.title == originalNote.title && note.content == originalNote.content) {
      toast.info("No changes made");
      return;
    }
    try {
      setSaving(true);
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated");
    } catch (error) {
      toast.error("Error in note update");
    } finally {
      setSaving(false);
      navigate("/");
    }
  }
  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xl bg-base-100 shadow-lg rounded-2xl p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-semibold">Update Note</h2>
          <div>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost btn-sm"
            >
              <ArrowBigLeft />
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-sm text-red-500"
            >
              <Trash />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="form-control w-full flex flex-col gap-3">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              value={note.title}
              onChange={(e) => setNote((prev) => ({ ...prev, title: e.target.value }))}
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
              value={note.content}
              onChange={(e) => setNote((prev) => ({ ...prev, content: e.target.value }))}
              rows={8}
              placeholder="Write your note here..."
              className="textarea textarea-bordered resize-none w-full"
            />
          </div>

          <button onClick={handleUpdate} className="btn btn-primary w-full" type="submit">
            {`${saving ? "Saving..." : "Update note"}`}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Detail;
