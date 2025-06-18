import React from 'react'
import './style.css'
import { getUser } from '../../helper/localStorageHelper'
export default function WelcomeBack() {
  
    const username = getUser().full_name || 'User'; 
  return (
    <main className="home-content">
    <h1 className="home-title">Hi {username}</h1>
    <div className="home-dashboard">
      <section className="dashboard-card welcome-card">
        <h2>Welcome back !</h2>
        <p>We're glad to see you again. Here's what's new today.</p>
      </section>
      
      
    </div>
  </main>
  )
}
