import './App.css'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { SimulatorPage } from './pages/SimulatorPage'
import { ChatbotPage } from './pages/ChatbotPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="simulator" element={<SimulatorPage />} />
        <Route path="chat" element={<ChatbotPage />} />
      </Route>
    </Routes>
  )
}

export default App
