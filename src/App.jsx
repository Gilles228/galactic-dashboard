import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AlertSystem from './components/AlertSystem';

// Lazy Loading : les pages ne se chargent qu'au moment où l'utilisateur les visite
const Home = lazy(() => import('./pages/Home'));
const MissionDetail = lazy(() => import('./pages/MissionDetail'));

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#0a0a1a' }}>
        <AlertSystem />
        <Navbar />
        {/* Suspense affiche le fallback pendant le chargement du chunk */}
        <Suspense fallback={
          <div style={{ color: '#00d4ff', padding: 40, textAlign: 'center' }}>
            🔄 Chargement en cours...
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission/:id" element={<MissionDetail />} />
            <Route path="*" element={
              <h2 style={{ color: 'white', padding: 40 }}>
                404 — Mission perdue dans l'espace 🌌
              </h2>
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;