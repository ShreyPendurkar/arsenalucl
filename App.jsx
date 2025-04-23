import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageCount = 9; // Fetch 9 images

  useEffect(() => {
    const fetchImages = () => {
      try {
        const urls = Array.from({ length: imageCount }, (_, index) =>
          `https://robohash.org/robot-${index}?size=200x200`
        );
        setImageUrls(urls);
        setError(null);
      } catch (err) {
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="heading">🤖 Unique Robot Avatars</h1>
      <p className="subheading">Generated using Robohash API</p>
      <div className="image-grid">
        {imageUrls.map((url, index) => (
          <div key={index} className="image-card">
            <img src={url} alt={`Robot ${index + 1}`} className="robot-avatar" />
            <p className="image-label">Robot {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
