import React from 'react'
import kevin from 'assets/kevin.jpg'
import signature from 'assets/signature.png'
import './home.scss'

export const Home = () => (
  <div className='page-center'>
    <div className='home-cover-image' />
    <div className='bio-container'>
      <div className='description'>
        <span className='fs-125'>
          <b>Bio</b>
        </span>
        <div className='bio-signature'>
          Experienced Software Engineer with a demonstrated history of success in the computer software industry. Strong
          engineering professional skilled in React, JavaScript, HTML, CSS, C#, .NET, Python, MongoDB, SQL Server. I
          love hanging out on the beach and getting lost in the woods and canyons. Traveling the world and going on
          endless adventures will forever keep me moving forward. Music has always been and always will be a big part of
          my life. I am lucky enough to have a home music studio enabling me to write, create, and record my own music.
          Let's crank some code and rock out!
          <img className='signature' src={signature} alt='' />
        </div>
      </div>
      <img className='me-image' src={kevin} alt='' />
    </div>
  </div>
)
