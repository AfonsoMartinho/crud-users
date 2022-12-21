import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RootStateProvider } from './StoreContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RootStateProvider>
        <App />
      </RootStateProvider>
  </React.StrictMode>,
)
