import React from 'react'
import me from 'assets/Kevin.jpg'
import signature from 'assets/signature.png'
import './home.scss'

export const Home = () => {
  return (
    <>
      <div className='page-center'>
        <div className='home-cover-image' />
        <div className='bio-container'>
          <div className='description pl-150 pr-150 pt-150 mr-200'>
            <span className='fs-125'>
              <b>Bio</b>
            </span>
            <div className='bio-signature'>
              Experienced Software Engineer with a demonstrated history of success in the computer software industry.
              Strong engineering professional skilled in React, JavaScript, HTML, CSS, C#, .NET, Python, MongoDB, SQL
              Server. I love getting lost in the woods and canyons. Traveling the world and going on endless adventures
              will forever keep me moving forward. Music has always been and always will be a big part of my life. I am
              lucky enough to have a home music studio enabling me to write, create, and record my own music. Let's
              crank some code and rock out!
              <img className='signature pt-050' src={signature} alt='' />
            </div>
          </div>
          <img className='me-image' src={me} alt='' />
        </div>
      </div>
    </>
  )
}
