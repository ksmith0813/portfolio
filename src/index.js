import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'store/store'
import { ThemeSelector } from 'themeSelector/themeSelector'
import { Main } from 'components/navigation/main'
import 'index.scss'
import 'antd-overrides.scss'
import 'antd/dist/antd.min.css'

ReactDOM.render(
  <Provider store={store}>
    <ThemeSelector>
      <Main />
    </ThemeSelector>
  </Provider>,
  document.getElementById('app')
)
