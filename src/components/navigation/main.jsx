import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Result } from 'antd'
import { Navigation } from 'components/navigation/navigation'
import { Home } from 'components/home/home'
import { Dashboard } from 'components/dashboard/dashboard'
import { Register } from 'components/register/register'
import { Grid } from 'components/grid/grid'
import { Shop } from 'components/shop/shop'
import { Visuals } from 'components/visuals/visuals'
import { About } from 'components/about/about'

export const Main = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='home' element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='register' element={<Register />} />
        <Route path='grid' element={<Grid />} />
        <Route path='shop' element={<Shop />} />
        <Route path='visuals' element={<Visuals />} />
        <Route path='about' element={<About />} />
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
  </BrowserRouter>
)
