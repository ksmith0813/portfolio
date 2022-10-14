import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Row } from 'antd'
import { getState } from 'store/slices/themeSlice'
import kevin from 'assets/Kevin.jpg'
import './bio.scss'

export const Bio = () => {
  const state = useSelector(getState)

  return (
    <div className={`bio-container ${state.selectedTheme}`}>
      <div className='description'>
        <Row className='fs-125'>
          <b>Hello!</b>
        </Row>
        <Row>
          I am a passionate Software Developer with a demonstrated history of success in the computer software industry.
          Strong engineering professional skilled in React, React-Native, Redux, JavaScript, Typescript, Next.js, SWR,
          Apollo Client, GraphQL, HTML, SCSS, Tailwind, Nivo, C#, .NET. I love hanging out on the beach and getting lost
          in the woods and canyons. Traveling the world and going on endless adventures will always keep me moving
          forward. Aside from building software applications, I have a passion for making music in my home studio,
          gardening in the summer, naming all my plants, adult lego kits, and also enjoy doing a little bit of carpentry
          work. Let's build some cool stuff and rock out!
        </Row>
      </div>
      <Avatar className='me-image' src={kevin} alt='' />
    </div>
  )
}
