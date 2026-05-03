import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <h1>Music AI Assistant</h1>
      <p>Mood select kore music suggestion nao.</p>

      <div className="buttons">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default App;