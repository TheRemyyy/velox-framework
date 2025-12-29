import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const Docs = lazy(() => import('./pages/Docs'));
const Changelog = lazy(() => import('./pages/Changelog'));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-500/30 flex flex-col">
        <Header />
        <Suspense fallback={<div className="flex-1 bg-background" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs/*" element={<Docs />} />
            <Route path="/changelog" element={<Changelog />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}