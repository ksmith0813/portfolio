import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import { Main } from 'components/navigation/main'
import 'index.scss'
import 'antd-overrides.scss'
import 'antd/dist/antd.min.css'

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
)
