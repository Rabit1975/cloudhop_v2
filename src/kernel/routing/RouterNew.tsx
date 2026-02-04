import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from '../../ui/layout/AppLayout'

// Modules
import HopHubModule from '../../modules/hophub/HopHubModule'
import SpacesModule from '../../modules/spaces/SpacesModule'
import ProfileModule from '../../modules/profile/ProfileModule'
import SettingsModule from '../../modules/settings/SettingsModule'
import AIToolsModule from '../../modules/ai-tools/AIToolsModule'

export function RouterNew() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HopHubModule />} />
          <Route path="/hub" element={<HopHubModule />} />
          <Route path="/spaces" element={<SpacesModule />} />
          <Route path="/profile" element={<ProfileModule />} />
          <Route path="/settings" element={<SettingsModule />} />
          <Route path="/ai-tools" element={<AIToolsModule />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}
