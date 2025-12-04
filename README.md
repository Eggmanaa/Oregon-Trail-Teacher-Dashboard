# Oregon Trail Simulation - Teacher Control Interface

## Live Production URL
**https://oregontrailteacher.pages.dev**

## Project Overview
- **Name**: Oregon Trail Simulation - Teacher Control Interface
- **Goal**: A comprehensive web-based classroom management tool for running interactive Oregon Trail simulations with students
- **Platform**: Cloudflare Pages with Hono Framework
- **Tech Stack**: Hono + TypeScript + Tailwind CSS (via CDN)

## All Available Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard home - active games, quick actions, trail map |
| `/new-game` | Create new simulation with class info and settings |
| `/characters` | Character Creator - 27 jobs, 19 nationalities, 4 religions |
| `/store` | Supply Market - base prices at Independence, MO |
| `/trading-posts` | All trading posts/forts with items and activities |
| `/dice` | Dice Roller - d100 events, d22 hunting, d12 fishing, d6 combat, d10 Tesla Gun |
| `/combat` | Combat Arena - enemy HP tracking, attack rolls, combat log |
| `/travel` | Travel Calculator - distance, speed, days, food needed |
| `/victory` | Victory Point Calculator with printable certificate |
| `/reference` | Reference Guide - status effects, treasures, trail stops |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/game-data` | GET | Get all game data (jobs, nationalities, etc.) |
| `/api/roll/:type` | GET | Roll dice (d100, d22, d20, d12, d10, d6, d4) |
| `/api/games` | GET | Get all games |
| `/api/games` | POST | Create new game |
| `/api/calculate-travel` | POST | Calculate travel time and food needed |
| `/api/calculate-vp` | POST | Calculate victory points |

## Complete Feature List

### Character Creation (27 Jobs)
**Level 1 - Hard Mode (13 jobs):**
- Missionary, Teacher, Soldier, Hunter, Lumberjack, Herbalist, Shepherd, Fisherman, Ex-Slave, Factory Worker, Outlaw, Cook, Miner

**Level 2 - Medium Mode (8 jobs):**
- Banker, Veterinarian, Lawyer, Doctor, Fur Trapper, Merchant, Frontiersman, Pirate

**Level 3 - Easy Mode (6 jobs):**
- Elder Statesman (2x VP!), Firebrand Preacher (Holy 3!), Explorer, Surgeon, European Aristocrat, Inventor (Tesla Gun!)

### Nationalities (19 total)
African-American, American (Yankee), American (Southerner), American-Indian, Chinese, Dutch, English, French, German, Hungarian, Irish, Italian, Japanese, Polish, Russian, Scotch, Spanish, Swiss, Welsh

### Religions (4 total)
Protestant, Catholic, Mormon, None/Indigenous

### Dice System
- **d100**: 83 Random Events (ambushes, caves, treasures, encounters)
- **d22**: 22 Hunting Results (squirrel to grizzly bear)
- **d12**: 12 Fishing Results (bluegill to otter)
- **d6**: Combat rolls with weapon modifiers
- **d10**: Tesla Gun (Famous Inventor's special weapon)

### Trading Posts & Forts
1. Chimney Rock (Lakota-Sioux Village)
2. Fort Laramie
3. Fort Bridger (20% Dysentery!)
4. Fort Hall (Mormons, Shoshone Village nearby)
5. Shoshone Indian Village
6. Fort Boise (50% Tuberculosis!)
7. Whitman Mission (30% Measles)
8. The Dalles Village Trade Center

### Combat System
- Enemy database with HP, weapons, and abilities
- Fight Levels 1-3 with different requirements
- Real-time HP tracking and combat log
- Special enemies: Grizzly Bear, Sasquatch, Legendary Bear

### Status Effects
**Negative:** Depressed, Disease I/II/III, Kleptomaniac, Insane, Cannibal, Cursed, Fear, Angry, Poisoned, Bleeding

**Positive:** Happy (2x movement!), Blessed (+1 HP)

### Victory Point Calculator
- Oregon City arrival (+500 VP)
- Surviving spouse (+100 VP each)
- Surviving child (+50 VP each)
- Wealth ($10 = 1 VP)
- Discoveries: Viking Rune (+200), Sasquatch (+400), Dead Alien (+500), Fountain of Youth (+1000)
- Elder Statesman 2x multiplier
- Printable certificate

## Data Sources
Rules compiled from teacher documents:
- Oregon Trail Simulation Rules.pdf
- Oregon Trail_ Nations.docx
- Oregon Trail Jobs.docx
- Random Events.docx
- Indian Trading Posts in Oregon Trail Game.docx
- Oregon Trail Paper.docx
- Oregon Trail_ You died of dysentery!.pptx

## Development

### Local Development
```bash
npm install
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### Deploy to Production
```bash
npm run build
npx wrangler pages deploy dist --project-name oregontrailteacher
```

## Deployment Status
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active
- **Last Updated**: December 4, 2024
- **Project Name**: oregontrailteacher

## Future Enhancements (Suggested)
1. Add persistent storage with Cloudflare D1 database
2. Create printable student worksheets
3. Add more presentation slides for projector mode
4. Session save/resume functionality
5. Class leaderboard with VP rankings
