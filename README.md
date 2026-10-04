

# Party Arena

Party Arena is a fast-paced, real-time multiplayer arcade party battle game for 2–8 players built with React, Node.js, Express, and Socket.IO. Players create private rooms, customize combat identities, wait in a tactical multiplayer lobby with configurable arena modifiers, bump opponents across dynamic hazard arenas, survive elimination, and compete for the championship crown.

<br>
<img src="https://raw.githubusercontent.com/innng/innng/master/assets/kyubey.gif" height="100" />
<br>

---

## Features

- **Private Rooms**: Instant 5-character alphanumeric room codes (`#X7K9P`) for private matches with zero installations.
- **2–8 Player Roster**: Instant matchmaking for local friends or remote challengers.
- **Custom Player Identities**: Custom operator handle and combat colors (Neon Cyan, Scarlet Red, Electric Amber, Toxic Lime, Hot Pink, Vivid Purple).
- **Multiplayer Lobby**: Host-managed room configuration, round counts (best of 3 to 15), mode selections, and live player readiness checks.
- **Planned Game Modes**:
  1. *Classic Bump*: Standard bumper physics, balanced traction, and elastic collisions.
  2. *Slippery Ice Arena*: Low friction floor where bumpers drift and slide at high velocity.
  3. *Shrinking Arena*: Sudden death outer hex perimeter collapsing inward every 15s.
  4. *Low Gravity*: Extended airborne hang-time and buoyant ricochets.
  5. *Bouncy Walls*: Perimeter boundaries that rebound players with kinetic force.
- **Round & Match Progression**: Real-time 60-second round clock, sudden death triggers, knockouts, round victories, and final leaderboard podium.

---

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, HTML5 Canvas (Phase 6+)
- **Backend**: Node.js, Express.js, Socket.IO
- **Version Control**: Git / GitHub
- **Database**: In-memory state for initial MVP (no database or external auth required)

---

## Project Structure

```text
party-arena/
│
├── client/
│   ├── public/
│   │   └── assets/           # Logos, SVGs, static textures
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Header, Footer, Tactical Button
│   │   │   ├── lobby/        # PlayerSlot roster cards
│   │   │   ├── game/         # ArenaCanvas renderer
│   │   │   └── results/      # LeaderboardRow components
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Polished tactical landing page
│   │   │   ├── CreateRoom.jsx # Room allocation console
│   │   │   ├── JoinRoom.jsx   # 5-digit code join screen
│   │   │   ├── Lobby.jsx      # Operator roster & match config
│   │   │   ├── Game.jsx       # Combat arena viewport
│   │   │   └── Results.jsx    # Final podium & standings
│   │   │
│   │   ├── game/             # Client-side engine foundations
│   │   │   ├── engine/       # ClientEngine loop
│   │   │   ├── entities/     # PlayerEntity model
│   │   │   ├── physics/      # Interpolation helpers
│   │   │   └── modes/        # Client mode metadata
│   │   │
│   │   ├── socket/
│   │   │   └── socket.js     # Reusable Socket.IO singleton
│   │   │
│   │   ├── hooks/
│   │   │   ├── useSocket.js   # Socket connectivity hook
│   │   │   └── useGameState.js# Player and room state hook
│   │   │
│   │   ├── state/
│   │   │   └── gameStore.js   # Client preferences storage
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css    # Core styling & base reset
│   │   │   ├── variables.css  # Party Arena design tokens
│   │   │   └── animations.css # Glow & tactical pulse animations
│   │   │
│   │   ├── App.jsx           # React Router navigation
│   │   └── main.jsx          # React DOM entry point
│   │
│   └── package.json          # Client dependencies
│
├── server/
│   ├── src/
│   │   ├── socket/
│   │   │   ├── roomHandlers.js  # room:create, room:join, room:leave
│   │   │   ├── lobbyHandlers.js # player:updateName, player:ready, host:setRounds
│   │   │   └── gameHandlers.js  # host:startMatch, player:input
│   │   │
│   │   ├── rooms/
│   │   │   ├── Room.js          # Room domain entity
│   │   │   └── roomManager.js   # In-memory room repository
│   │   │
│   │   ├── players/
│   │   │   └── Player.js        # Player model & stats
│   │   │
│   │   ├── game/
│   │   │   ├── GameManager.js   # Match orchestration
│   │   │   ├── RoundManager.js  # Round timers & countdowns
│   │   │   ├── ScoreManager.js  # Standings & KO tracking
│   │   │   ├── engine/
│   │   │   │   ├── physics.js   # Momentum & friction
│   │   │   │   ├── collision.js # Circle elastic collision
│   │   │   │   └── arena.js     # Boundaries & shrink step
│   │   │   └── modes/
│   │   │       ├── ClassicBump.js
│   │   │       ├── SlipperyArena.js
│   │   │       └── ShrinkingArena.js
│   │   │
│   │   ├── utils/
│   │   │   ├── roomCode.js      # Unique 5-char code generator
│   │   │   └── constants.js     # Event names, colors, limits
│   │   │
│   │   └── server.js            # Express + Socket.IO server
│   │
│   └── package.json             # Server dependencies
│
├── server.ts                    # Full-stack dev & production runner
├── .env.example                 # Example environment variables
├── .gitignore                   # Ignored files
├── README.md                    # Project documentation
└── package.json                 # Monorepo scripts & dependencies
```

---

## Local Development

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Installation
Clone the repository and install root dependencies:
```bash
git clone https://github.com/your-username/party-arena.git
cd party-arena
npm install
```

### 3. Running the Application

#### Option A: Full-Stack Dev Server (Recommended)
Runs both the Express/Socket.IO backend and the Vite React frontend seamlessly on port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option B: Split Development (Separate Terminals)
Run the backend on port 3001:
```bash
# Terminal 1: Backend Server
npm run dev:server
# or: node server/src/server.js
```

Run the frontend client on port 5173:
```bash
# Terminal 2: Frontend Client
npm run dev:client
# or: npm run dev
```

---

## Development Roadmap

- **Phase 1 — Project Setup (CURRENT)**: Establish monorepo architecture, server foundations, Socket.IO singleton, route map, design tokens, and polished landing page.
- **Phase 2 — UI**: Implement visual identity across all screens (Lobby roster, customization modal, Arena HUD, Leaderboard podium).
- **Phase 3 — Socket.IO**: Finalize bi-directional socket events, disconnection resilience, and reconnection sync.
- **Phase 4 — Rooms**: Full room creation, 5-digit code validation, capacity caps (2–8 players), and host reassignment.
- **Phase 5 — Lobby**: Real-time player customization (color selector, ready toggles, host settings panel).
- **Phase 6 — Classic Bump**: Server-authoritative 60Hz tick loop, HTML5 Canvas arena rendering, keyboard input (WASD / Bump Dash), and circle elastic collisions.
- **Phase 7 — Match System**: Multi-round match progression, sudden death countdowns, knockouts, round winner flags, and final tally.
- **Phase 8 — Additional Game Modes**: Slippery Ice Arena, Shrinking Death Ring, Low Gravity, and Bouncy Laser Walls.
- **Phase 9 — Polish**: Audio FX, collision particle sparks, screen-shake, responsive mobile touch controls, and spectator mode.
- **Phase 10 — Deployment**: Production Docker containerization, Cloud Run hosting, and domain routing.
