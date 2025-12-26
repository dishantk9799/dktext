import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
function Navbar() {
    return (
        <div className="navbar px-5 bg-accent">
            <div className="navbar-start">
                <a className=" font-bold text-2xl tracking-wide">dktext</a>
            </div>

            <div className="navbar-end flex">
                <Link to={'/create'} className='btn flex  items-center justify-center gap-2 bg-primary-content py-2 px-3 rounded-full'>
                    <Plus size={18} />
                    <h1>New Note</h1>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
