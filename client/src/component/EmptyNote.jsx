import { NotebookPen } from "lucide-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmptyNotes() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center text-center gap-4 text-gray-500">
            <NotebookPen size={48} />
            <h2 className="text-xl font-semibold">No notes yet</h2>
            <p className="text-sm max-w-xs">
                You haven't created any notes yet. Start by adding a new one.
            </p>
            <button
                onClick={() => navigate("/create")}
                className="btn btn-primary flex gap-2"
            >
                <Plus size={18} />
                Create Note
            </button>
        </div>
    );
}

export default EmptyNotes;
