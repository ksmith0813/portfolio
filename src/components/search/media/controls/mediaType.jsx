import { useSelector } from 'react-redux'
import { getState as getThemeState } from 'store/slices/themeSlice'
import movieBlue from 'assets/default/movie-default.svg'
import movieGreen from 'assets/green/movie-green.svg'
import moviePurple from 'assets/purple/movie-purple.svg'
import tvBlue from 'assets/default/tv-default.svg'
import tvGreen from 'assets/green/tv-green.svg'
import tvPurple from 'assets/purple/tv-purple.svg'
import gameBlue from 'assets/default/game-default.svg'
import gameGreen from 'assets/green/game-green.svg'
import gamePurple from 'assets/purple/game-purple.svg'

export const MediaType = ({ type }) => {
  const themeState = useSelector(getThemeState)
  const theme = themeState.selectedTheme

  let icon
  switch (type) {
    case 'game':
      icon = (
        <>
          <img
            src={theme === 'default' ? gameBlue : theme === 'green' ? gameGreen : gamePurple}
            className='media-type-icon'
            alt=''
          />
          <span className='media-type-text game'>Game</span>
        </>
      )
      break
    case 'series':
      icon = (
        <>
          <img
            src={theme === 'default' ? tvBlue : theme === 'green' ? tvGreen : tvPurple}
            className='media-type-icon'
            alt=''
          />
          <span className='media-type-text tv'>TV</span>
        </>
      )
      break
    default:
      icon = (
        <>
          <img
            src={theme === 'default' ? movieBlue : theme === 'green' ? movieGreen : moviePurple}
            className='media-type-icon'
            alt=''
          />
          <span className='media-type-text movie'>Movie</span>
        </>
      )
      break
  }
  return icon
}
