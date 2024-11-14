import './App.css'

import useSession from './hooks/useSession'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ErrorPage from './pages/ErrorPage';

function App() {
  const { getToken } = useSession();

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <LandingPage/> } />
        { getToken() ? (
          <Route path="/dashboard" element={ <Dashboard/> } />
        ) : (
          <>
            <Route path="/login" element={ <LoginPage/> } />
            <Route path="/signup" element={ <SignUpPage/> } />
          </>
        )}
        <Route path="*" element={ <ErrorPage/> } />

      </Routes>
    </Router>
  );
}

export default App
