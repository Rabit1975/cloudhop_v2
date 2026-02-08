import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '../../ui/layout/AppLayout';

// Modules
import HopHubModule from '../../modules/hophub/HopHubModule';
import SpacesModule from '../../modules/spaces/SpacesModule';
import ProfileModule from '../../modules/profile/ProfileModule';
import SettingsModule from '../../modules/settings/SettingsModule';
import AIToolsModule from '../../modules/ai-tools/AIToolsModule';

export function Router() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <div
          style={{
            width: '240px',
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            CloudHop
          </div>
          <div>Chat</div>
          <div>Meetings</div>
          <div>Spaces</div>
          <div>Profile</div>
          <div>Settings</div>
          <div>AI Tools</div>
        </div>
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#050819',
            color: 'white',
            padding: '20px',
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>CloudHop</h1>
                  <p>Welcome to CloudHop!</p>
                </div>
              }
            />
            <Route path="/chat" element={<HopHubModule />} />
            <Route path="/meetings" element={<SpacesModule />} />
            <Route path="/spaces" element={<SpacesModule />} />
            <Route path="/profile" element={<ProfileModule />} />
            <Route path="/settings" element={<SettingsModule />} />
            <Route path="/ai-tools" element={<AIToolsModule />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
