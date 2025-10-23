import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViakdataWebsite from './ViakdataWebsite_Luxe';
import ContactPage from './ContactPage';
import OffersPage from './OffersPage';
import ExpertiseIAPage from './ExpertiseIAPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViakdataWebsite />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/expertise-ia" element={<ExpertiseIAPage />} />
      </Routes>
    </Router>
  );
}

export default App;