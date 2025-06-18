import React from 'react'
import "./style.css"
export default function PageHeader({title}) {
  return (
    <header className="page-header">
    <h1 className="page-title">{title}</h1>
  </header>
  )
}
