import React from 'react'
import { FaSearch } from "react-icons/fa";
import './style.css'
import Input from '../Input/Input'

export default function SearchBar({ onSubmit, addCompleat }) {
    const searchHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get('title')
        const id = formData.get('id')
        const isCompleat = formData.get('isCompleat') === 'on'
        const isCompleatKey = isCompleat ? {isCompleat: true} : {}
        onSubmit({ title, id, ...isCompleatKey })
    }
    
    return (
        <div className="search-bar-container">
            <form onSubmit={searchHandler} className="search-form">
                <div className="search-inputs-row ">
                    <Input 
                        placeholder={"search by Title"} 
                        name={"title"} 
                        className="search-input"
                    />
                    <Input 
                        placeholder={"search by Id"} 
                        name={"id"} 
                        className="search-input"
                    />
                    {addCompleat && (
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                name="isCompleat" 
                                id="isCompleat" 
                                className="complete-checkbox"
                            />
                            <label htmlFor="isCompleat">Compleat</label>
                        </div>
                    )}
                </div>
                <button type="submit" className="search-button">
                    <FaSearch className="search-icon" />
               
                </button>
            </form>
        </div>
    )
}