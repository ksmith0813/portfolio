import { useSelector } from 'react-redux'
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
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)
  const isDefaultTheme = selectedTheme === 'default'
  const isGreenTheme = selectedTheme === 'green'
  const mediaTypeIconClass = 'media-type-icon'
  const mediaTypeTextClass = 'media-type-text'
  let icon

  switch (type) {
    case 'game':
      icon = (
        <>
          <img
            src={isDefaultTheme ? gameBlue : isGreenTheme ? gameGreen : gamePurple}
            className={mediaTypeIconClass}
            alt=''
          />
          <span className={`${mediaTypeTextClass} game`}>Game</span>
        </>
      )
      break
    case 'series':
      icon = (
        <>
          <img
            src={isDefaultTheme ? tvBlue : isGreenTheme ? tvGreen : tvPurple}
            className={mediaTypeIconClass}
            alt=''
          />
          <span className={`${mediaTypeTextClass} tv`}>TV</span>
        </>
      )
      break
    default:
      icon = (
        <>
          <img
            src={isDefaultTheme ? movieBlue : isGreenTheme ? movieGreen : moviePurple}
            className={mediaTypeIconClass}
            alt=''
          />
          <span className={`${mediaTypeTextClass} movie`}>Movie</span>
        </>
      )
      break
  }
  return icon
}
