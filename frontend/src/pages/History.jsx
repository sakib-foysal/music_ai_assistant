import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function History() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await API.get("/history");
        setHistories(res.data);
      } catch {
        alert("History load failed");
      }
    };

    loadHistory();
  }, []);

  return (
    <main className="app-shell">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🕘</span>
          <div>
            <h2>Listening History</h2>
            <p>Your recently played tracks</p>
          </div>
        </div>

        <Link className="btn btn-ghost" to="/dashboard">Dashboard</Link>
      </nav>

      {histories.length === 0 && (
        <div className="empty-state">
          <h3>No history found</h3>
          <p>Play some music first, then come back here.</p>
        </div>
      )}

      <div className="track-grid">
        {histories.map((item) => (
          <article className="music-card" key={item.id}>
            <div className="cover-wrap">
              <img
                src={item.image_url || "https://via.placeholder.com/400"}
                alt={item.track_name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
              />
              <span className="tag">{item.mood}</span>
            </div>

            <div className="music-info">
              <h3>{item.track_name}</h3>
              <p>{item.artist_name}</p>
              <audio controls src={item.audio_url}></audio>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default History;