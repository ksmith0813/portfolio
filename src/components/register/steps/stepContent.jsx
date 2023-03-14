import { useSelector } from 'react-redux'
import Contact from './contact'
import Movie from './movie'
import Music from './music'
import { Review } from './review'
import Travel from './travel'
import contactBlue from 'assets/default/contact-default.svg'
import contactGreen from 'assets/green/contact-green.svg'
import contactPurple from 'assets/purple/contact-purple.svg'
import movie from 'assets/movie.svg'
import movieBlue from 'assets/default/movie-default.svg'
import movieGreen from 'assets/green/movie-green.svg'
import moviePurple from 'assets/purple/movie-purple.svg'
import music from 'assets/music.svg'
import musicBlue from 'assets/default/music-default.svg'
import musicGreen from 'assets/green/music-green.svg'
import musicPurple from 'assets/purple/music-purple.svg'
import beach from 'assets/beach.svg'
import beachBlue from 'assets/default/beach-default.svg'
import beachGreen from 'assets/green/beach-green.svg'
import beachPurple from 'assets/purple/beach-purple.svg'
import info from 'assets/info.svg'
import infoBlue from 'assets/default/info-default.svg'
import infoGreen from 'assets/green/info-green.svg'
import infoPurple from 'assets/purple/info-purple.svg'

export const StepContent = () => {
  const step = useSelector((state) => state.register.step)
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)
  const isDefaultTheme = selectedTheme === 'default'
  const isGreenTheme = selectedTheme === 'green'
  const registerIconClass = 'register-icon'
  return [
    {
      title: 'Contact',
      content: <Contact />,
      icon: (
        <img
          src={isDefaultTheme ? contactBlue : isGreenTheme ? contactGreen : contactPurple}
          className={registerIconClass}
          alt=''
        />
      ),
    },
    {
      title: 'Movies',
      content: <Movie />,
      icon: (
        <img
          src={step < 1 ? movie : isDefaultTheme ? movieBlue : isGreenTheme ? movieGreen : moviePurple}
          className={registerIconClass}
          alt=''
        />
      ),
    },
    {
      title: 'Music',
      content: <Music />,
      icon: (
        <img
          src={step < 2 ? music : isDefaultTheme ? musicBlue : isGreenTheme ? musicGreen : musicPurple}
          className={registerIconClass}
          alt=''
        />
      ),
    },
    {
      title: 'Travel',
      content: <Travel />,
      icon: (
        <img
          src={step < 3 ? beach : isDefaultTheme ? beachBlue : isGreenTheme ? beachGreen : beachPurple}
          className={registerIconClass}
          alt=''
        />
      ),
    },
    {
      title: 'Review',
      content: <Review />,
      icon: (
        <img
          src={step < 4 ? info : isDefaultTheme ? infoBlue : isGreenTheme ? infoGreen : infoPurple}
          className={registerIconClass}
          alt=''
        />
      ),
    },
  ]
}
