import { Link } from "react-router-dom";
import './ManualScreen.css'; // Make sure to import the CSS

function ManualScreen() {
    return (
        <div className="manual-screen">
            <Link to="/" className="back-button">
                <button>← Back</button>
            </Link>

            <div className="paper">
                <h1>Manual</h1>
                <p>Welcome to the manual. Here are the instructions...</p>
                {/* Add your manual content here */}
            </div>
        </div>
    );
}


export default ManualScreen;