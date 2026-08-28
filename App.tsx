import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './src/pages/LandingPage';
import LobbyPage from './src/pages/LobbyPage';
import AdminPane from './src/pages/AdminPane';
import PopulationPage from './src/pages/PopulationPage';
import ExecutionAgentPage from './src/pages/ExecutionAgentPage';
import VoiceAdminPage from './src/pages/VoiceAdminPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Navigate to="/lobby" replace />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/landing/auth/main/adminpane/auth2/content" element={<AdminPane />} />
        <Route path="/main/admin/auth2/admain/inf" element={<PopulationPage />} />
        <Route path="/admin/voice/config" element={<VoiceAdminPage />} />
        <Route path="/execution" element={<ExecutionAgentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
