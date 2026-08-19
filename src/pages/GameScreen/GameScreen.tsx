import Bomb from '../../module/Bomb/Bomb'
import './GameScreen.css'
import { useNavigate } from 'react-router-dom'

type Probs = {
  onEnd: (outcome: 'win' | 'lose') => void
}
function GameScreen({ onEnd }: Probs) {
  const explodeSound = new Audio('../../public/boooom.mp3')

  
  const navigate = useNavigate()

  const goHome = () => {
    explodeSound.play()
    explodeSound.onended = () => {
      navigate('/')  // Navigate to the home screen after the sound finishes
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