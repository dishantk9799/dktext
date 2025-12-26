import express from 'express';
import { CreateNotes, DeleteNotes, GetAllNotes, GetNoteById, UpdateNotes } from '../controllers/notesController.js';

const route = express.Router();

route.get('/', GetAllNotes);
route.get('/:id', GetNoteById);
route.post('/', CreateNotes);
route.put('/:id', UpdateNotes);
route.delete('/:id', DeleteNotes);

export default route;