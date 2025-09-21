import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MoodTracker from "./components/MoodTracker";
import ProgressTracker from "./components/ProgressTracker";
import GoalsManager from "./components/GoalsManager";
import JournalFeature from "./components/JournalFeature";
import SessionScheduler from "./components/SessionScheduler";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setSidebarOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-calm">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <main className="md:pl-64 transition-all duration-200">
              <div className="container mx-auto p-6 max-w-7xl">
                <Routes>
                  <Route path="/" element={<Dashboard onNavigate={handleNavigate} />} />
                  <Route path="/mood" element={<MoodTracker />} />
                  <Route path="/progress" element={<ProgressTracker />} />
                  <Route path="/goals" element={<GoalsManager />} />
                  <Route path="/journal" element={<JournalFeature />} />
                  <Route path="/sessions" element={<SessionScheduler />} />
                  <Route path="/community" element={<div className="p-8 text-center">Community features coming soon!</div>} />
                  <Route path="/insights" element={<div className="p-8 text-center">Insights dashboard coming soon!</div>} />
                  <Route path="/chat" element={<div className="p-8 text-center">Chat support coming soon!</div>} />
                  <Route path="/mindfulness" element={<div className="p-8 text-center">Mindfulness exercises coming soon!</div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
