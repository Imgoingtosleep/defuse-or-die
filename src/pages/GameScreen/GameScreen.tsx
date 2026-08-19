import Bomb from '../../module/Bomb/Bomb'
import './GameScreen.css'
import { useNavigate } from 'react-router-dom'

type Probs = {
  onEnd: (outcome: 'win' | 'lose') => void
}
function GameScreen({ onEnd }: Probs) {
  const navigate = useNavigate()

  const goHome = () => {
    try {
      const base = import.meta.env.BASE_URL || '/'
      const explodeSound = new Audio(`${base}boooom.mp3`)
      explodeSound.play().catch(() => {})
      explodeSound.onended = () => {
        navigate('/')
      }
      // Fallback in case audio is blocked or fails
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch {
      navigate('/')
    }
  }

  const handleDefuse = () => {
    // alert("Nice gg refresh เองละกันทำปุ่มย้อนไม่ทัน")
    navigate('/')  // Navigate to the home screen after defuse
  }
  
  return (
    <>
      <Bomb onDefuse={handleDefuse} onExplode={goHome}></Bomb>
    </>
    
  )
}

export default GameScreen