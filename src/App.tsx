import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index (1)";
import Landing from "./pages/Landing";
import GameHub from "./pages/GameHub";
import Chat from "./pages/Chat";
import Spaces from "./pages/Spaces";
import SpacesWithChat from "./pages/SpacesWithChat";
import Music from "./pages/Music";
import Twitch from "./pages/Twitch";
import Home from "./pages/Home";
import HopMeetings from "./pages/HopMeetings";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/gamehub" element={<GameHub />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces-with-chat" element={<SpacesWithChat />} />
          <Route path="/music" element={<Music />} />
          <Route path="/twitch" element={<Twitch />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hopmeetings" element={<HopMeetings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
