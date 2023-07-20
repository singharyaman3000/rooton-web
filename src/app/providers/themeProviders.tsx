
'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

const DarkThemeProvider = ({ children }: { children: React.ReactNode })=> {
    return (
      <ThemeProvider defaultTheme='dark' >
        {children}
      </ThemeProvider>
    )
  }

  export default DarkThemeProvider