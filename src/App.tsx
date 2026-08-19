import { HashRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import './App.css'

function App() {
  return (
    <>
    <HashRouter>
      <MainPage></MainPage>
    </HashRouter>
    </>
  )
}

export default App
