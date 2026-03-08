import { useState, useEffect } from 'react';

function AlertSystem() {
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    // Simulation WebSocket avec setInterval (comme demandé dans le TP)
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setNotif("🚀 Nouveau lancement détecté !");
        setTimeout(() => setNotif(null), 5000);
      }
    }, 30000);

    // Notif de démo après 5 secondes
    const demo = setTimeout(() => {
      setNotif("🛰️ Flux temps réel actif !");
      setTimeout(() => setNotif(null), 5000);
    }, 5000);

    return () => { clearInterval(interval); clearTimeout(demo); };
  }, []);

  if (!notif) return null;

  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 1000,
      background: '#7c3aed', color: 'white',
      padding: '12px 20px', borderRadius: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      fontSize: 14, fontWeight: 500,
    }}>
      {notif}
    </div>
  );
}

export default AlertSystem;