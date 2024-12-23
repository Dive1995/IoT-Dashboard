// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import MqttContextProvider from './context/MqttContextProvider'

createRoot(document.getElementById('root')!).render(

    <Router>
      <MqttContextProvider>
      <App />
      </MqttContextProvider>
    </Router>

)
