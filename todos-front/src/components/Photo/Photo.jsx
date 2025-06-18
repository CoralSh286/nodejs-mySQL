import React from 'react'
import "./style.css"

export default function Photo({title, url,id, thumbnailUrl , selected , setSelected}) {
    const onSelectPhoto = () => {
    if(selected?.id === id) setSelected(null); // If already selected, deselect it
    else
    setSelected({id, title});
  }
  return (
    <div  className={`photo-card${selected?.id === id ? ' selected' : ''}`} onClick={onSelectPhoto}>
      <div className="photo-info">  
        <h3 className="photo-title">{title}</h3>
        <img src={thumbnailUrl} alt={thumbnailUrl} />
      </div>
    </div>
  )
}