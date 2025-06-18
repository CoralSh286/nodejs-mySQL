// usePopup.jsx
import React, { createContext, useState, useContext } from 'react';
import "./style.css"

const PopupContext = createContext(null);
 
// Context provider
export const PopupProvider = ({ children }) => {
  // Whether the popup is displayed
  const [isOpen, setIsOpen] = useState(false);
  
  // Popup content - can be any component
  const [content, setContent] = useState(null);
  
  // Popup title (optional)
  const [title, setTitle] = useState('');
  
  // Whether to close on outside click
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(true);
  
  // Open popup function
  const openPopup = ({
    content,
    title = '',
    closeOnOutsideClick = true,

  }) => {
    setContent(content);
    setTitle(title);
    setCloseOnOutsideClick(closeOnOutsideClick);
    setIsOpen(true);
  };

  // Close popup function
  const closePopup = () => {
    setIsOpen(false);
    // Clear content after closing popup and closing animation
    setTimeout(() => {
      setContent(null);
    }, 300);
  };

  // Handle outside click
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  // Value provided to context consumers
  const value = {
    isOpen,
    content,
    title,
    openPopup,
    closePopup
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
      {isOpen && (
        <div 
          className={`popup-overlay center`} 
          onClick={handleOutsideClick}
        >
          <div 
            className={`popup-container`}>
            <div className="popup-content">
              {content}
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

// Custom hook for using the context
export const usePopup = () => {
  const context = useContext(PopupContext);
  
  if (!context) {
    throw new Error('usePopup must be used within PopupProvider');
  }
  
  return context;
};