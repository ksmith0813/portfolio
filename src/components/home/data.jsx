// Default Theme images
import dashboardData from 'assets/default/json/dashboard-tile-default.json'
import registerData from 'assets/default/json/register-tile-default.json'
import gridData from 'assets/default/json/grid-tile-default.json'
import movieData from 'assets/default/json/movie-tile-default.json'
import listData from 'assets/default/json/list-tile-default.json'
import weatherData from 'assets/default/json/weather-tile-default.json'
import shopData from 'assets/default/json/shop-tile-default.json'
import chartData from 'assets/default/json/chart-tile-default.json'

// Green Theme Images
import dashboardGreenData from 'assets/green/json/dashboard-tile-green.json'
import registerGreenData from 'assets/green/json/register-tile-green.json'
import gridGreenData from 'assets/green/json/grid-tile-green.json'
import movieGreenData from 'assets/green/json/movie-tile-green.json'
import listGreenData from 'assets/green/json/list-tile-green.json'
import weatherGreenData from 'assets/green/json/weather-tile-green.json'
import shopGreenData from 'assets/green/json/shop-tile-green.json'
import chartGreenData from 'assets/green/json/chart-tile-green.json'

// Purple Theme Images
import dashboardPurpleData from 'assets/purple/json/dashboard-tile-purple.json'
import registerPurpleData from 'assets/purple/json/register-tile-purple.json'
import gridPurpleData from 'assets/purple/json/grid-tile-purple.json'
import moviePurpleData from 'assets/purple/json/movie-tile-purple.json'
import listPurpleData from 'assets/purple/json/list-tile-purple.json'
import weatherPurpleData from 'assets/purple/json/weather-tile-purple.json'
import shopPurpleData from 'assets/purple/json/shop-tile-purple.json'
import chartPurpleData from 'assets/purple/json/chart-tile-purple.json'

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
