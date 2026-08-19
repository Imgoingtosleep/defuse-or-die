type Props = {
  result : 'win' | 'lose' | null
  onRestart : () => void
}

function ResultScreen({result, onRestart}: Props) {
  return <h1>ResultScreen</h1>
}

export default ResultScreen
