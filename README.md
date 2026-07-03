# Iron Quest 🗡️

A gamified fitness mobile app built with React Native and Expo. Turn your real workouts into RPG adventures — earn XP, level up your character, and beat personal records.

> **Status:** In active development — MVP in progress (Jalon 1 ~70% complete)

---

## Concept

Iron Quest transforms sport into a medieval fantasy RPG. Every workout session generates XP and gold, exercises are tracked for personal records using the Epley 1RM formula, and your character grows stronger as you do.

**Core loop:**

```
Complete a workout → Gain XP & detect PRs → Level up → Unlock rewards → Repeat
```

---

## Features (current)

- 🏠 **Home screen** — character name, level, XP progress bar, daily quests
- 🧙 **Character screen** — stats (Strength, Endurance, Vitality, Discipline), gold, level
- 💪 **Workout flow** — choose a template, log sets with weight/reps, pre-filled with last performance
- 📊 **Session summary** — XP gained (+50 base, +25 per PR), personal records detected via Epley 1RM formula
- 🏆 **Quest system** — quest status calculated dynamically (not_started / in_progress / completed)

## Roadmap

- [ ] Stats progression (Strength/Endurance/Vitality/Discipline milestones)
- [ ] Achievements system
- [ ] Workout history screen
- [ ] Quests screen (daily/weekly)
- [ ] Statistics screen
- [ ] Profile & settings screen
- [ ] Character creation screen
- [ ] Local persistence (AsyncStorage)
- [ ] Backend & auth (Supabase)
- [ ] Full UI polish (pixel art theme — inspired by Stardew Valley, Terraria, OSRS)
- [ ] Lore, sprites, world progression
- [ ] Google Play Store release

---

## Tech Stack

| Category           | Technology                 |
| ------------------ | -------------------------- |
| Framework          | React Native (Expo SDK 54) |
| Language           | TypeScript                 |
| Navigation         | Expo Router (file-based)   |
| State management   | React Context              |
| Testing            | Jest + jest-expo           |
| Linting/Formatting | ESLint + Prettier          |
| Backend (planned)  | Supabase (PostgreSQL)      |

---

## Architecture

```
iron_quest/
├── app/                    # Screens (Expo Router file-based navigation)
│   ├── (tabs)/             # Bottom tab screens
│   │   ├── index.tsx       # Home
│   │   ├── character.tsx   # Character stats
│   │   ├── quests.tsx      # Quests
│   │   └── achievements.tsx
│   └── workout/            # Workout flow (stack navigation)
│       ├── index.tsx       # Template list
│       ├── [id].tsx        # Active session (dynamic route)
│       └── summary.tsx     # Session recap
├── context/                # React Context (global state)
│   └── character.tsx       # Character state + addXp()
├── models/                 # Business logic (pure functions, tested)
│   ├── progression.ts      # XP/level calculation
│   ├── quest.ts            # Quest status
│   └── workout.ts          # 1RM estimation, PR detection, last performance
├── services/               # Data access layer (ready for Supabase migration)
│   └── session.ts          # In-memory session storage
├── types/                  # TypeScript interfaces
│   ├── character.ts
│   ├── quest.ts
│   ├── progression.ts
│   ├── exercise.ts
│   └── workout.ts
├── mocks/                  # Mock data (replaces DB during development)
│   ├── character.ts
│   ├── quest.ts
│   ├── exercise.ts
│   └── workout.ts
└── constants/              # Theme, colors
```

### Key architectural decisions

- **Models are pure functions** — no side effects, fully unit tested. Business logic lives in `models/`, not in components.
- **Services layer** — `services/` abstracts data access. Currently uses in-memory mocks; will migrate to Supabase in Phase 2 with minimal component changes.
- **Discriminated unions** — `LoggedExercise` uses `type: "strength" | "cardio"` as a discriminant for type-safe access to strength/cardio-specific fields.
- **1RM estimation** — Personal records are detected using the Epley formula (`weight × (1 + reps / 30)`) rather than raw weight, allowing fair comparison across different rep ranges.

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

42 unit tests covering: XP/level progression, quest status, 1RM estimation, PR detection, last performance lookup.

---

## Development Workflow

```
main        → always stable
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
