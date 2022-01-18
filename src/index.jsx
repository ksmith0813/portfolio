import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Result } from 'antd'
import { Navigation } from 'components/navigation/navigation'
import { Home } from 'components/home/home'
import { Dashboard } from 'components/dashboard/dashboard'
import { Charts } from './components/charts/charts'
import { Grid } from 'components/grid/grid'
import { Form } from 'components/form/form'
import './index.scss'
import './antd-overrides.scss'
import 'antd/dist/antd.min.css'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='home' element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='grid' element={<Grid />} />
        <Route path='form' element={<Form />} />
        <Route path='charts' element={<Charts />} />
        <Route
          path='*'
          element={
            <main className='page-center'>
              <Result status='404' title='404' subTitle='Sorry, the page you visited does not exist.' />
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
)
