import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/common/Header.jsx';
import { Footer } from './components/common/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { CreateRoom } from './pages/CreateRoom.jsx';
import { JoinRoom } from './pages/JoinRoom.jsx';
import { Lobby } from './pages/Lobby.jsx';
import { Game } from './pages/Game.jsx';
import { Results } from './pages/Results.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A1329] text-[#FDFDFD] flex flex-col justify-between selection:bg-[#B9121B] selection:text-[#FDFDFD]">
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/game" element={<Game />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
