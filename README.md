# Iron Quest 🗡️

A gamified fitness mobile app built with React Native and Expo. Turn your real workouts into RPG adventures — earn XP, level up your character, beat personal records, and unlock achievements.

> **Status:** Jalon 1 complete — all MVP screens functional. Currently working on UI/UX polish (Jalon 2).

---

## Concept

Iron Quest transforms sport into a medieval fantasy RPG. Every workout session generates XP and gold, exercises are tracked for personal records using the Epley 1RM formula, your character grows stronger as you do, and stats decay if you stop training.

**Core loop:**

```
Complete a workout → Gain XP & detect PRs → Level up → Unlock achievements → Repeat
```

---

## Features

- 🏠 **Home screen** — character name, level, XP progress bar, daily & weekly quests
- 🧙 **Profile screen** — stats (Strength, Endurance, Vitality, Discipline), lifetime stats (volume, distance, sessions, PRs)
- 💪 **Workout flow** — choose a template, log sets with weight/reps, pre-filled with last performance
- 📊 **Session summary** — XP gained (+50 base, +25 per PR), personal records detected via Epley 1RM formula
- 🏆 **Achievements screen** — 35+ achievements across 8 categories (Strength, Endurance, Vitality, Discipline, Level, Streak, Record, Special) with 5 rarity tiers
- 📋 **Quests screen** — daily and weekly quests with progression tracking
- 📈 **Workout history** — past sessions with duration and exercise breakdown
- 🎮 **Character creation** — name your character and start your adventure
- 📉 **Stat decay system** — stats decrease with inactivity (Force after 30 days, Endurance after 14 days, etc.)

## Roadmap

### Jalon 2 — Persistence & Backend

- [ ] Local persistence (AsyncStorage)
- [ ] Supabase integration (PostgreSQL)
- [ ] Authentication (email/password)
- [ ] Real session history (replace mocks)

### Jalon 3 — UI/UX Polish _(in progress)_

- [ ] Pixel art theme (inspired by Stardew Valley, Terraria, OSRS)
- [ ] Custom pixel art font
- [ ] Styled components (RPG-style windows, buttons, progress bars)
- [ ] Level up animations
- [ ] Achievement unlock animations

### Jalon 4 — Content

- [ ] Lore & world progression (6 zones: Village → Legendary Kingdom)
- [ ] Character sprites
- [ ] Exercise icons
- [ ] Sound design

### Jalon 5 — Publication

- [ ] Google Play Store release
- [ ] (Optional) App Store release

---

## Tech Stack

| Category           | Technology                  |
| ------------------ | --------------------------- |
| Framework          | React Native (Expo SDK 54)  |
| Language           | TypeScript                  |
| Navigation         | Expo Router (file-based)    |
| State management   | React Context               |
| Testing            | Jest + jest-expo (75 tests) |
| Linting/Formatting | ESLint + Prettier           |
| Backend (planned)  | Supabase (PostgreSQL)       |

---

## Architecture

```
iron_quest/
├── app/                        # Screens (Expo Router file-based navigation)
│   ├── (tabs)/                 # Bottom tab screens
│   │   ├── index.tsx           # Home — XP bar, quests, new session button
│   │   ├── quests.tsx          # Daily & weekly quests
│   │   ├── achievements.tsx    # Achievement list with unlock status
│   │   └── profile.tsx        # Character stats + lifetime stats
│   ├── workout/                # Workout flow (stack navigation)
│   │   ├── index.tsx           # Template list + session history
│   │   ├── [id].tsx            # Active session (dynamic route)
│   │   └── summary.tsx         # Session recap + XP/PR results
│   └── create-character.tsx    # Character creation (first launch)
├── context/                    # React Context (global state)
│   └── character.tsx           # Character state + completeSession(), updateName()
├── models/                     # Business logic (pure functions, fully tested)
│   ├── progression.ts          # XP/level, stat calculation, decay system
│   ├── quest.ts                # Quest status
│   ├── workout.ts              # 1RM estimation (Epley), PR detection, volume
│   └── achievement.ts          # Achievement unlock detection
├── services/                   # Data access layer (ready for Supabase migration)
│   └── session.ts              # In-memory current session storage
├── types/                      # TypeScript interfaces
│   ├── character.ts
│   ├── quest.ts
│   ├── progression.ts
│   ├── exercise.ts
│   ├── workout.ts
│   └── achievement.ts
├── mocks/                      # Mock data (replaces DB during development)
│   ├── character.ts
│   ├── quest.ts
│   ├── exercise.ts
│   ├── workout.ts
│   └── achievement.ts
├── utils/                      # Generic utilities
│   └── date.ts                 # Week number, training weeks, days since workout, decay
└── components/                 # Reusable UI components
    └── QuestItem.tsx
```

### Key architectural decisions

- **Models are pure functions** — no side effects, fully unit tested (75 tests across 5 suites). Business logic lives in `models/`, not in components.
- **Services layer** — `services/` abstracts data access. Currently uses in-memory mocks; will migrate to Supabase in Jalon 2 with minimal component changes.
- **Discriminated unions** — `LoggedExercise` uses `type: "strength" | "cardio"` as a discriminant for type-safe access to strength/cardio-specific fields.
- **1RM estimation** — Personal records detected using the Epley formula (`weight × (1 + reps / 30)`) for fair comparison across rep ranges.
- **Stat decay** — Exponential decay formula (`stat × (1 - monthlyRate)^months`) applied after grace periods (30 days for Strength, 14 for Endurance, 7 for Vitality/Discipline).
- **React Context** — Single `CharacterContext` manages all character state. `completeSession()` atomically updates XP, stats, lifetime counters, and checks for new achievements in one call.
- **Achievement system** — 35+ achievements across 8 categories, 5 rarity tiers (Common → Legendary). Unlock detection via `getNewlyUnlockedAchievements()` called after each session.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo Go app on your Android device ([Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Installation

```bash
git clone https://github.com/GuillaumeLeFou/iron_quest
cd iron_quest
npm install
npx expo start
```

Scan the QR code with Expo Go on your Android phone. Make sure your phone and computer are on the same Wi-Fi network.

### Running tests

```bash
npm test
```

75 unit tests across 5 suites covering: XP/level progression, quest status, 1RM estimation, PR detection, last performance lookup, total volume, stat calculation (Strength/Endurance/Vitality/Discipline), decay system, week/date utilities, and achievement unlock detection.

---

## Development Workflow

```
main        → stable snapshots (versioned releases)
  └── dev   → integration branch
        └── feature/...  → one branch per feature, merged via PR
```

Commit convention: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`)

---

## Author

**Guillaume Le Fou** — Junior developer building Iron Quest as a portfolio project to demonstrate React Native, TypeScript, and mobile app architecture skills.

[GitHub](https://github.com/GuillaumeLeFou)

---

_Iron Quest is a personal project, not affiliated with any company._
