# Portfolio App

![image](https://github.com/ksmith0813/portfolio/blob/main/public/screenshot.png)

## Installation and Setup Instructions

#### Initial Setup:

You will need `node` and `npm` installed globally on your machine.

Clone:

`https://github.com/ksmith0813/portfolio.git`

Installation (have to include --legacy-peer-deps for nivo and lottie modules, for now):

`npm install --legacy-peer-deps`

Create a .env.local file that has all the .env.production config values

#### Create Movie API key

https://www.omdbapi.com/

#### Create Weather API key

https://www.weatherapi.com/docs/

Add the api keys to .env.local

You will need to have a GCP account setup to get the google maps module working.

Click [here](https://developers.google.com/maps/documentation/javascript/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.) to learn about how to setup API keys.

To build app:

`npm run build`

To start app:

`npm run start`

Welcome! This is my portfolio application that contains some cool stuff using the ReactJS Library.

Techstack:

- Latest version of React/React DOM 18

- ReactJS Functional Components

- Redux Toolkit, Redux Forms

- Webpack 5

- react-router-dom 6

- ANT Design

- Theming

- Axios

- SCSS

- Nivo

Page Examples:

- Home page with an introduction about me and tile links to some of the pages.

- Dashboard containing several widgets with different types of data structures.

- Form Registration with multiple steps and validation logic.

- Grid view with filtering, sorting, custom column hiding/reordering.

- Video viewer with a filterable list of titles. Select a title to watch a video with audio.

- List view with an editable todo list.

- Searchable Tree view that highlights matched values.

- Media page with search functionality on movies, shows and games. Allows the user to drill into media details.

- Weather page with search functionality for a location's current weather conditions and forecast.

- Shopping page that allows the user to filter by category and add items to a cart.

- Data visualizations using the nivo.rocks framework (might replace with something that works nicer with React 18).

- Bio page so you can see my skills and a picture of me.

- Theming menu option to change the theme color throughout the application.
