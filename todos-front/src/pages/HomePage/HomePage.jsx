import React from 'react'
import Header from '../../components/Header/Header'
import './style.css'
import { Outlet } from 'react-router-dom'

export default function HomePage() {
  if(localStorage.getItem("user") === null && window.location.replace("/login")) return null;
  return (
    <>
    <div className="home-page">
      <Header/>
      <div className='pagesContainer'>
    <Outlet/>
      </div>
    </div>
    </>
  )
}