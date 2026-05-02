# 🐍 Snake Neon – React Native

A production-quality **Snake Game** for iOS and Android built with React Native.  
Features neon visuals, haptic feedback, persistent high scores, swipe controls, and smooth animations.

---

## 📱 Screenshots / Features

| Feature | Detail |
|---|---|
| 🎨 Theme | Dark background · Neon green snake · Red food |
| 🕹 Controls | On-screen D-Pad **+** swipe gestures |
| 💾 High Score | Persisted with AsyncStorage across sessions |
| 📳 Haptics | Light pulse on eat · Strong buzz on death |
| ⚡ Speed | Increases every 5 food items eaten |
| 📐 Responsive | Adapts to any screen size automatically |
| 🌟 Animations | Splash entrance, Game Over card spring-in |
| ⏸ Pause/Resume | Mid-game pause with overlay |

---

## 🗂 Project Structure

```
SnakeGame/
├── App.js                        # Root – splash vs game routing
├── package.json
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── src/
    ├── components/
    │   ├── GameBoard.js          # Grid, snake segments, food
    │   ├── DirectionPad.js       # On-screen D-Pad
    │   ├── ScoreBoard.js         # Score / Level / Best HUD
    │   └── GameOverOverlay.js    # Animated game-over card
    ├── screens/
    │   ├── SplashScreen.js       # Animated title screen
    │   └── GameScreen.js         # Main gameplay screen
    ├── hooks/
    │   ├── useGameLoop.js        # Core game loop & state
    │   ├── useHighScore.js       # AsyncStorage persistence
    │   └── useSound.js           # Haptic feedback wrapper
    └── utils/
        ├── constants.js          # Colors, sizes, game params
        └── gameLogic.js          # Pure game mechanic functions
```

---

## 🚀 Installation

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| npm / Yarn | latest |
| React Native CLI | latest |
| Xcode (iOS) | ≥ 14 |
| Android Studio | latest |
| Ruby (iOS) | ≥ 2.7 |

### 1 – Bootstrap a new React Native project

```bash
npx react-native@latest init SnakeGame
cd SnakeGame
```

### 2 – Replace generated files

Copy all files from this repository into the project, overwriting the defaults:

```
App.js
src/
babel.config.js
metro.config.js
tsconfig.json
```

### 3 – Install dependencies

```bash
npm install
# or
yarn install
```

Install required third-party packages:

```bash
npm install @react-native-async-storage/async-storage \
            react-native-haptic-feedback
```

### 4 – iOS setup

```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

Run on simulator:

```bash
npx react-native run-ios
```

### 5 – Android setup

Make sure your emulator is running or a device is connected, then:

```bash
npx react-native run-android
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react-native` | Core framework |
| `@react-native-async-storage/async-storage` | Persist high score |
| `react-native-haptic-feedback` | Vibration on eat/die |

> **Optional**: `react-native-sound` can be wired into `useSound.js` for audio effects if desired.

---

## 🎮 How to Play

1. Tap **START GAME** on the splash screen.
2. Use the **arrow buttons** or **swipe** on the board to steer.
3. Eat the 🔴 red food to grow longer and earn **+10 points**.
4. Speed increases every 5 food items.
5. Avoid walls and your own tail — one hit ends the game.
6. Tap **⏸** to pause mid-game.
7. After game over, tap **↺ PLAY AGAIN** to restart.

---

## ⚙️ Configuration

Edit `src/utils/constants.js` to tune the game:

```js
export const CELL_SIZE          = 20;    // Grid cell px size
export const INITIAL_SPEED      = 150;   // Starting tick (ms)
export const SPEED_INCREMENT    = 5;     // Speed boost per level
export const SPEED_INCREASE_EVERY = 5;  // Level up every N food
export const MIN_SPEED          = 60;    // Max speed cap (ms)
export const SCORE_PER_FOOD     = 10;   // Points per food
```

---

## 🛠 Architecture Notes

- **Pure functions** in `gameLogic.js` – all game mechanics are stateless and testable.
- **Refs + state** in `useGameLoop.js` – refs prevent stale closures inside `setInterval`; state drives renders.
- **`memo()`** on all sub-components – prevents unnecessary re-renders on every tick.
- **`PanResponder`** in `GameScreen.js` – handles swipe gestures directly on the board.
- **Speed-aware interval** – the interval is torn down and re-created whenever speed changes.

---

## 📄 License

MIT – free to use, modify, and distribute.
