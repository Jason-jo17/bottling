import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './styles/globals.css'
import { useUIStore } from './stores/useUIStore'

// Initialize dark mode from system preference
function AppWrapper() {
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
      useUIStore.setState({ isDarkMode: true })
    }
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)
