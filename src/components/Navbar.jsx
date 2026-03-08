import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: '#0f0f2a', borderBottom: '1px solid #1e2a4a',
      padding: '0 24px', display: 'flex',
      alignItems: 'center', height: 60, gap: 24,
    }}>
      <h2 style={{ color: '#00d4ff', margin: 0, fontSize: 18 }}>
        ✦ Galactic Dashboard
      </h2>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        Accueil
      </Link>
    </nav>
  );
}

export default Navbar;