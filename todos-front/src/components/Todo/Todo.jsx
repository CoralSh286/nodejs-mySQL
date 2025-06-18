import React, { useState } from 'react'
import "./style.css"

export default function Todo({ title, id, completed , selected , setSelected}) {
  const onSelectTodo = () => {
    if(selected?.id == id) setSelected(null);
    else
    setSelected({id , title , completed});
  }
    
  return (
    <div onClick={onSelectTodo} className={`todo-card${completed ? ' completed' : ''} ${selected?.id == id ? ' selected' : ''}`}>
      <div className="todo-card__content">
        <div className="todo-card__details">
          <h3 className="todo-card__title">{title}</h3>
          <span className="todo-card__id">#{id}</span>
        </div>
      </div>
    </div>
  )
}