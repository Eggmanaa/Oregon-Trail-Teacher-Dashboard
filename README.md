# Oregon Trail Simulation - Teacher Interface

## Project Overview
- **Name**: Oregon Trail Teacher Interface
- **Goal**: Comprehensive teacher dashboard for facilitating the Oregon Trail classroom simulation game
- **Features**: Character creation, supply store, dice rollers, combat system, travel calculator, victory points

## Live URL
**Preview**: https://3000-itwx14zgoy28mu6y31mnx-18e660f9.sandbox.novita.ai

## Features

### ✅ Completed Features

#### 1. Dashboard Home (`/`)
- Active simulations panel
- Quick action cards for all modules
- Visual trail map showing all 12 stops
- Session management

#### 2. New Game Setup (`/new-game`)
- Class name and period configuration
- Start date selection
- Number of wagon trains (groups)
- Difficulty settings: Historical, Standard, Educational

#### 3. Character Creator (`/characters`)
- **Job Classes** organized by tier:
  - Level 1: Working Class (13 jobs - hard mode)
  - Level 2: Middle Class (8 jobs - medium mode)
  - Level 3: Elite (6 jobs - easy mode)
- **Nationalities**: 19 options with unique bonuses
- **Religions**: 4 options with special effects
- **Skills Reference**: Complete glossary of all 25+ skills
- Random job/nationality selector buttons

#### 4. General Store (`/store`)
- Complete supply inventory:
  - Food (with spoiling indicators)
  - Health items
  - Weapons (with combat modifiers)
  - Tools
  - Animals (with carry slots)
  - Trade goods
- **Inflation Calculator**: Auto-updates prices based on location
- Location selector with multipliers (x1.0 to x3.0)

#### 5. Dice Roller & Events (`/dice`)
- **d100 Random Event Roller** with full event table
- **d20 Hunting Roller** with results table
- **d12 Fishing Roller** with results table
- **d6 Combat Roller** with weapon modifiers
- Complete reference tables for all dice results

#### 6. Combat Arena (`/combat`)
- Enemy selection with pre-loaded stats
- HP tracking with visual health bar
- Attack roll system with weapon modifiers
- Combat log
- Damage/Heal controls

#### 7. Travel Calculator (`/travel`)
- From/To location selection
- Base speed configuration
- Speed modifiers (Horse, Travel skill, etc.)
- Time multipliers (Depressed status)
- Calculates: distance, speed, days, food needed

#### 8. Victory Points Calculator (`/victory`)
- Base points (Oregon City arrival)
- Survivor bonuses (spouse, children)
- Wealth calculation ($10 = 1 VP)
- Special discoveries (Viking Rune, Sasquatch, etc.)
- Elder Statesman 2x multiplier
- Printable certificate generator

#### 9. Reference Guide (`/reference`)
- Status Effects (negative & positive)
- Enemy database with HP and abilities
- Mechanical skill repair chances
- Trail stops with distances

#### 10. Presentation Mode (`/present`)
- Full-screen projector-friendly display
- Quick links to main features

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/game-data` | GET | Get all game reference data |
| `/api/roll/:type` | GET | Roll dice (d4, d6, d12, d20, d100) |
| `/api/games` | GET/POST | List/Create games |
| `/api/games/:id` | GET | Get single game |
| `/api/calculate-travel` | POST | Calculate travel time |
| `/api/calculate-vp` | POST | Calculate victory points |

## Data Models

### Game
- id, name, className, period
- difficulty (historical/standard/educational)
- startDate, currentDay
- wagonTrains[], status

### Wagon Train
- id, name, currentLocation
- daysTraveled, characters[]
- inventory[], cash, vp, status

### Character
- id, name, jobId, nationalityId, religionId
- health, maxHealth, skills[]
- statusEffects[], isAlive, role

## Tech Stack
- **Framework**: Hono (TypeScript)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome
- **Platform**: Cloudflare Pages
- **Font**: Montserrat

## User Guide

### For Teachers

1. **Start a New Game**
   - Click "Start New Game" from dashboard
   - Enter class name and period
   - Set number of wagon trains (one per student group)
   - Choose difficulty level

2. **Character Creation Session**
   - Navigate to Character Creator
   - Display on projector for class
   - Use "Random Job" button for random assignments
   - Students record on paper worksheets

3. **Supply Shopping**
   - Open General Store
   - Select current trail location for inflation
   - Students spend their starting funds
   - Record purchases on paper

4. **During Travel**
   - Use Travel Calculator for movement
   - Roll d100 for random events
   - Roll d20/d12 for hunting/fishing
   - Use Combat Arena for fights

5. **End of Journey**
   - Use Victory Points Calculator
   - Enter all achievements
   - Print certificates for winners

### Game Rules Quick Reference

**Movement**: Base 15 mi/day
- +1 with Horse for travel
- +1 with Travel skill
- x2 time if Depressed
- x3 time if Severely Depressed

**Combat**: Roll d6 + weapon modifier
- 4+ = Hit (1 damage)
- Pistol: +1
- Rifle/Shotgun: +2

**Food**: 1 unit per person per day
- Cook skill: 0.5 units/person
- Cooking 2/3: 0.33 units/person

## Deployment

### Local Development
```bash
npm install
npm run build
npm run dev:sandbox
```

### Deploy to Cloudflare Pages
```bash
npm run deploy:prod
```

## Project Structure
```
webapp/
├── src/
│   ├── index.tsx        # Main Hono application
│   ├── renderer.tsx     # JSX renderer with HTML template
│   └── data/
│       └── gameData.ts  # All game data (jobs, skills, events, etc.)
├── public/
│   └── static/
│       ├── app.js       # Client-side JavaScript
│       └── style.css    # Custom styles
├── ecosystem.config.cjs # PM2 configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

## Status
- **Platform**: Cloudflare Pages Ready
- **Last Updated**: December 4, 2024
- **Version**: 1.0.0

## Features Not Yet Implemented
- Persistent game storage (currently in-memory)
- Student worksheet PDF generation
- Real-time multi-class leaderboards
- Historical photo/artwork gallery
- Sound effects for dice rolls
- Mobile-optimized touch controls

## Recommended Next Steps
1. Add D1 database for persistent game storage
2. Create printable student worksheet templates
3. Add more presentation slides for each game phase
4. Implement class-wide leaderboard system
5. Add historical context panels for educational mode
