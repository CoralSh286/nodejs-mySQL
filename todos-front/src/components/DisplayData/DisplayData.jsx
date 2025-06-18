import React from 'react'
import "./style.css"
export default function DisplayData({ error, loading, data,  children }) {
    if (error) {
        return <div> ERROR ON LOADING DATA {error.message}</div>;
    }
    if (loading) {
        return <div className="data-loading">
            <div className="data-loading-spinner"></div>
        </div>
    }
    if(!data || data.length === 0) {
        <div className="data-empty">
        No data was found. Check back later.
      </div>
    
    }
    return (
        <>
            {children}
        </>
    )
}
