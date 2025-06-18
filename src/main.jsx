import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import { GlobalDataProvider } from './contexts/globalData.jsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalDataProvider>
        <App />
      </GlobalDataProvider>
    </QueryClientProvider>
  </StrictMode>,
)
