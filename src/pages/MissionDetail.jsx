import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MissionDetail() {
  const { id } = useParams(); // Lit l'ID dans l'URL : /mission/abc123
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFav, setIsFav] = useState(false); // Défi bonus : bouton Favoris

  useEffect(() => {
    axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
      .then(res => { setMission(res.data); setLoading(false); })
      .catch(() => { setError("Mission introuvable."); setLoading(false); });
  }, [id]);

  if (loading) return <p style={{ color: 'white', padding: 40 }}>🔄 Récupération des données télémétriques...</p>;
  if (error)   return <p style={{ color: 'red', padding: 40 }}>{error}</p>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <Link to="/" style={{ color: '#00d4ff' }}>← Retour aux lancements</Link>

      <div style={{ background: '#0f0f2a', border: '1px solid #1e2a4a', borderRadius: 12, padding: 30, marginTop: 20 }}>
        {mission.links?.patch?.small && (
          <img src={mission.links.patch.small} alt={mission.name} style={{ width: 100 }} />
        )}
        <h1 style={{ color: 'white', margin: '16px 0 8px' }}>{mission.name}</h1>
        <p style={{ color: '#64748b' }}>Vol #{mission.flight_number}</p>
        <p style={{ color: mission.success ? '#10b981' : '#ef4444', marginTop: 8 }}>
          {mission.success ? '✓ Mission réussie' : '✗ Mission échouée'}
        </p>
        <p style={{ color: '#e2e8f0', marginTop: 16, lineHeight: 1.7 }}>
          {mission.details || "Aucune description disponible."}
        </p>

        {/* Défi bonus : bouton Favoris avec changement de couleur */}
        <button
          onClick={() => setIsFav(!isFav)}
          style={{
            marginTop: 20, padding: '10px 20px',
            background: isFav ? '#fbbf24' : 'transparent',
            border: `2px solid ${isFav ? '#fbbf24' : '#475569'}`,
            color: isFav ? '#000' : '#94a3b8',
            borderRadius: 8, cursor: 'pointer', fontSize: 14,
            transition: 'all 0.3s',
          }}>
          {isFav ? '★ Dans mes favoris' : '☆ Ajouter aux favoris'}
        </button>

        {mission.links?.article && (
          <a href={mission.links.article} target="_blank" rel="noreferrer"
            style={{ display: 'inline-block', marginTop: 20, marginLeft: 12, padding: '10px 20px', background: '#005288', color: 'white', borderRadius: 6, textDecoration: 'none' }}>
            Lire l'article →
          </a>
        )}
      </div>
    </div>
  );
}

export default MissionDetail;