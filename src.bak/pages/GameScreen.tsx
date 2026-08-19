import Bomb from '../components/Bomb'
import '../styles/GameScreen.css'
type Probs = {
  onEnd: (outcome: 'win' | 'lose') => void
}
function GameScreen({ onEnd }: Probs) {
  return (
    <>
      <h1>GameScreen</h1>
      <Bomb onDefuse={() => {alert("win")}} onExplode={() => {alert("SO NOOB")}}></Bomb>
    </>
  )
}

export default GameScreen
