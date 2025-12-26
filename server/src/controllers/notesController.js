import { Note } from "../models/Note.model.js"


// GetAllNotes
export const GetAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); //new first
        
        res.status(200).json({
            success: true,
            message: "All Note are received successfully",
            data: notes
        });
    } catch (error) {
        console.error("GetAllNotes Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// GetNoteById
export const GetNoteById = async (req, res) => {
    try {
        const getnote = await Note.findById(req.params.id);

        if (!getnote) return res.status(404).json({
            success: false, message: "Note not found"
        });

        res.status(200).json({
            success: true,
            message: "Note found successfully",
            data: getnote
        })

    } catch (error) {
        console.log("GetNoteById Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// CreateNotes
export const CreateNotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).json({
                success: false,
                message: "Title and content are required",
            });
        }

        const newNote = await Note.create({ title, content })

        res.status(201).json({
            success: true,
            message: "Note is created successfully",
            data: newNote
        })
    } catch (error) {
        console.error("CreateNote Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// UpdateNotes
export const UpdateNotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).json({
                success: false,
                message: "Title and Content is required"
            });
        }

        const updatenote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        if (!updatenote) return res.status(404).json({
            success: false,
            message: "Note not found"
        })

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
        });

    } catch (error) {
        console.error("UpdateNotes Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// DeleteNotes
export const DeleteNotes = async (req, res) => {
    try {
        const deletenote = await Note.findByIdAndDelete(req.params.id);
        if (!deletenote) return res.status(404).json({
            success: false,
            message: "Note not found"
        });
        res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.log("DeleteNotes error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}
