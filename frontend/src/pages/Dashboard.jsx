import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("happy");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const moods = ["happy", "sad", "relax", "angry", "romantic", "study", "party"];

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  const getRecommendation = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/recommend?mood=${mood}`);
      setTracks(res.data.tracks);
    } catch (error) {
      alert(error.response?.data?.detail || "Music load failed.");
    } finally {
      setLoading(false);
    }
  };

  const saveHistory = async (track) => {
    try {
      await API.post("/history", {
        mood,
        track_name: track.track_name,
        artist_name: track.artist_name,
        audio_url: track.audio_url,
        image_url: track.image_url,
      });
    } catch {
      console.log("History save failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <main className="app-shell">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">🎧</span>
          <div>
            <h2>Music AI Assistant</h2>
            <p>Mood based music discovery</p>
          </div>
        </div>

        <div className="nav-actions">
          <div className="profile-menu">
            <button
              className="profile-name-btn"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="profile-avatar">👤</span>
              <span>{user?.name || "User"}</span>
              <span>▾</span>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <Link to="/history" className="profile-dropdown-item">
                  History
                </Link>

                <button
                  className="profile-dropdown-item danger"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="hero-card">
        <div>
          <span className="badge">AI Music Recommender</span>
          <h1>Find the perfect song for your mood</h1>
          <p>
            Select your current mood and get playable music suggestions instantly.
          </p>
        </div>

        <div className="mood-panel">
          <label>Select Mood</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            {moods.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <button className="btn btn-primary full" onClick={getRecommendation} disabled={loading}>
            {loading ? "Finding music..." : "Get Music"}
          </button>
        </div>
      </section>

      <section className="section-header">
        <h2>Recommended Tracks</h2>
        <p>{tracks.length} songs found</p>
      </section>

      {tracks.length === 0 && !loading && (
        <div className="empty-state">
          <h3>No music yet</h3>
          <p>Choose a mood and click “Get Music”.</p>
        </div>
      )}

      <div className="track-grid">
        {tracks.map((track, index) => (
          <article className="music-card" key={index}>
            <div className="cover-wrap">
              <img
                src={track.image_url || "https://via.placeholder.com/400"}
                alt={track.track_name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/400")}
              />
              <span className="tag">{track.tag_used || mood}</span>
            </div>

            <div className="music-info">
              <h3>{track.track_name}</h3>
              <p>{track.artist_name}</p>
              <audio controls src={track.audio_url} onPlay={() => saveHistory(track)} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;