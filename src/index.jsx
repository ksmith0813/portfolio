import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App } from './App'
import { Charts } from './routes/charts'
import { Invoices } from './routes/invoices'
import { Invoice } from './routes/invoice'
import './index.scss'
import 'antd/dist/antd.min.css'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='invoices' element={<Invoices />}>
          <Route
            index
            element={
              <main style={{ padding: '1rem' }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=':invoiceId' element={<Invoice />} />
        </Route>
        <Route path='charts' element={<Charts />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app')
)
