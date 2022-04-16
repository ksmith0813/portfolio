// Default Theme images
import dashboardData from 'assets/default/dashboard-tile-default.json'
import registerData from 'assets/default/register-tile-default.json'
import gridData from 'assets/default/grid-tile-default.json'
import movieData from 'assets/default/movie-tile-default.json'
import listData from 'assets/default/list-tile-default.json'
import weatherData from 'assets/default/weather-tile-default.json'
import shopData from 'assets/default/shop-tile-default.json'
import chartData from 'assets/default/chart-tile-default.json'

// Green Theme Images
import dashboardGreenData from 'assets/green/dashboard-tile-green.json'
import registerGreenData from 'assets/green/register-tile-green.json'
import gridGreenData from 'assets/green/grid-tile-green.json'
import movieGreenData from 'assets/green/movie-tile-green.json'
import listGreenData from 'assets/green/list-tile-green.json'
import weatherGreenData from 'assets/green/weather-tile-green.json'
import shopGreenData from 'assets/green/shop-tile-green.json'
import chartGreenData from 'assets/green/chart-tile-green.json'

// Purple Theme Images
import dashboardPurpleData from 'assets/purple/dashboard-tile-purple.json'
import registerPurpleData from 'assets/purple/register-tile-purple.json'
import gridPurpleData from 'assets/purple/grid-tile-purple.json'
import moviePurpleData from 'assets/purple/movie-tile-purple.json'
import listPurpleData from 'assets/purple/list-tile-purple.json'
import weatherPurpleData from 'assets/purple/weather-tile-purple.json'
import shopPurpleData from 'assets/purple/shop-tile-purple.json'
import chartPurpleData from 'assets/purple/chart-tile-purple.json'

export const data = (page) => {
  let data = {
    containerClass: page,
    file: {
      dashboard: {
        default: dashboardData,
        green: dashboardGreenData,
        purple: dashboardPurpleData,
      },
      register: {
        default: registerData,
        green: registerGreenData,
        purple: registerPurpleData,
      },
      grid: {
        default: gridData,
        green: gridGreenData,
        purple: gridPurpleData,
      },
      video: {
        default: movieData,
        green: movieGreenData,
        purple: moviePurpleData,
      },
      list: {
        default: listData,
        green: listGreenData,
        purple: listPurpleData,
      },
      'search/weather': {
        default: weatherData,
        green: weatherGreenData,
        purple: weatherPurpleData,
      },
      shop: {
        default: shopData,
        green: shopGreenData,
        purple: shopPurpleData,
      },
      visuals: {
        default: chartData,
        green: chartGreenData,
        purple: chartPurpleData,
      },
    },
  }

  return data
}
