import React, { useState } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';

export default function Post({id, title, body, selected, setSelected}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const onSelectPost = () => {
    if(selected?.id === id) setSelected(null); // If already selected, deselect it
    else
    setSelected({id, title, body});
  }
  
  const handleCommentsClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div className={`post-card${selected?.id === id ? ' selected' : ''}`} onClick={onSelectPost}>
      <div className="post-card__header">
        <h2 className="post-card__title">{title}</h2>
        <span className="post-card__id">#{id}</span>
      </div>
      
      <div className="post-card__actions">
        <button 
          className={`post-card__toggle ${isExpanded ? 'expanded' : ''}`} 
          onClick={toggleExpand}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
        
        <Link 
          to={`${id}/comments`} 
          className="post-card__comments-link"
          onClick={handleCommentsClick}
        >
          View Comments
        </Link>
      </div>
      
      <div className={`post-card__body ${isExpanded ? 'expanded' : ''}`}>
        <p>{body}</p>
      </div>
    </div>
  )
}