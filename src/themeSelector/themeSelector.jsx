import React, { lazy, Suspense } from 'react'
import { changeAntdTheme } from 'mini-dynamic-antd-theme'
import { useSelector } from 'react-redux'
import 'antd/dist/antd.min.css'

export const ThemeSelector = ({ children }) => {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme)
  const DefaultTheme = lazy(() => import('./default/DefaultTheme'))
  const GreenTheme = lazy(() => import('./green/GreenTheme'))
  const PurpleTheme = lazy(() => import('./purple/PurpleTheme'))

  const themeColor = selectedTheme === 'default' ? '#1890ff' : selectedTheme === 'green' ? '#13dd9d' : '#b038e3'

  changeAntdTheme(themeColor, '../../../antd-overrides.scss')

  return (
    <>
      <Suspense fallback={<></>}>
        {selectedTheme === 'default' && <DefaultTheme />}
        {selectedTheme === 'green' && <GreenTheme />}
        {selectedTheme === 'purple' && <PurpleTheme />}
      </Suspense>
      {children}
    </>
  )
}
