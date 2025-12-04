import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import { 
  JOB_CLASSES, 
  NATIONALITIES, 
  RELIGIONS, 
  SUPPLIES, 
  INFLATION_RATES, 
  TRAIL_STOPS,
  RANDOM_EVENTS,
  HUNTING_RESULTS,
  FISHING_RESULTS,
  ENEMIES,
  STATUS_EFFECTS,
  SKILLS,
  VP_REWARDS
} from './data/gameData'

// Types
interface WagonTrain {
  id: string
  name: string
  currentLocation: string
  currentLocationIndex: number
  daysTraveled: number
  characters: Character[]
  inventory: InventoryItem[]
  cash: number
  vp: number
  status: 'active' | 'arrived' | 'failed'
}

interface Character {
  id: string
  name: string
  jobId: string
  jobName: string
  nationalityId: string
  religionId: string
  health: number
  maxHealth: number
  skills: string[]
  statusEffects: string[]
  isAlive: boolean
  role: 'leader' | 'spouse' | 'child' | 'member'
}

interface InventoryItem {
  id: string
  itemId: string
  name: string
  quantity: number
  category: string
}

interface Game {
  id: string
  name: string
  className: string
  period: string
  difficulty: 'historical' | 'standard' | 'educational'
  startDate: string
  currentDay: number
  wagonTrains: WagonTrain[]
  status: 'setup' | 'active' | 'completed'
}

// In-memory storage (replace with D1 for production)
const games: Map<string, Game> = new Map()

const app = new Hono()

app.use(renderer)
app.use('/api/*', cors())

// ============ PAGES ============

// Dashboard Home
app.get('/', (c) => {
  const activeGames = Array.from(games.values()).filter(g => g.status === 'active')
  
  return c.render(
    <div class="min-h-screen">
      {/* Header */}
      <header class="wagon-trail text-white py-6 px-8 shadow-lg">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="text-4xl">🚂</div>
            <div>
              <h1 class="text-3xl font-bold tracking-tight">Oregon Trail Simulation</h1>
              <p class="text-green-200 text-sm">Teacher Control Interface</p>
            </div>
          </div>
          <nav class="flex gap-4">
            <a href="/new-game" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-plus"></i> New Game
            </a>
            <a href="/reference" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-book"></i> Reference
            </a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Quick Actions */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <a href="/new-game" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-green-600">
            <div class="flex items-center gap-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <i class="fas fa-flag-checkered text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">Start New Game</h3>
                <p class="text-sm text-gray-500">Create a new simulation</p>
              </div>
            </div>
          </a>
          
          <a href="/characters" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-blue-600">
            <div class="flex items-center gap-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <i class="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">Character Creator</h3>
                <p class="text-sm text-gray-500">Jobs, nationalities, skills</p>
              </div>
            </div>
          </a>
          
          <a href="/store" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-yellow-600">
            <div class="flex items-center gap-4">
              <div class="bg-yellow-100 p-3 rounded-lg">
                <i class="fas fa-store text-yellow-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">General Store</h3>
                <p class="text-sm text-gray-500">Supplies & pricing</p>
              </div>
            </div>
          </a>
          
          <a href="/dice" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-red-600">
            <div class="flex items-center gap-4">
              <div class="bg-red-100 p-3 rounded-lg">
                <i class="fas fa-dice text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-800">Dice Roller</h3>
                <p class="text-sm text-gray-500">Events, hunting, combat</p>
              </div>
            </div>
          </a>
        </div>

        {/* Active Games */}
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-gamepad text-green-600"></i> Active Simulations
            </h2>
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {activeGames.length} Active
            </span>
          </div>
          
          {activeGames.length === 0 ? (
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-map text-6xl mb-4 opacity-30"></i>
              <p class="text-lg">No active simulations</p>
              <p class="text-sm">Start a new game to begin tracking wagon trains!</p>
              <a href="/new-game" class="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-plus mr-2"></i>Create New Game
              </a>
            </div>
          ) : (
            <div class="grid gap-4">
              {activeGames.map(game => (
                <a href={`/game/${game.id}`} class="block border rounded-lg p-4 hover:border-green-500 transition">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800">{game.name}</h3>
                      <p class="text-sm text-gray-500">{game.className} - Period {game.period}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-medium">Day {game.currentDay}</p>
                      <p class="text-xs text-gray-500">{game.wagonTrains.length} wagon trains</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Trail Map Preview */}
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-route text-trail-brown"></i> The Oregon Trail
          </h2>
          <div class="relative">
            <div class="flex items-center justify-between overflow-x-auto pb-4">
              {TRAIL_STOPS.map((stop, index) => (
                <div class="flex flex-col items-center min-w-[100px] relative">
                  <div class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    stop.type === 'start' ? 'bg-green-600' :
                    stop.type === 'end' ? 'bg-red-600' :
                    stop.type === 'fort' ? 'bg-blue-600' :
                    'bg-yellow-600'
                  }`}>
                    {index + 1}
                  </div>
                  <p class="text-xs text-center mt-1 font-medium">{stop.name}</p>
                  <p class="text-xs text-gray-400">{stop.distance}mi</p>
                  {index < TRAIL_STOPS.length - 1 && (
                    <div class="absolute top-4 left-1/2 w-full h-0.5 bg-trail-brown -z-10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>,
    { title: 'Oregon Trail - Dashboard' }
  )
})

// New Game Setup
app.get('/new-game', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">New Simulation Setup</h1>
        </div>
      </header>

      <main class="max-w-4xl mx-auto p-8">
        <form id="new-game-form" class="bg-white rounded-xl shadow-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-chalkboard-teacher mr-2"></i>Class Name
              </label>
              <input type="text" name="className" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., US History Period 3" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-clock mr-2"></i>Period
              </label>
              <input type="text" name="period" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., 3" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-calendar mr-2"></i>Start Date
              </label>
              <input type="date" name="startDate" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-users mr-2"></i>Number of Wagon Trains
              </label>
              <input type="number" name="numTrains" min="1" max="20" value="6" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
          </div>

          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-700 mb-4">
              <i class="fas fa-mountain mr-2"></i>Difficulty Setting
            </label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label class="border-2 rounded-lg p-4 cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                <input type="radio" name="difficulty" value="historical" class="hidden" />
                <div class="text-center">
                  <i class="fas fa-skull text-3xl text-red-600 mb-2"></i>
                  <h4 class="font-bold">Historical</h4>
                  <p class="text-xs text-gray-500">Strict rules, high mortality</p>
                </div>
              </label>
              
              <label class="border-2 rounded-lg p-4 cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                <input type="radio" name="difficulty" value="standard" class="hidden" checked />
                <div class="text-center">
                  <i class="fas fa-balance-scale text-3xl text-yellow-600 mb-2"></i>
                  <h4 class="font-bold">Standard</h4>
                  <p class="text-xs text-gray-500">Balanced challenge</p>
                </div>
              </label>
              
              <label class="border-2 rounded-lg p-4 cursor-pointer hover:border-green-500 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                <input type="radio" name="difficulty" value="educational" class="hidden" />
                <div class="text-center">
                  <i class="fas fa-graduation-cap text-3xl text-blue-600 mb-2"></i>
                  <h4 class="font-bold">Educational</h4>
                  <p class="text-xs text-gray-500">Forgiving, focus on learning</p>
                </div>
              </label>
            </div>
          </div>

          <div class="flex gap-4">
            <button type="submit" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              <i class="fas fa-flag-checkered mr-2"></i>Create Simulation
            </button>
            <a href="/" class="px-6 py-3 border rounded-lg hover:bg-gray-50 transition">Cancel</a>
          </div>
        </form>
      </main>
    </div>,
    { title: 'New Game - Oregon Trail' }
  )
})

// Character Creator
app.get('/characters', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">Character Creation Guide</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Job Classes */}
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-briefcase text-blue-600"></i> Job Classes
            </h2>
            <button id="randomize-job" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              <i class="fas fa-random mr-2"></i>Random Job
            </button>
          </div>
          
          {/* Level 1 - Working Class */}
          <div class="bg-amber-50 rounded-xl p-6 mb-4 border-2 border-amber-200">
            <h3 class="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
              <span class="bg-amber-600 text-white px-2 py-1 rounded text-sm">Level 1</span>
              {JOB_CLASSES.level1.name}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {JOB_CLASSES.level1.jobs.map(job => (
                <div class="bg-white rounded-lg p-4 border hover:border-amber-400 transition cursor-pointer job-card" data-job={JSON.stringify(job)}>
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-gray-800">{job.name}</h4>
                    <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      {job.health} HP
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">
                    <span class="font-medium">Funds:</span> {typeof job.funds === 'number' ? `$${job.funds}` : job.funds}
                  </p>
                  <div class="flex flex-wrap gap-1 mb-2">
                    {job.skills.map(skill => (
                      <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{skill}</span>
                    ))}
                  </div>
                  {job.notes && <p class="text-xs text-gray-500 italic">{job.notes}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Level 2 - Middle Class */}
          <div class="bg-blue-50 rounded-xl p-6 mb-4 border-2 border-blue-200">
            <h3 class="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              <span class="bg-blue-600 text-white px-2 py-1 rounded text-sm">Level 2</span>
              {JOB_CLASSES.level2.name}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {JOB_CLASSES.level2.jobs.map(job => (
                <div class="bg-white rounded-lg p-4 border hover:border-blue-400 transition cursor-pointer job-card" data-job={JSON.stringify(job)}>
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-gray-800">{job.name}</h4>
                    <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      {job.health} HP
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">
                    <span class="font-medium">Funds:</span> {typeof job.funds === 'number' ? `$${job.funds}` : job.funds}
                  </p>
                  <div class="flex flex-wrap gap-1 mb-2">
                    {job.skills.map(skill => (
                      <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{skill}</span>
                    ))}
                  </div>
                  {job.notes && <p class="text-xs text-gray-500 italic">{job.notes}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Level 3 - Elite */}
          <div class="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 class="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
              <span class="bg-purple-600 text-white px-2 py-1 rounded text-sm">Level 3</span>
              {JOB_CLASSES.level3.name}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {JOB_CLASSES.level3.jobs.map(job => (
                <div class="bg-white rounded-lg p-4 border hover:border-purple-400 transition cursor-pointer job-card" data-job={JSON.stringify(job)}>
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-gray-800">{job.name}</h4>
                    <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      {job.health} HP
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">
                    <span class="font-medium">Funds:</span> {typeof job.funds === 'number' ? `$${job.funds}` : job.funds}
                  </p>
                  <div class="flex flex-wrap gap-1 mb-2">
                    {job.skills.map(skill => (
                      <span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{skill}</span>
                    ))}
                  </div>
                  {job.notes && <p class="text-xs text-gray-500 italic">{job.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nationalities */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-globe text-green-600"></i> Nationalities
            </h2>
            <button id="randomize-nationality" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              <i class="fas fa-random mr-2"></i>Random
            </button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {NATIONALITIES.map(nat => (
              <div class="border rounded-lg p-3 hover:border-green-400 transition cursor-pointer nationality-card" data-nationality={JSON.stringify(nat)}>
                <h4 class="font-medium text-gray-800 text-sm">{nat.name}</h4>
                <p class="text-xs text-gray-500 mt-1">{nat.bonus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Religions */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-church text-purple-600"></i> Religions
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RELIGIONS.map(rel => (
              <div class="border rounded-lg p-4 hover:border-purple-400 transition cursor-pointer">
                <h4 class="font-medium text-gray-800">{rel.name}</h4>
                <p class="text-sm text-gray-500 mt-2">{rel.effect}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Reference */}
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-star text-yellow-600"></i> Skills Reference
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SKILLS.map(skill => (
              <div class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                  {skill.name}
                </span>
                <p class="text-sm text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>,
    { title: 'Character Creator - Oregon Trail' }
  )
})

// General Store
app.get('/store', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">General Store</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Location & Inflation */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-map-marker-alt mr-2"></i>Current Location
              </label>
              <select id="location-select" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
                {TRAIL_STOPS.map(stop => (
                  <option value={stop.id}>{stop.name} (x{INFLATION_RATES[stop.id]})</option>
                ))}
              </select>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">Price Multiplier</p>
              <p id="inflation-display" class="text-3xl font-bold text-green-600">x1.0</p>
            </div>
          </div>
        </div>

        {/* Supply Categories */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Food */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-drumstick-bite text-orange-600"></i> Food
            </h3>
            <div class="space-y-3">
              {SUPPLIES.food.map(item => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg supply-item" data-base-price={item.price}>
                  <div>
                    <span class="font-medium">{item.name}</span>
                    {item.spoils && <span class="ml-2 text-xs text-red-500">(spoils)</span>}
                  </div>
                  <span class="font-bold text-green-600 item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-medkit text-red-600"></i> Health
            </h3>
            <div class="space-y-3">
              {SUPPLIES.health.map(item => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg supply-item" data-base-price={item.price}>
                  <span class="font-medium">{item.name}</span>
                  <span class="font-bold text-green-600 item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weapons */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-crosshairs text-gray-600"></i> Weapons
            </h3>
            <div class="space-y-3">
              {SUPPLIES.weapons.map(item => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg supply-item" data-base-price={item.price}>
                  <div>
                    <span class="font-medium">{item.name}</span>
                    <span class="ml-2 text-xs text-blue-500">(+{item.modifier})</span>
                    {item.powerful && <span class="ml-1 text-xs text-purple-500">⚡</span>}
                  </div>
                  <span class="font-bold text-green-600 item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-tools text-gray-600"></i> Tools
            </h3>
            <div class="space-y-3">
              {SUPPLIES.tools.map(item => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg supply-item" data-base-price={item.price}>
                  <span class="font-medium">{item.name}</span>
                  <span class="font-bold text-green-600 item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animals */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-horse text-brown-600"></i> Animals
            </h3>
            <div class="space-y-3">
              {SUPPLIES.animals.map(item => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg supply-item" data-base-price={item.price}>
                  <div>
                    <span class="font-medium">{item.name}</span>
                    <span class="block text-xs text-gray-500">{item.carrySlots} slots{item.notes ? ` • ${item.notes}` : ''}</span>
                  </div>
                  <span class="font-bold text-green-600 item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trade Goods */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-gem text-purple-600"></i> Trade Goods
            </h3>
            <div class="space-y-3">
              {SUPPLIES.trade_goods.map(item => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg supply-item" data-base-price={item.price}>
                  <div>
                    <span class="font-medium">{item.name}</span>
                    {item.tradeValue && <span class="block text-xs text-purple-500">Trade value: ${item.tradeValue}</span>}
                  </div>
                  <span class="font-bold text-green-600 item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>,
    { title: 'General Store - Oregon Trail' }
  )
})

// Dice Roller & Event System
app.get('/dice', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">Dice Roller & Events</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Dice Rollers */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* d100 - Random Events */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>Random Event
            </h3>
            <div id="d100-result" class="text-6xl font-bold text-purple-600 mb-4 dice-display">--</div>
            <button id="roll-d100" class="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition">
              Roll d100
            </button>
            <div id="d100-event" class="mt-4 p-4 bg-gray-50 rounded-lg text-left hidden">
              <h4 id="d100-event-name" class="font-bold text-gray-800"></h4>
              <p id="d100-event-desc" class="text-sm text-gray-600 mt-1"></p>
            </div>
          </div>

          {/* d20 - Hunting */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-crosshairs text-green-600 mr-2"></i>Hunting
            </h3>
            <div id="d20-result" class="text-6xl font-bold text-green-600 mb-4 dice-display">--</div>
            <button id="roll-d20" class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              Roll d20
            </button>
            <div id="d20-event" class="mt-4 p-4 bg-gray-50 rounded-lg text-left hidden">
              <h4 id="d20-event-name" class="font-bold text-gray-800"></h4>
              <p id="d20-event-desc" class="text-sm text-gray-600 mt-1"></p>
            </div>
          </div>

          {/* d12 - Fishing */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-fish text-blue-600 mr-2"></i>Fishing
            </h3>
            <div id="d12-result" class="text-6xl font-bold text-blue-600 mb-4 dice-display">--</div>
            <button id="roll-d12" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Roll d12
            </button>
            <div id="d12-event" class="mt-4 p-4 bg-gray-50 rounded-lg text-left hidden">
              <h4 id="d12-event-name" class="font-bold text-gray-800"></h4>
              <p id="d12-event-desc" class="text-sm text-gray-600 mt-1"></p>
            </div>
          </div>

          {/* d6 - Combat */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-fist-raised text-red-600 mr-2"></i>Combat
            </h3>
            <div id="d6-result" class="text-6xl font-bold text-red-600 mb-4 dice-display">--</div>
            <button id="roll-d6" class="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
              Roll d6
            </button>
            <div id="d6-modifier" class="mt-2 flex items-center justify-center gap-2">
              <label class="text-sm text-gray-600">Modifier:</label>
              <select id="combat-modifier" class="px-2 py-1 border rounded">
                <option value="0">+0 (Unarmed)</option>
                <option value="1">+1 (Pistol)</option>
                <option value="2">+2 (Rifle/Shotgun)</option>
              </select>
            </div>
            <div id="d6-total" class="mt-2 text-lg font-bold text-gray-700">
              Total: <span id="combat-total">--</span> (4+ hits)
            </div>
          </div>
        </div>

        {/* Random Event Table */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-list text-purple-600"></i> Random Event Table (d100)
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-2 text-left">Roll</th>
                  <th class="px-4 py-2 text-left">Event</th>
                  <th class="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {RANDOM_EVENTS.map(event => (
                  <tr class="border-b hover:bg-gray-50">
                    <td class="px-4 py-2 font-mono font-bold">
                      {event.roll[0] === event.roll[1] ? event.roll[0] : `${event.roll[0]}-${event.roll[1]}`}
                    </td>
                    <td class="px-4 py-2 font-medium">{event.name}</td>
                    <td class="px-4 py-2 text-gray-600">{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hunting Table */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-crosshairs text-green-600"></i> Hunting Table (d20)
            </h2>
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-3 py-2 text-left">Roll</th>
                  <th class="px-3 py-2 text-left">Result</th>
                  <th class="px-3 py-2 text-left">Meat</th>
                  <th class="px-3 py-2 text-left">Fur</th>
                </tr>
              </thead>
              <tbody>
                {HUNTING_RESULTS.map(result => (
                  <tr class={`border-b ${result.damage ? 'bg-red-50' : result.combat ? 'bg-yellow-50' : ''}`}>
                    <td class="px-3 py-2 font-mono font-bold">
                      {result.roll[0] === result.roll[1] ? result.roll[0] : `${result.roll[0]}-${result.roll[1]}`}
                    </td>
                    <td class="px-3 py-2">{result.name}</td>
                    <td class="px-3 py-2">{result.meat > 0 ? result.meat : '-'}</td>
                    <td class="px-3 py-2">{result.fur ? '✓' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-fish text-blue-600"></i> Fishing Table (d12)
            </h2>
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-3 py-2 text-left">Roll</th>
                  <th class="px-3 py-2 text-left">Result</th>
                  <th class="px-3 py-2 text-left">Meat</th>
                  <th class="px-3 py-2 text-left">Fur</th>
                </tr>
              </thead>
              <tbody>
                {FISHING_RESULTS.map(result => (
                  <tr class="border-b">
                    <td class="px-3 py-2 font-mono font-bold">
                      {result.roll[0] === result.roll[1] ? result.roll[0] : `${result.roll[0]}-${result.roll[1]}`}
                    </td>
                    <td class="px-3 py-2">{result.name}</td>
                    <td class="px-3 py-2">{result.meat > 0 ? result.meat : '-'}</td>
                    <td class="px-3 py-2">{result.fur ? '✓' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>,
    { title: 'Dice Roller - Oregon Trail' }
  )
})

// Combat System
app.get('/combat', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-b from-red-900 to-gray-900">
      <header class="bg-black/30 text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">⚔️ Combat Arena</h1>
        </div>
      </header>

      <main class="max-w-5xl mx-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enemy Panel */}
          <div class="bg-black/40 rounded-xl p-6 text-white">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <i class="fas fa-skull"></i> Enemy
            </h2>
            <select id="enemy-select" class="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 mb-4">
              {ENEMIES.map(enemy => (
                <option value={enemy.id} data-enemy={JSON.stringify(enemy)}>
                  {enemy.name} (HP: {enemy.hp})
                </option>
              ))}
            </select>
            
            <div class="bg-gray-800 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span id="enemy-name" class="text-xl font-bold">Wolf</span>
                <span id="enemy-hp" class="text-2xl font-bold text-red-500">3/3</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-4 mb-3">
                <div id="enemy-hp-bar" class="bg-red-500 h-4 rounded-full transition-all" style="width: 100%"></div>
              </div>
              <div id="enemy-abilities" class="flex gap-2 flex-wrap">
                {/* Abilities displayed here */}
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm mb-2">Adjust HP:</label>
              <div class="flex gap-2">
                <button id="enemy-damage" class="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                  <i class="fas fa-minus"></i> Damage
                </button>
                <button id="enemy-heal" class="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition">
                  <i class="fas fa-plus"></i> Heal
                </button>
              </div>
            </div>
          </div>

          {/* Player Attack Panel */}
          <div class="bg-black/40 rounded-xl p-6 text-white">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <i class="fas fa-users"></i> Party Attack
            </h2>
            
            <div class="space-y-4">
              <div class="bg-gray-800 rounded-lg p-4">
                <label class="block text-sm mb-2">Weapon:</label>
                <select id="attack-weapon" class="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2">
                  <option value="0">Unarmed (+0)</option>
                  <option value="1">Pistol (+1)</option>
                  <option value="2">Rifle (+2)</option>
                  <option value="2">Shotgun (+2)</option>
                </select>
              </div>

              <button id="attack-roll" class="w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-lg font-bold text-xl transition">
                <i class="fas fa-dice mr-2"></i>Attack Roll (d6)
              </button>

              <div id="attack-result" class="bg-gray-800 rounded-lg p-4 text-center hidden">
                <div class="text-4xl font-bold mb-2">
                  <span id="attack-roll-value">-</span> + <span id="attack-mod-value">-</span> = <span id="attack-total-value">-</span>
                </div>
                <div id="attack-hit-miss" class="text-2xl font-bold"></div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <h3 class="font-bold mb-2">Combat Rules:</h3>
              <ul class="text-sm text-gray-300 space-y-1">
                <li>• Roll 1d6 per armed character</li>
                <li>• Add weapon modifier (+1 Pistol, +2 Rifle/Shotgun)</li>
                <li>• Roll of 4+ after modifiers = HIT (1 damage)</li>
                <li>• Enemy attacks random party member if alive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Combat Log */}
        <div class="mt-8 bg-black/40 rounded-xl p-6 text-white">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Combat Log</h2>
            <button id="clear-log" class="text-sm text-gray-400 hover:text-white">Clear</button>
          </div>
          <div id="combat-log" class="bg-gray-900 rounded-lg p-4 h-48 overflow-y-auto font-mono text-sm">
            <p class="text-gray-500">Combat log will appear here...</p>
          </div>
        </div>
      </main>
    </div>,
    { title: 'Combat Arena - Oregon Trail' }
  )
})

// Travel Calculator
app.get('/travel', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">Travel Calculator</h1>
        </div>
      </header>

      <main class="max-w-4xl mx-auto p-8">
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Calculate Travel Time</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From:</label>
              <select id="travel-from" class="w-full px-4 py-2 border rounded-lg">
                {TRAIL_STOPS.map((stop, index) => (
                  <option value={index}>{stop.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">To:</label>
              <select id="travel-to" class="w-full px-4 py-2 border rounded-lg">
                {TRAIL_STOPS.map((stop, index) => (
                  <option value={index} selected={index === 1}>{stop.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Base Speed:</label>
            <div class="flex items-center gap-4">
              <input type="number" id="base-speed" value="15" min="1" max="30"
                class="w-24 px-4 py-2 border rounded-lg text-center font-bold text-xl" />
              <span class="text-gray-600">miles/day</span>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Speed Modifiers:</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" class="speed-modifier" data-value="1" />
                <span class="text-sm">Horse for travel (+1)</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" class="speed-modifier" data-value="1" />
                <span class="text-sm">Travel skill (+1)</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" class="speed-modifier" data-value="1" />
                <span class="text-sm">Wild Honey (+1)</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="checkbox" class="speed-modifier" data-value="-1" />
                <span class="text-sm">Overburdened (-1)</span>
              </label>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Time Multipliers:</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="radio" name="time-mult" value="1" checked />
                <span class="text-sm">Normal (x1)</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="radio" name="time-mult" value="2" />
                <span class="text-sm">Depressed (x2)</span>
              </label>
              <label class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input type="radio" name="time-mult" value="3" />
                <span class="text-sm">Severely Depressed (x3)</span>
              </label>
            </div>
          </div>

          <button id="calculate-travel" class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
            <i class="fas fa-calculator mr-2"></i>Calculate
          </button>
        </div>

        {/* Results */}
        <div id="travel-results" class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Travel Results</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Distance</p>
              <p id="result-distance" class="text-2xl font-bold text-blue-600">-- mi</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Speed</p>
              <p id="result-speed" class="text-2xl font-bold text-green-600">-- mi/day</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Travel Time</p>
              <p id="result-days" class="text-2xl font-bold text-yellow-600">-- days</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Food Needed</p>
              <p id="result-food" class="text-2xl font-bold text-red-600">-- units</p>
            </div>
          </div>
        </div>
      </main>
    </div>,
    { title: 'Travel Calculator - Oregon Trail' }
  )
})

// Victory Points Calculator
app.get('/victory', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">🏆 Victory Point Calculator</h1>
        </div>
      </header>

      <main class="max-w-4xl mx-auto p-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <form id="vp-form">
            {/* Base Points */}
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Base Points</h3>
              <label class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <input type="checkbox" id="reached-oregon" class="w-5 h-5" />
                <span class="font-medium">Reached Oregon City</span>
                <span class="ml-auto font-bold text-green-600">+500 VP</span>
              </label>
            </div>

            {/* Survivors */}
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Survivors</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Surviving Spouses</label>
                  <input type="number" id="surviving-spouses" value="0" min="0" max="10"
                    class="w-full px-4 py-2 border rounded-lg text-center" />
                  <p class="text-xs text-gray-500 mt-1">+100 VP each</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Surviving Children</label>
                  <input type="number" id="surviving-children" value="0" min="0" max="20"
                    class="w-full px-4 py-2 border rounded-lg text-center" />
                  <p class="text-xs text-gray-500 mt-1">+50 VP each</p>
                </div>
              </div>
            </div>

            {/* Wealth */}
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Wealth</h3>
              <div class="grid grid-cols-3 gap-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Cash on Hand ($)</label>
                  <input type="number" id="cash" value="0" min="0"
                    class="w-full px-4 py-2 border rounded-lg text-center" />
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Wagon Value ($)</label>
                  <input type="number" id="wagon-value" value="200" min="0"
                    class="w-full px-4 py-2 border rounded-lg text-center" />
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Animals Value ($)</label>
                  <input type="number" id="animals-value" value="0" min="0"
                    class="w-full px-4 py-2 border rounded-lg text-center" />
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-2">Every $10 = 1 VP</p>
            </div>

            {/* Discoveries */}
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Discoveries</h3>
              <div class="space-y-3">
                <label class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                  <input type="checkbox" id="viking-rune" class="w-5 h-5" />
                  <span>Viking Rune Stone</span>
                  <span class="ml-auto font-bold text-purple-600">+200 VP</span>
                </label>
                <label class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                  <input type="checkbox" id="indian-mummy" class="w-5 h-5" />
                  <span>Indian Mummy</span>
                  <span class="ml-auto font-bold text-purple-600">+100 VP</span>
                </label>
                <label class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                  <input type="checkbox" id="sasquatch" class="w-5 h-5" />
                  <span>Sasquatch (Defeated)</span>
                  <span class="ml-auto font-bold text-purple-600">+400 VP</span>
                </label>
                <label class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                  <input type="checkbox" id="jackalope" class="w-5 h-5" />
                  <span>Jackalope</span>
                  <span class="ml-auto font-bold text-purple-600">+100 VP</span>
                </label>
              </div>
            </div>

            {/* Paintings */}
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Paintings (Painter Skill)</h3>
              <div class="p-4 bg-gray-50 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Number of Paintings</label>
                <input type="number" id="paintings" value="0" min="0" max="100"
                  class="w-full px-4 py-2 border rounded-lg text-center" />
                <p class="text-xs text-gray-500 mt-1">+5 VP each</p>
              </div>
            </div>

            {/* Multiplier */}
            <div class="mb-8">
              <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Multipliers</h3>
              <label class="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100">
                <input type="checkbox" id="elder-statesman" class="w-5 h-5" />
                <span>Elder Statesman (2x VP)</span>
                <span class="ml-auto font-bold text-yellow-600">x2</span>
              </label>
            </div>

            <button type="button" id="calculate-vp" class="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition">
              <i class="fas fa-calculator mr-2"></i>Calculate Total VP
            </button>
          </form>

          {/* Results */}
          <div id="vp-results" class="mt-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white text-center">
            <h2 class="text-lg font-medium mb-2">GRAND TOTAL</h2>
            <p id="total-vp" class="text-6xl font-bold">0 VP</p>
            <button id="print-certificate" class="mt-4 bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              <i class="fas fa-print mr-2"></i>Print Certificate
            </button>
          </div>
        </div>
      </main>
    </div>,
    { title: 'Victory Points - Oregon Trail' }
  )
})

// Reference Guide
app.get('/reference', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition">
            <i class="fas fa-arrow-left"></i>
          </a>
          <h1 class="text-2xl font-bold">📚 Reference Guide</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Effects */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-heart-broken text-red-600"></i> Status Effects
            </h2>
            <div class="mb-6">
              <h3 class="font-bold text-red-600 mb-3">Negative Effects</h3>
              <div class="space-y-2">
                {STATUS_EFFECTS.negative.map(effect => (
                  <div class="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <span class="text-2xl">{effect.icon}</span>
                    <div>
                      <span class="font-medium">{effect.name}</span>
                      <p class="text-sm text-gray-600">{effect.effect}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 class="font-bold text-green-600 mb-3">Positive Effects</h3>
              <div class="space-y-2">
                {STATUS_EFFECTS.positive.map(effect => (
                  <div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <span class="text-2xl">{effect.icon}</span>
                    <div>
                      <span class="font-medium">{effect.name}</span>
                      <p class="text-sm text-gray-600">{effect.effect}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enemies */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-skull text-gray-600"></i> Enemies
            </h2>
            <div class="space-y-3">
              {ENEMIES.map(enemy => (
                <div class="p-4 border rounded-lg hover:border-red-300 transition">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-bold text-gray-800">{enemy.name}</span>
                    <span class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">{enemy.hp} HP</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs bg-gray-200 px-2 py-1 rounded">Level {enemy.level}</span>
                    {enemy.abilities.map(ability => (
                      <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{ability}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanical Skill */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-wrench text-blue-600"></i> Wagon Repair (Mechanical)
            </h2>
            <table class="w-full">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-2 text-left">Skill Level</th>
                  <th class="px-4 py-2 text-left">Fix Chance/Day</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="px-4 py-3">No Skill</td>
                  <td class="px-4 py-3 font-bold text-red-600">10%</td>
                </tr>
                <tr class="border-b">
                  <td class="px-4 py-3">Mechanical 1</td>
                  <td class="px-4 py-3 font-bold text-yellow-600">50%</td>
                </tr>
                <tr>
                  <td class="px-4 py-3">Mechanical 3</td>
                  <td class="px-4 py-3 font-bold text-green-600">95%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Trail Stops */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-green-600"></i> Trail Stops
            </h2>
            <div class="space-y-2">
              {TRAIL_STOPS.map((stop, index) => (
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      stop.type === 'start' ? 'bg-green-600' :
                      stop.type === 'end' ? 'bg-red-600' :
                      stop.type === 'fort' ? 'bg-blue-600' :
                      'bg-yellow-600'
                    }`}>{index + 1}</span>
                    <div>
                      <span class="font-medium">{stop.name}</span>
                      <p class="text-xs text-gray-500">{stop.description}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="text-sm font-bold">{stop.distance} mi</span>
                    <p class="text-xs text-gray-500">{stop.daysFromPrev} days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>,
    { title: 'Reference Guide - Oregon Trail' }
  )
})

// Presentation Mode
app.get('/present', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-b from-sky-400 to-green-600">
      <div class="max-w-6xl mx-auto p-8 text-center text-white">
        <h1 class="text-6xl font-bold mb-8 drop-shadow-lg">🚂 The Oregon Trail</h1>
        <p class="text-2xl mb-12">Westward Ho! Begin Your Journey</p>
        
        <div class="grid grid-cols-3 gap-8 mb-12">
          <a href="/present/job" class="bg-white/20 backdrop-blur rounded-2xl p-8 hover:bg-white/30 transition cursor-pointer">
            <i class="fas fa-briefcase text-5xl mb-4"></i>
            <h3 class="text-2xl font-bold">Job Classes</h3>
          </a>
          <a href="/dice" class="bg-white/20 backdrop-blur rounded-2xl p-8 hover:bg-white/30 transition cursor-pointer">
            <i class="fas fa-dice text-5xl mb-4"></i>
            <h3 class="text-2xl font-bold">Roll Dice</h3>
          </a>
          <a href="/store" class="bg-white/20 backdrop-blur rounded-2xl p-8 hover:bg-white/30 transition cursor-pointer">
            <i class="fas fa-store text-5xl mb-4"></i>
            <h3 class="text-2xl font-bold">General Store</h3>
          </a>
        </div>

        <div class="bg-black/20 backdrop-blur rounded-2xl p-6 inline-block">
          <p class="text-lg">Trail Map: Independence, MO → Oregon City</p>
          <p class="text-4xl font-bold mt-2">1,932 Miles</p>
        </div>
      </div>
    </div>,
    { title: 'Presentation - Oregon Trail' }
  )
})

// ============ API ROUTES ============

// Get all game data
app.get('/api/game-data', (c) => {
  return c.json({
    jobClasses: JOB_CLASSES,
    nationalities: NATIONALITIES,
    religions: RELIGIONS,
    supplies: SUPPLIES,
    inflationRates: INFLATION_RATES,
    trailStops: TRAIL_STOPS,
    randomEvents: RANDOM_EVENTS,
    huntingResults: HUNTING_RESULTS,
    fishingResults: FISHING_RESULTS,
    enemies: ENEMIES,
    statusEffects: STATUS_EFFECTS,
    skills: SKILLS,
    vpRewards: VP_REWARDS
  })
})

// Roll dice
app.get('/api/roll/:type', (c) => {
  const type = c.req.param('type')
  let max = 6
  
  switch(type) {
    case 'd100': max = 100; break
    case 'd20': max = 20; break
    case 'd12': max = 12; break
    case 'd6': max = 6; break
    case 'd4': max = 4; break
    default: max = parseInt(type.replace('d', '')) || 6
  }
  
  const result = Math.floor(Math.random() * max) + 1
  
  // Find matching event for d100
  let event = null
  if (type === 'd100') {
    event = RANDOM_EVENTS.find(e => result >= e.roll[0] && result <= e.roll[1])
  } else if (type === 'd20') {
    event = HUNTING_RESULTS.find(e => result >= e.roll[0] && result <= e.roll[1])
  } else if (type === 'd12') {
    event = FISHING_RESULTS.find(e => result >= e.roll[0] && result <= e.roll[1])
  }
  
  return c.json({ roll: result, max, event })
})

// Create new game
app.post('/api/games', async (c) => {
  const body = await c.req.json()
  const id = crypto.randomUUID()
  
  const game: Game = {
    id,
    name: body.name || `Game ${id.substring(0, 8)}`,
    className: body.className,
    period: body.period,
    difficulty: body.difficulty || 'standard',
    startDate: body.startDate || new Date().toISOString(),
    currentDay: 1,
    wagonTrains: [],
    status: 'setup'
  }
  
  // Create wagon trains
  const numTrains = body.numTrains || 6
  for (let i = 0; i < numTrains; i++) {
    game.wagonTrains.push({
      id: crypto.randomUUID(),
      name: `Wagon Train ${i + 1}`,
      currentLocation: 'independence',
      currentLocationIndex: 0,
      daysTraveled: 0,
      characters: [],
      inventory: [],
      cash: 0,
      vp: 0,
      status: 'active'
    })
  }
  
  games.set(id, game)
  return c.json(game)
})

// Get all games
app.get('/api/games', (c) => {
  return c.json(Array.from(games.values()))
})

// Get single game
app.get('/api/games/:id', (c) => {
  const id = c.req.param('id')
  const game = games.get(id)
  if (!game) {
    return c.json({ error: 'Game not found' }, 404)
  }
  return c.json(game)
})

// Calculate travel
app.post('/api/calculate-travel', async (c) => {
  const body = await c.req.json()
  const { fromIndex, toIndex, baseSpeed, modifiers, timeMultiplier, partySize } = body
  
  let totalDistance = 0
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    totalDistance += TRAIL_STOPS[i].distance
  }
  
  const adjustedSpeed = Math.max(1, baseSpeed + (modifiers || 0))
  const baseDays = Math.ceil(totalDistance / adjustedSpeed)
  const actualDays = baseDays * (timeMultiplier || 1)
  const foodNeeded = actualDays * (partySize || 4)
  
  return c.json({
    distance: totalDistance,
    speed: adjustedSpeed,
    days: actualDays,
    foodNeeded
  })
})

// Calculate Victory Points
app.post('/api/calculate-vp', async (c) => {
  const body = await c.req.json()
  let total = 0
  
  if (body.reachedOregon) total += VP_REWARDS.reachOregon
  total += (body.survivingSpouses || 0) * VP_REWARDS.survivingSpouse
  total += (body.survivingChildren || 0) * VP_REWARDS.survivingChild
  total += Math.floor((body.totalWealth || 0) / 10) * VP_REWARDS.wealthPer10
  total += (body.paintings || 0) * VP_REWARDS.paintingPer
  
  if (body.vikingRune) total += VP_REWARDS.vikingRune
  if (body.indianMummy) total += VP_REWARDS.indianMummy
  if (body.sasquatch) total += VP_REWARDS.sasquatch
  if (body.jackalope) total += VP_REWARDS.jackalope
  
  if (body.elderStatesman) total *= 2
  
  return c.json({ total })
})

export default app
