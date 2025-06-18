import React from 'react'
import "./style.css"

export default function DeletePopUp({ title, id, onDelete, onClose }) {
  const handleDelete = () => {
    onDelete(id);
    onClose();
  };

  return (
    <div className="delete-popup">
      <div className="delete-popup__content">
        <h3 className="delete-popup__title">Confirm Deletion</h3>
        
        <p className="delete-popup__message">
          Are you sure you want to delete this item
          {title && <span className="delete-popup__item-name"> "{title}"</span>}?
        </p>
        
        <div className="delete-popup__buttons">
          <button 
            className="delete-popup__btn delete-popup__btn--cancel" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="delete-popup__btn delete-popup__btn--delete" 
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
