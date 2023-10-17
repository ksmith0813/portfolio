import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Main } from 'components/navigation/main'
import store from 'store/store'
import { ThemeSelector } from 'themeSelector/themeSelector'
import 'index.scss'
import 'antd-overrides.scss'
import 'antd/dist/antd.min.css'

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
  <Provider store={store}>
    <ThemeSelector>
      <Main />
    </ThemeSelector>
  </Provider>
)
