import React, { useEffect, useState } from 'react'
import InfoCard from '../../components/InfoCard/InfoCard'
import "./style.css"
import { getUser } from '../../helper/localStorageHelper'

export default function InfoPage() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      setUserData(getUser())
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="info-page loading">Loading user information...</div>
  }

  if (!userData) {
    return <div className="info-page error">No user information available. Please log in.</div>
  }
  
  // Get initials for avatar
  const getInitials = () => {
    if (!userData.full_name) return '?';
    return userData.full_name
      .split(' ')
      .map(full_name => full_name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Define sections for display
  const sections = [
    {
      title: 'Personal Information',
      data: {
        fullName: userData.full_name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        street: userData.street,
        city: userData.city,
        companyName: userData.company_name,
      }
    },
   
  ];

  return (
    <div className="info-page">
      <h1 className="info-page__title">User Information</h1>
      
      <div className="info-card">
        <div className="info-card__header">
          <div className="info-card__avatar">
            {getInitials()}
          </div>
          <h2 className="info-card__name">{userData.name}</h2>
          <span className="info-card__username">@{userData.username}</span>
        </div>
        
        {/* Use a loop to render the sections */}
        {sections.map((section, index) => (
          <InfoCard 
            key={index}
            title={section.title}
            data={section.data}
          />
        ))}
      </div>
    </div>
  )
}