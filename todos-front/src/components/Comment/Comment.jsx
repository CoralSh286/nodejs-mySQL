import React from 'react' 
import "./style.css"

export default function Comment({data, selected , setSelected}) {
  const handleClick = () => {
    if (selected?.id === data.id) {
      setSelected(null);
    } else {
      setSelected(data);
    }
  }
  return (
    <div onClick={handleClick} className={`comment${selected?.id === data.id ? ' selected' : ''}`}>
      <div className="comment-header">
        <h3 className="comment-name">{data.name}</h3>
        <span className="comment-email">{data.email}</span>
      </div>
      <p className="comment-body">{data.body}</p>
    </div>
  )
}