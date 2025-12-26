import React from 'react'

function LimitRate() {
    return (

        <div className="hero">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Rate Limit Reached</h1>
                    <p className="py-6 text-secondary-content">
                        You've made too many requests in a short period. Please wait a moment.
                    </p>
                    
                </div>
            </div>
        </div>

    )
}

export default LimitRate
