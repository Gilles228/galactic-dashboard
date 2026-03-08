import { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// memo() : ce composant ne se re-rend pas si ses props (mission, isFav) n'ont pas changé
const MissionCard = memo(({ mission, isFav, toggleFav }) => {
  const date = new Date(mission.date_utc).toLocaleDateString('fr-FR');

  return (
    <div style={{
      background: '#0f0f2a', border: '1px solid #1e2a4a',
      borderRadius: 10, padding: 20,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {mission.links?.patch?.small
          ? <img src={mission.links.patch.small} alt={mission.name} style={{ width: 60, height: 60, objectFit: 'contain' }} />
          : <span style={{ fontSize: 40 }}>🚀</span>
        }
        {/* Bouton Favoris */}
        <button
          onClick={() => toggleFav(mission.id)}
          style={{
            background: isFav ? '#fbbf2422' : 'transparent',
            border: `1px solid ${isFav ? '#fbbf24' : '#1e2a4a'}`,
            color: isFav ? '#fbbf24' : '#64748b',
            borderRadius: 6, padding: '4px 10px',
            cursor: 'pointer', fontSize: 16, transition: 'all 0.2s',
          }}>
          {isFav ? '★' : '☆'}
        </button>
      </div>

      <h3 style={{ color: 'white', margin: '12px 0 6px', fontSize: 15 }}>{mission.name}</h3>
      <p style={{ color: '#64748b', fontSize: 13 }}>📅 {date}</p>
      <p style={{ color: mission.success ? '#10b981' : '#ef4444', fontSize: 12, marginTop: 4 }}>
        {mission.success ? '✓ Succès' : '✗ Échec'}
      </p>

      <Link
        to={`/mission/${mission.id}`}
        style={{
          display: 'inline-block', marginTop: 14,
          padding: '8px 14px', background: '#005288',
          color: 'white', textDecoration: 'none',
          borderRadius: 6, fontSize: 13,
        }}>
        Voir les détails →
      </Link>
    </div>
  );
});

function Home() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/launches')
      .then(res => {
        setMissions(res.data.slice(-10).reverse());
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur de connexion à l'API SpaceX.");
        setLoading(false);
      });
  }, []);

  // useCallback : la fonction toggleFav ne change pas entre les re-renders
  // Cela permet à memo() sur MissionCard de fonctionner correctement
  const toggleFav = useCallback((id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  if (loading) return <p style={{ color: '#00d4ff', padding: 40 }}>🔄 Analyse de la télémétrie en cours...</p>;
  if (error)   return <p style={{ color: 'red', padding: 40 }}>{error}</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: '#00d4ff', marginBottom: 24 }}>Dernières Missions SpaceX</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 20,
      }}>
        {missions.map(mission => (
          <MissionCard
            key={mission.id}
            mission={mission}
            isFav={favorites.includes(mission.id)}
            toggleFav={toggleFav}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;