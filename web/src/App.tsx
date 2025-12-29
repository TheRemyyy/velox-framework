import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Docs from './pages/Docs';
import Changelog from './pages/Changelog';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30 flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/*" element={<Docs />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
