import React from 'react'
import kevin from 'assets/kevin.jpg'
import signature from 'assets/signature.png'
import './about.scss'

export const About = () => (
  <div className='about'>
    <div className='banner'>
      <div className='title'>Bio.</div>
      <div className='description'>Software Developer, musician, and world traveler.</div>
    </div>
    <div className='bio-container'>
      <div className='description'>
        <span className='fs-125'>
          <b>Hello!</b>
        </span>
        <div className='bio-signature'>
          I am a passionate Software Developer with a demonstrated history of success in the computer software industry.
          Strong engineering professional skilled in React, Redux, JavaScript, HTML, CSS, C#, .NET, Python, SQL Server,
          and MongoDB. I love hanging out on the beach and getting lost in the woods and canyons. Traveling the world
          and going on endless adventures will always keep me moving forward. Aside from building software applications,
          I have a passion for making music in my home studio. Let's crank some code and rock out!
          <img className='signature' src={signature} alt='' />
        </div>
      </div>
      <img className='me-image' src={kevin} alt='' />
    </div>
  </div>
)
