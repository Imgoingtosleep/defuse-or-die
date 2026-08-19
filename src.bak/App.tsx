import { BrowserRouter } from 'react-router-dom'
import MainPage from './pages/index.tsx'
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <MainPage></MainPage>
    </BrowserRouter>
    </>
  )
}

export default App
