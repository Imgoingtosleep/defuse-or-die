import { Link } from "react-router-dom";
import './HomeScreen.css'; // Ensure to import the CSS

type Props = {
  onStart: () => void;
};

function HomeScreen({ onStart }: Props) {
  return (
    <div className="home-screen">
      <div className="home-box">
        <h1 className="title">Defuse Or Die</h1>
        <div className="button-container">
          <Link to="/game" className="play-button">
            <button onClick={onStart}>
              PLAY GAME
            </button>
          </Link>

          <Link to="/manual" className="manual-button">
            <button >MANUAL</button>
          </Link>
          <a href="../../public/manuel.pdf" download className="download-button">
            <button >
              <img src="/download-icon.png" alt="Download" className="download-image" />
            </button>
          </a>
      </div>
      </div>
      
    </div>
  );
}

export default HomeScreen;