import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViakdataWebsite from './ViakdataWebsite_Luxe';
import ContactPage from './ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViakdataWebsite />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;