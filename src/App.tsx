import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Transfer } from './pages/Transfer';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Purchase } from './pages/Purchase';
import { Alerts } from './pages/Alerts';
import { Loyalty } from './pages/Loyalty';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PWAPrompt } from './components/PWAPrompt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchase"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loyalty"
          element={
            <ProtectedRoute>
              <Loyalty />
            </ProtectedRoute>
          }
        />
      </Routes>
      <PWAPrompt />
    </Router>
  );
}

export default App;