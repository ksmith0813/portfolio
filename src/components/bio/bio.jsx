import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Row } from 'antd'
import kevin from 'assets/Kevin.jpg'
import './bio.scss'

export const Bio = () => {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)

  return (
    <div className={`bio-container ${selectedTheme}`}>
      <div className='description'>
        <Row className='fs-125'>
          <b>Hello!</b>
        </Row>
        <Row>
          I am a passionate Principal Software Engineer with a demonstrated history of success in the computer software
          industry. Strong engineering professional skilled in React, React-Native, Redux, JavaScript, Typescript,
          Node.js, Next.js, SWR, Apollo Client, GraphQL, HTML, SCSS, Tailwind, Nivo, C#, .NET. I love hanging out on the
          beach and getting lost in the woods and canyons. Traveling the world and going on endless adventures will
          always keep me moving forward. Aside from building software applications, I have a passion for making music in
          a home studio, gardening in the summer, naming all my plants, adult lego kits, and also enjoy woodworking in a
          garage shop. Let's build some cool stuff and rock out!
        </Row>
      </div>
      <Avatar className='me-image' src={kevin} alt='' />
    </div>
  )
}
