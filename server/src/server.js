// import modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
// import js
import notesRoute from './routes/notesRoute.js';
import connectDB from './db/db.js';
import { rateLimiter } from './middleware/rateLimiter.js';


// configure
dotenv.config();
const app = express();
const __dirname = path.resolve()

//middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
app.use(rateLimiter);

// database connection


// variable
const PORT = process.env.PORT || 5001;

// routes
app.use('/api/notes', notesRoute);


// production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
    })
}

// server
await connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("✅ server is created.");
        console.log("👉 URL: http://localhost:5001/api/notes");
    })
})

