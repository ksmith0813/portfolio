import React, { lazy, Suspense } from 'react'
import { changeAntdTheme } from 'mini-dynamic-antd-theme'
import { useSelector } from 'react-redux'
import { getState } from 'store/slices/themeSlice'
import 'antd/dist/antd.min.css'

export const ThemeSelector = ({ children }) => {
  const state = useSelector(getState)
  const DefaultTheme = lazy(() => import('./default/DefaultTheme'))
  const GreenTheme = lazy(() => import('./green/GreenTheme'))

  changeAntdTheme(state.selectedTheme === 'default' ? '#1890ff' : '#13dd9d', '../../../antd-overrides.scss')

  return (
    <>
      <Suspense fallback={<></>}>
        {state.selectedTheme === 'default' && <DefaultTheme />}
        {state.selectedTheme === 'green' && <GreenTheme />}
      </Suspense>
      {children}
    </>
  )
}
