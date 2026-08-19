import { Link } from "react-router-dom";

type Props = {
  onStart: () => void;
};

function HomeScreen({ onStart }: Props) {
  return (
    <div className="home-screen">
      <h1>Defuse the Bomb!</h1>
      <Link to="/game"> {/* Add the 'to' prop to specify the navigation target */}
        <button onClick={onStart}>Start Game</button>
      </Link>
    </div>
  );
};

export default HomeScreen;
