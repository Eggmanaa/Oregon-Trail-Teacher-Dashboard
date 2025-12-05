import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import api from './routes/api'
import { 
  ALL_JOBS, NATIONALITIES, RELIGIONS, SUPPLIES, TRAIL_STOPS,
  RANDOM_EVENTS, HUNTING_RESULTS, FISHING_RESULTS, ENEMIES,
  STATUS_EFFECTS, SKILLS, VP_REWARDS, TRADING_POSTS, NATIVE_VILLAGES,
  TREASURES, TESLA_GUN_RESULTS, HEALTH_LEVELS, FUND_LEVELS,
  WAGON_PROBLEMS, BARTER_ITEMS
} from './data/gameData'

type Bindings = { DB: D1Database }
const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)
app.use('/api/*', cors())
app.route('/api', api)

// ============ PAGES ============

// Dashboard Home
app.get('/', async (c) => {
  const { DB } = c.env
  let games: any[] = []
  
  try {
    const result = await DB.prepare(`
      SELECT g.*, (SELECT COUNT(*) FROM wagon_trains WHERE game_id = g.id) as wagon_count
      FROM games g WHERE g.status = 'active' ORDER BY g.created_at DESC
    `).all()
    games = result.results || []
  } catch (e) {
    // DB not available, continue with empty games
  }
  
  return c.render(
    <div class="min-h-screen">
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
            <a href="/worksheet" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-file-alt"></i> Worksheet
            </a>
            <a href="/reference" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-book"></i> Reference
            </a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Quick Actions - Row 1 */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <a href="/new-game" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-green-600">
            <div class="flex items-center gap-4">
              <div class="bg-green-100 p-3 rounded-lg"><i class="fas fa-flag-checkered text-green-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Start New Game</h3><p class="text-sm text-gray-500">Create a new simulation</p></div>
            </div>
          </a>
          <a href="/characters" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-blue-600">
            <div class="flex items-center gap-4">
              <div class="bg-blue-100 p-3 rounded-lg"><i class="fas fa-users text-blue-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Character Creator</h3><p class="text-sm text-gray-500">Jobs, nationalities, skills</p></div>
            </div>
          </a>
          <a href="/store" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-yellow-600">
            <div class="flex items-center gap-4">
              <div class="bg-yellow-100 p-3 rounded-lg"><i class="fas fa-store text-yellow-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Supply Market</h3><p class="text-sm text-gray-500">Independence prices</p></div>
            </div>
          </a>
          <a href="/dice" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-red-600">
            <div class="flex items-center gap-4">
              <div class="bg-red-100 p-3 rounded-lg"><i class="fas fa-dice text-red-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Dice Roller</h3><p class="text-sm text-gray-500">Events, hunting, fishing</p></div>
            </div>
          </a>
        </div>

        {/* Quick Actions - Row 2 */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <a href="/trading-posts" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-purple-600">
            <div class="flex items-center gap-4">
              <div class="bg-purple-100 p-3 rounded-lg"><i class="fas fa-campground text-purple-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Trading Posts</h3><p class="text-sm text-gray-500">Forts & native villages</p></div>
            </div>
          </a>
          <a href="/combat" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-red-800">
            <div class="flex items-center gap-4">
              <div class="bg-red-100 p-3 rounded-lg"><i class="fas fa-fist-raised text-red-800 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Battle Simulator</h3><p class="text-sm text-gray-500">Full combat simulation</p></div>
            </div>
          </a>
          <a href="/travel" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-teal-600">
            <div class="flex items-center gap-4">
              <div class="bg-teal-100 p-3 rounded-lg"><i class="fas fa-route text-teal-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Travel Calculator</h3><p class="text-sm text-gray-500">Distance, time & wagon rolls</p></div>
            </div>
          </a>
          <a href="/victory" class="bg-white rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-amber-600">
            <div class="flex items-center gap-4">
              <div class="bg-amber-100 p-3 rounded-lg"><i class="fas fa-trophy text-amber-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Victory Points</h3><p class="text-sm text-gray-500">Calculate final score</p></div>
            </div>
          </a>
        </div>

        {/* Active Games with Wagon Tracking */}
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-gamepad text-green-600"></i> Active Classes / Simulations
            </h2>
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {games.length} Active
            </span>
          </div>
          
          {games.length === 0 ? (
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-map text-6xl mb-4 opacity-30"></i>
              <p class="text-lg">No active simulations</p>
              <p class="text-sm">Start a new game to begin tracking wagon trains!</p>
              <a href="/new-game" class="inline-block mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                <i class="fas fa-plus mr-2"></i>Create New Game
              </a>
            </div>
          ) : (
            <div class="space-y-4">
              {games.map((game: any) => (
                <a href={`/game/${game.id}`} class="block border rounded-lg p-4 hover:border-green-500 hover:bg-green-50 transition">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-bold text-gray-800">{game.class_name} - Period {game.period}</h3>
                      <p class="text-sm text-gray-500">Started: {game.start_date} | Day {game.current_day}</p>
                    </div>
                    <div class="flex items-center gap-4">
                      <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {game.wagon_count} wagon trains
                      </span>
                      <button 
                        onclick={`event.preventDefault(); if(confirm('Delete this game?')) fetch('/api/games/${game.id}', {method:'DELETE'}).then(() => location.reload())`}
                        class="text-red-500 hover:text-red-700 p-2"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Trail Map */}
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-route text-trail-brown"></i> The Oregon Trail
          </h2>
          <div class="overflow-x-auto">
            <div class="flex items-center gap-2 min-w-max pb-4">
              {TRAIL_STOPS.map((stop, index) => (
                <div class="flex items-center">
                  <div class="flex flex-col items-center min-w-[90px]">
                    <div class={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow ${
                      stop.type === 'start' ? 'bg-green-600' :
                      stop.type === 'end' ? 'bg-red-600' :
                      stop.type === 'fort' ? 'bg-blue-600' :
                      stop.type === 'village' ? 'bg-purple-600' :
                      stop.type === 'mission' ? 'bg-amber-600' :
                      'bg-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <p class="text-xs text-center mt-1 font-medium leading-tight">{stop.name}</p>
                    <p class="text-xs text-gray-400">{stop.distance}mi</p>
                  </div>
                  {index < TRAIL_STOPS.length - 1 && (
                    <div class="w-8 h-1 bg-amber-700 mx-1"></div>
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

// New Game Page
app.get('/new-game', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
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
              <input type="text" id="className" name="className" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., US History" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-clock mr-2"></i>Period
              </label>
              <input type="text" id="period" name="period" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 3" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-calendar mr-2"></i>Start Date
              </label>
              <input type="date" id="startDate" name="startDate" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-users mr-2"></i>Number of Wagon Trains
              </label>
              <input type="number" id="numTrains" name="numTrains" min="1" max="20" value="6" required
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div id="wagon-names-section" class="mb-8">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              <i class="fas fa-signature mr-2"></i>Wagon Train Names (Optional)
            </label>
            <div id="wagon-names-container" class="grid grid-cols-2 md:grid-cols-3 gap-3">
            </div>
          </div>

          <div id="form-error" class="hidden mb-4 p-4 bg-red-100 text-red-700 rounded-lg"></div>
          <div id="form-success" class="hidden mb-4 p-4 bg-green-100 text-green-700 rounded-lg"></div>

          <div class="flex gap-4">
            <button type="submit" id="submit-btn" class="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              <i class="fas fa-flag-checkered mr-2"></i>Create Simulation
            </button>
            <a href="/" class="px-6 py-3 border rounded-lg hover:bg-gray-50 transition text-center">Cancel</a>
          </div>
        </form>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        const numTrainsInput = document.getElementById('numTrains');
        const container = document.getElementById('wagon-names-container');
        
        function updateWagonInputs() {
          const num = parseInt(numTrainsInput.value) || 6;
          container.innerHTML = '';
          for (let i = 0; i < num; i++) {
            container.innerHTML += '<input type="text" name="wagonName' + i + '" placeholder="Wagon Train ' + (i+1) + '" class="px-3 py-2 border rounded-lg text-sm" />';
          }
        }
        
        numTrainsInput.addEventListener('change', updateWagonInputs);
        updateWagonInputs();
        
        document.getElementById('new-game-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const btn = document.getElementById('submit-btn');
          const errorDiv = document.getElementById('form-error');
          const successDiv = document.getElementById('form-success');
          
          btn.disabled = true;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating...';
          errorDiv.classList.add('hidden');
          successDiv.classList.add('hidden');
          
          const wagonNames = [];
          const numTrains = parseInt(document.getElementById('numTrains').value);
          for (let i = 0; i < numTrains; i++) {
            const input = document.querySelector('input[name="wagonName' + i + '"]');
            wagonNames.push(input?.value || 'Wagon Train ' + (i+1));
          }
          
          try {
            const res = await fetch('/api/games', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                className: document.getElementById('className').value,
                period: document.getElementById('period').value,
                startDate: document.getElementById('startDate').value,
                numTrains: numTrains,
                wagonNames: wagonNames
              })
            });
            
            if (!res.ok) throw new Error('Failed to create game');
            
            const game = await res.json();
            successDiv.textContent = 'Game created successfully! Redirecting...';
            successDiv.classList.remove('hidden');
            
            setTimeout(() => { window.location.href = '/game/' + game.id; }, 1000);
          } catch (err) {
            errorDiv.textContent = 'Error creating game. Please try again.';
            errorDiv.classList.remove('hidden');
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-flag-checkered mr-2"></i>Create Simulation';
          }
        });
      `}} />
    </div>,
    { title: 'New Game - Oregon Trail' }
  )
})

// Game Detail Page (Wagon Train Tracker)
app.get('/game/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  let game: any = null
  let trains: any[] = []
  
  try {
    game = await DB.prepare('SELECT * FROM games WHERE id = ?').bind(id).first()
    if (!game) return c.redirect('/')
    
    const result = await DB.prepare('SELECT * FROM wagon_trains WHERE game_id = ? ORDER BY name').bind(id).all()
    trains = result.results || []
  } catch (e) {
    return c.redirect('/')
  }
  
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
            <div>
              <h1 class="text-2xl font-bold">{game.class_name} - Period {game.period}</h1>
              <p class="text-green-200 text-sm">Day {game.current_day} | Started: {game.start_date}</p>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Trail Progress Map */}
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 class="text-lg font-bold text-gray-800 mb-4">Trail Progress</h2>
          <div class="overflow-x-auto">
            <div class="flex items-start gap-1 min-w-max pb-4">
              {TRAIL_STOPS.map((stop, index) => {
                const trainsHere = trains.filter((t: any) => t.current_location_index === index)
                return (
                  <div class="flex items-start">
                    <div class="flex flex-col items-center min-w-[80px]">
                      <div class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        stop.type === 'start' ? 'bg-green-600' :
                        stop.type === 'end' ? 'bg-red-600' :
                        stop.type === 'fort' ? 'bg-blue-600' :
                        'bg-gray-500'
                      }`}>{index + 1}</div>
                      <p class="text-xs text-center mt-1 font-medium leading-tight">{stop.name}</p>
                      {trainsHere.length > 0 && (
                        <div class="mt-2 space-y-1">
                          {trainsHere.map((t: any) => (
                            <div class="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium">
                              🚂 {t.name.replace('Wagon Train ', 'WT')}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {index < TRAIL_STOPS.length - 1 && <div class="w-6 h-1 bg-amber-700 mt-4"></div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Wagon Trains Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trains.map((train: any) => (
            <div class="bg-white rounded-xl shadow-md p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-800">{train.name}</h3>
                <span class={`px-2 py-1 rounded text-xs font-medium ${
                  train.status === 'arrived' ? 'bg-green-100 text-green-700' :
                  train.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{train.status}</span>
              </div>
              
              <div class="flex gap-2 mt-2">
                <select 
                  id={`location-${train.id}`}
                  class="flex-1 px-2 py-1 border rounded text-sm"
                  value={train.current_location_index}
                >
                  {TRAIL_STOPS.map((stop, idx) => (
                    <option value={idx} selected={idx === train.current_location_index}>{stop.name}</option>
                  ))}
                </select>
                <button 
                  onclick={`updateTrainLocation('${train.id}')`}
                  class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        async function updateTrainLocation(trainId) {
          const select = document.getElementById('location-' + trainId);
          const newIndex = parseInt(select.value);
          
          try {
            await fetch('/api/wagon-trains/' + trainId, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                currentLocationIndex: newIndex,
                currentLocationId: '${JSON.stringify(TRAIL_STOPS)}'[newIndex]?.id
              })
            });
            location.reload();
          } catch (err) {
            alert('Failed to update location');
          }
        }
      `}} />
    </div>,
    { title: `${game.class_name} - Oregon Trail` }
  )
})

// Character Creator Page
app.get('/characters', (c) => {
  const categories = [...new Set(ALL_JOBS.map(j => j.category))]
  
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">Character Creation Guide</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Random Selector */}
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold mb-2">Random Character Generator</h2>
              <p class="text-purple-200">Click to randomly select a job and nationality</p>
            </div>
            <button id="randomize-btn" class="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              <i class="fas fa-random mr-2"></i>Randomize!
            </button>
          </div>
          <div id="random-result" class="mt-4 p-4 bg-white/20 rounded-lg hidden">
            <p class="font-bold text-lg" id="random-job"></p>
            <p id="random-nationality"></p>
          </div>
        </div>

        {/* Health & Fund Reference */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-heart text-red-600"></i> Health Levels
            </h3>
            <div class="grid grid-cols-2 gap-2">
              {Object.entries(HEALTH_LEVELS).map(([level, hp]) => (
                <div class="flex justify-between p-2 bg-gray-50 rounded">
                  <span class="text-sm">{level}</span>
                  <span class="font-bold text-red-600">{hp} HP</span>
                </div>
              ))}
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-coins text-yellow-600"></i> Fund Levels
            </h3>
            <div class="grid grid-cols-2 gap-2">
              {Object.entries(FUND_LEVELS).map(([level, amount]) => (
                <div class="flex justify-between p-2 bg-gray-50 rounded">
                  <span class="text-sm">{level}</span>
                  <span class="font-bold text-green-600">${amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Jobs - Single List */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-briefcase text-blue-600"></i> All Jobs ({ALL_JOBS.length} total)
          </h2>
          
          {categories.map(category => (
            <div class="mb-6">
              <h3 class="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">{category}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_JOBS.filter(j => j.category === category).map(job => (
                  <div class="border rounded-lg p-4 hover:border-blue-400 transition">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-bold text-gray-800">{job.name}</h4>
                      <span class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">{job.health} HP</span>
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
          ))}
        </div>

        {/* Nationalities */}
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-globe text-green-600"></i> Nationalities ({NATIONALITIES.length})
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {NATIONALITIES.map(nat => (
              <div class="border rounded-lg p-3 hover:border-green-400 transition">
                <h4 class="font-medium text-gray-800 text-sm mb-2">{nat.name}</h4>
                <div class="flex flex-wrap gap-1">
                  {nat.bonuses.map(bonus => (
                    <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{bonus}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Religions */}
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-church text-purple-600"></i> Religions
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RELIGIONS.map(rel => (
              <div class="border rounded-lg p-4 hover:border-purple-400 transition">
                <h4 class="font-bold text-gray-800 mb-2">{rel.name}</h4>
                <p class="text-sm text-gray-600 mb-2">{rel.effect}</p>
                <div class="text-xs space-y-1">
                  <p><strong>Fort Bonus:</strong> {rel.fortBonus}</p>
                  <p><strong>Tribal Relations:</strong> {rel.tribalRelation}</p>
                  <p><strong>Special:</strong> {rel.specialAbility}</p>
                  {rel.restrictions.length > 0 && (
                    <p class="text-red-600"><strong>Restrictions:</strong> {rel.restrictions.join(', ')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        const jobs = ${JSON.stringify(ALL_JOBS)};
        const nationalities = ${JSON.stringify(NATIONALITIES)};
        
        document.getElementById('randomize-btn').addEventListener('click', () => {
          const job = jobs[Math.floor(Math.random() * jobs.length)];
          const nat = nationalities[Math.floor(Math.random() * nationalities.length)];
          
          document.getElementById('random-job').textContent = job.name + ' (' + job.category + ') - $' + job.funds + ', ' + job.health + ' HP';
          document.getElementById('random-nationality').textContent = nat.name + ': ' + nat.bonuses.join(', ');
          document.getElementById('random-result').classList.remove('hidden');
        });
      `}} />
    </div>,
    { title: 'Character Creator - Oregon Trail' }
  )
})

// Continue with more routes in next part...
// Dice Roller Page
app.get('/dice', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">Dice Roller & Events</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Dice Rollers - No Combat d6 */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* d100 - Random Events */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>Random Event (d100)
            </h3>
            <div id="d100-result" class="text-6xl font-bold text-purple-600 mb-4">--</div>
            <button id="roll-d100" class="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition">
              Roll d100
            </button>
            <div id="d100-event" class="mt-4 p-4 bg-gray-50 rounded-lg text-left hidden">
              <h4 id="d100-event-name" class="font-bold text-gray-800"></h4>
              <p id="d100-event-desc" class="text-sm text-gray-600 mt-1"></p>
            </div>
          </div>

          {/* d22 - Hunting */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-crosshairs text-green-600 mr-2"></i>Hunting (d22)
            </h3>
            <div id="d22-result" class="text-6xl font-bold text-green-600 mb-4">--</div>
            <button id="roll-d22" class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
              Roll d22
            </button>
            <div id="d22-event" class="mt-4 p-4 bg-gray-50 rounded-lg text-left hidden">
              <h4 id="d22-event-name" class="font-bold text-gray-800"></h4>
              <p id="d22-event-desc" class="text-sm text-gray-600 mt-1"></p>
            </div>
          </div>

          {/* d12 - Fishing */}
          <div class="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 class="text-lg font-bold text-gray-800 mb-4">
              <i class="fas fa-fish text-blue-600 mr-2"></i>Fishing (d12)
            </h3>
            <div id="d12-result" class="text-6xl font-bold text-blue-600 mb-4">--</div>
            <button id="roll-d12" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Roll d12
            </button>
            <div id="d12-event" class="mt-4 p-4 bg-gray-50 rounded-lg text-left hidden">
              <h4 id="d12-event-name" class="font-bold text-gray-800"></h4>
              <p id="d12-event-desc" class="text-sm text-gray-600 mt-1"></p>
            </div>
          </div>
        </div>

        {/* Tesla Gun */}
        <div class="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold mb-2">⚡ Tesla Gun (d10)</h3>
              <p class="text-sm opacity-90">Famous Inventor is immune to negative self-effects!</p>
            </div>
            <div class="text-center">
              <div id="d10-result" class="text-5xl font-bold mb-2">--</div>
              <button id="roll-d10" class="bg-white text-yellow-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
                Fire Tesla Gun!
              </button>
            </div>
          </div>
          <div id="d10-event" class="mt-4 p-4 bg-white/20 rounded-lg hidden">
            <p id="d10-event-desc" class="font-bold"></p>
          </div>
        </div>

        {/* Tables */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hunting Table */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Hunting Table (d22)</h2>
            <div class="overflow-y-auto max-h-96">
              <table class="w-full text-sm">
                <thead class="sticky top-0 bg-white">
                  <tr class="bg-gray-100">
                    <th class="px-3 py-2 text-left">Roll</th>
                    <th class="px-3 py-2 text-left">Result</th>
                    <th class="px-3 py-2 text-left">Meat</th>
                    <th class="px-3 py-2 text-left">Special</th>
                  </tr>
                </thead>
                <tbody>
                  {HUNTING_RESULTS.map(r => (
                    <tr class={`border-b ${r.type === 'Danger' || r.type === 'Predator' ? 'bg-red-50' : r.type === 'Special' ? 'bg-yellow-50' : ''}`}>
                      <td class="px-3 py-2 font-mono font-bold">{r.roll}</td>
                      <td class="px-3 py-2 font-medium">{r.name}</td>
                      <td class="px-3 py-2">{r.meat || '-'}</td>
                      <td class="px-3 py-2 text-xs">{r.effect || (r.fur ? `${r.furCount || 1} fur` : '') || (r.combat ? `FIGHT!` : '-')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fishing Table */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Fishing Table (d12)</h2>
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
                {FISHING_RESULTS.map(r => (
                  <tr class={`border-b ${r.fur ? 'bg-purple-50' : ''}`}>
                    <td class="px-3 py-2 font-mono font-bold">{r.roll}</td>
                    <td class="px-3 py-2 font-medium">{r.name}</td>
                    <td class="px-3 py-2">{r.meat || '-'}</td>
                    <td class="px-3 py-2">{r.fur ? `${r.furCount} fur` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p class="mt-4 text-sm text-gray-500 bg-blue-50 p-3 rounded">
              <i class="fas fa-info-circle mr-1"></i>
              <strong>Fishing skill</strong> = 2x meat from all catches!
            </p>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        async function rollDice(type, resultId, eventId, nameId, descId) {
          const resultEl = document.getElementById(resultId);
          const eventEl = document.getElementById(eventId);
          
          resultEl.classList.add('dice-roll');
          
          const res = await fetch('/api/roll/' + type);
          const data = await res.json();
          
          setTimeout(() => {
            resultEl.textContent = data.roll;
            resultEl.classList.remove('dice-roll');
            
            if (data.event) {
              eventEl.classList.remove('hidden');
              if (nameId) document.getElementById(nameId).textContent = data.event.name;
              if (descId) {
                const desc = data.event.description || data.event.effect || 
                  (data.event.meat !== undefined ? 'Meat: ' + data.event.meat : '') +
                  (data.event.fur ? ' | Fur: ' + (data.event.furCount || 1) : '') +
                  (data.event.combat ? ' | COMBAT REQUIRED!' : '');
                document.getElementById(descId).textContent = desc || data.event.result || '';
              }
            } else {
              eventEl.classList.add('hidden');
            }
          }, 300);
        }
        
        document.getElementById('roll-d100').onclick = () => rollDice('d100', 'd100-result', 'd100-event', 'd100-event-name', 'd100-event-desc');
        document.getElementById('roll-d22').onclick = () => rollDice('d22', 'd22-result', 'd22-event', 'd22-event-name', 'd22-event-desc');
        document.getElementById('roll-d12').onclick = () => rollDice('d12', 'd12-result', 'd12-event', 'd12-event-name', 'd12-event-desc');
        document.getElementById('roll-d10').onclick = () => rollDice('d10', 'd10-result', 'd10-event', null, 'd10-event-desc');
      `}} />
    </div>,
    { title: 'Dice Roller - Oregon Trail' }
  )
})

// Supply Store Page
app.get('/store', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">Supply Market - Independence, MO</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        <div class="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-6">
          <p class="text-yellow-800 font-medium">
            <i class="fas fa-info-circle mr-2"></i>
            Base prices at Independence. Each student starts with <strong>1 Conestoga Wagon</strong> and <strong>2 Oxen</strong> for FREE!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(SUPPLIES).map(([category, items]) => (
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-bold text-gray-800 mb-4 capitalize">{category}</h3>
              <div class="space-y-3">
                {items.map((item: any) => (
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span class="font-medium">{item.name}</span>
                      <p class="text-xs text-gray-500">{item.effect}</p>
                    </div>
                    <span class={`font-bold ${item.price === 0 ? 'text-blue-600' : 'text-green-600'}`}>
                      {item.price === 0 ? 'FREE' : `$${item.price}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>,
    { title: 'Supply Market - Oregon Trail' }
  )
})

// Trading Posts Page with Activity Roller
app.get('/trading-posts', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">Trading Posts & Native Villages</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        {/* Barter Items Reference */}
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-8">
          <h3 class="font-bold text-amber-800 mb-2">
            <i class="fas fa-exchange-alt mr-2"></i>Barter Items for Native Villages (No Cash Accepted!)
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {BARTER_ITEMS.map(item => (
              <div class="bg-white p-2 rounded text-sm">
                <span class="font-medium">{item.name}</span>
                <span class="text-amber-600 ml-1">({item.barterValue})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Native Villages */}
        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-campground text-purple-600"></i> Native American Villages (Barter Only)
        </h2>
        <div class="space-y-6 mb-8">
          {Object.entries(NATIVE_VILLAGES).map(([key, village]: [string, any]) => (
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-purple-600">
              <div class="bg-purple-700 p-4 text-white">
                <h3 class="text-xl font-bold">{village.name}</h3>
                <p class="text-purple-200 text-sm">Tribe: {village.tribe} | <strong>BARTER ONLY - NO CASH</strong></p>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-bold text-gray-800 mb-3">Available Items (Barter Value)</h4>
                    <div class="space-y-2">
                      {village.items.map((item: any) => (
                        <div class="flex justify-between p-2 bg-gray-50 rounded">
                          <span>{item.name}</span>
                          <span class="font-bold text-purple-600">Value: {item.barterValue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <h4 class="font-bold text-gray-800">Possible Activities</h4>
                      <button 
                        onclick={`rollActivity('${key}', ${village.activities.length})`}
                        class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition"
                      >
                        <i class="fas fa-dice mr-1"></i> Roll Activity
                      </button>
                    </div>
                    <ul class="space-y-2">
                      {village.activities.map((activity: string, idx: number) => (
                        <li id={`${key}-activity-${idx}`} class="p-2 bg-gray-50 rounded text-sm flex items-start gap-2">
                          <span class="bg-purple-100 text-purple-700 px-2 rounded font-mono">{idx + 1}</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                    <div id={`${key}-result`} class="mt-3 p-3 bg-purple-100 rounded-lg hidden">
                      <strong>Rolled Activity:</strong> <span id={`${key}-rolled`}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Forts / Trading Posts */}
        <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-fort-awesome text-blue-600"></i> Forts & Trading Posts (Cash)
        </h2>
        <div class="space-y-6">
          {Object.entries(TRADING_POSTS).map(([key, post]: [string, any]) => (
            <div class="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-600">
              <div class="bg-blue-700 p-4 text-white">
                <h3 class="text-xl font-bold">{post.name}</h3>
                {post.diseaseRisk && (
                  <p class="text-red-200 text-sm">⚠️ {post.diseaseRisk.chance}% chance of {post.diseaseRisk.type}!</p>
                )}
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-bold text-gray-800 mb-3">Available Items</h4>
                    <div class="space-y-2 max-h-64 overflow-y-auto">
                      {post.items.map((item: any) => (
                        <div class="flex justify-between p-2 bg-gray-50 rounded">
                          <span>{item.name} {item.sellOnly ? '(sell)' : ''}</span>
                          <div class="text-right">
                            <span class="font-bold text-green-600">${item.price}</span>
                            <span class="text-gray-400 text-xs ml-2">x{item.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <h4 class="font-bold text-gray-800">Possible Activities</h4>
                      <button 
                        onclick={`rollActivity('${key}', ${post.activities.length})`}
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                      >
                        <i class="fas fa-dice mr-1"></i> Roll Activity
                      </button>
                    </div>
                    <ul class="space-y-2">
                      {post.activities.map((activity: string, idx: number) => (
                        <li id={`${key}-activity-${idx}`} class="p-2 bg-gray-50 rounded text-sm flex items-start gap-2">
                          <span class="bg-blue-100 text-blue-700 px-2 rounded font-mono">{idx + 1}</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                    <div id={`${key}-result`} class="mt-3 p-3 bg-blue-100 rounded-lg hidden">
                      <strong>Rolled Activity:</strong> <span id={`${key}-rolled`}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        function rollActivity(locationKey, numActivities) {
          const roll = Math.floor(Math.random() * numActivities);
          
          // Reset all highlights
          for (let i = 0; i < numActivities; i++) {
            const el = document.getElementById(locationKey + '-activity-' + i);
            if (el) el.classList.remove('bg-yellow-200', 'ring-2', 'ring-yellow-500');
          }
          
          // Highlight rolled activity
          const rolledEl = document.getElementById(locationKey + '-activity-' + roll);
          if (rolledEl) {
            rolledEl.classList.add('bg-yellow-200', 'ring-2', 'ring-yellow-500');
            
            // Show result
            const resultDiv = document.getElementById(locationKey + '-result');
            const rolledSpan = document.getElementById(locationKey + '-rolled');
            if (resultDiv && rolledSpan) {
              rolledSpan.textContent = rolledEl.textContent;
              resultDiv.classList.remove('hidden');
            }
          }
        }
      `}} />
    </div>,
    { title: 'Trading Posts - Oregon Trail' }
  )
})

// Combat Arena with Battle Simulation
app.get('/combat', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-b from-red-900 to-gray-900">
      <header class="bg-black/30 text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">⚔️ Battle Simulator</h1>
        </div>
      </header>

      <main class="max-w-6xl mx-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Party Side */}
          <div class="bg-black/40 rounded-xl p-6 text-white">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <i class="fas fa-users text-blue-400"></i> Wagon Party
            </h2>
            <div id="party-list" class="space-y-2 mb-4 min-h-[100px]"></div>
            
            <div class="border-t border-gray-600 pt-4">
              <h3 class="font-medium mb-2">Add Party Member</h3>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <input type="text" id="party-name" placeholder="Name" class="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
                <input type="number" id="party-hp" placeholder="HP" value="3" min="1" class="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
              </div>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <select id="party-weapon" class="px-3 py-2 bg-gray-800 border border-gray-600 rounded">
                  <option value="1">Unarmed (1 dmg)</option>
                  <option value="1">Pistol (1 dmg)</option>
                  <option value="2" selected>Rifle (2 dmg)</option>
                  <option value="3">Shotgun (3 dmg)</option>
                </select>
                <button onclick="addPartyMember()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                  <i class="fas fa-plus mr-1"></i> Add
                </button>
              </div>
            </div>
          </div>

          {/* Enemy Side */}
          <div class="bg-black/40 rounded-xl p-6 text-white">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
              <i class="fas fa-skull text-red-400"></i> Enemies
            </h2>
            <div id="enemy-list" class="space-y-2 mb-4 min-h-[100px]"></div>
            
            <div class="border-t border-gray-600 pt-4">
              <h3 class="font-medium mb-2">Add Enemy</h3>
              <select id="enemy-select" class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded mb-2">
                {ENEMIES.map(e => (
                  <option value={JSON.stringify(e)}>{e.name} (HP: {e.hp}, Dmg: {e.damage})</option>
                ))}
              </select>
              <button onclick="addEnemy()" class="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                <i class="fas fa-plus mr-1"></i> Add Enemy
              </button>
            </div>
          </div>
        </div>

        {/* Battle Button */}
        <div class="text-center mb-8">
          <button onclick="simulateBattle()" class="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-yellow-600 hover:to-red-600 transition shadow-lg">
            <i class="fas fa-swords mr-2"></i> SIMULATE BATTLE!
          </button>
        </div>

        {/* Battle Results */}
        <div id="battle-results" class="bg-black/40 rounded-xl p-6 text-white hidden">
          <h2 class="text-2xl font-bold mb-4 text-center" id="battle-outcome"></h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-900/50 p-4 rounded-lg text-center">
              <p class="text-sm text-blue-300">Surviving Party</p>
              <p class="text-3xl font-bold" id="surviving-party">0</p>
            </div>
            <div class="bg-gray-900/50 p-4 rounded-lg text-center">
              <p class="text-sm text-gray-300">Rounds</p>
              <p class="text-3xl font-bold" id="battle-rounds">0</p>
            </div>
            <div class="bg-red-900/50 p-4 rounded-lg text-center">
              <p class="text-sm text-red-300">Enemies Defeated</p>
              <p class="text-3xl font-bold" id="enemies-defeated">0</p>
            </div>
          </div>
          
          <div class="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-sm">
            <pre id="battle-log" class="whitespace-pre-wrap"></pre>
          </div>
        </div>

        {/* Enemy Reference */}
        <div class="mt-8 bg-black/40 rounded-xl p-6 text-white">
          <h2 class="text-xl font-bold mb-4">Enemy Reference</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {ENEMIES.map(e => (
              <div class="bg-gray-800 p-2 rounded">
                <span class="font-medium">{e.name}</span>
                <span class="text-red-400 ml-1">HP:{e.hp}</span>
                <span class="text-yellow-400 ml-1">Dmg:{e.damage}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        let party = [];
        let enemies = [];
        
        function renderParty() {
          const list = document.getElementById('party-list');
          list.innerHTML = party.map((p, i) => 
            '<div class="flex items-center justify-between bg-blue-900/50 p-2 rounded">' +
            '<span>' + p.name + ' (HP:' + p.hp + ', Dmg:' + p.damage + ')</span>' +
            '<button onclick="removeParty(' + i + ')" class="text-red-400 hover:text-red-300"><i class="fas fa-times"></i></button>' +
            '</div>'
          ).join('');
        }
        
        function renderEnemies() {
          const list = document.getElementById('enemy-list');
          list.innerHTML = enemies.map((e, i) => 
            '<div class="flex items-center justify-between bg-red-900/50 p-2 rounded">' +
            '<span>' + e.name + ' (HP:' + e.hp + ', Dmg:' + e.damage + ')</span>' +
            '<button onclick="removeEnemy(' + i + ')" class="text-red-400 hover:text-red-300"><i class="fas fa-times"></i></button>' +
            '</div>'
          ).join('');
        }
        
        function addPartyMember() {
          const name = document.getElementById('party-name').value || 'Settler';
          const hp = parseInt(document.getElementById('party-hp').value) || 3;
          const damage = parseInt(document.getElementById('party-weapon').value) || 1;
          party.push({ name, hp, damage });
          document.getElementById('party-name').value = '';
          renderParty();
        }
        
        function addEnemy() {
          const select = document.getElementById('enemy-select');
          const enemy = JSON.parse(select.value);
          enemies.push({ ...enemy });
          renderEnemies();
        }
        
        function removeParty(i) { party.splice(i, 1); renderParty(); }
        function removeEnemy(i) { enemies.splice(i, 1); renderEnemies(); }
        
        async function simulateBattle() {
          if (party.length === 0 || enemies.length === 0) {
            alert('Add at least one party member and one enemy!');
            return;
          }
          
          const res = await fetch('/api/simulate-combat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ party, enemies })
          });
          
          const result = await res.json();
          
          document.getElementById('battle-results').classList.remove('hidden');
          document.getElementById('battle-outcome').textContent = 
            result.outcome === 'victory' ? '🏆 VICTORY!' : 
            result.outcome === 'defeat' ? '💀 DEFEAT' : '⚔️ DRAW';
          document.getElementById('battle-outcome').className = 
            'text-2xl font-bold mb-4 text-center ' + 
            (result.outcome === 'victory' ? 'text-green-400' : 
             result.outcome === 'defeat' ? 'text-red-400' : 'text-yellow-400');
          document.getElementById('surviving-party').textContent = result.survivingParty.length;
          document.getElementById('battle-rounds').textContent = result.rounds;
          document.getElementById('enemies-defeated').textContent = result.casualties.enemies.length;
          document.getElementById('battle-log').textContent = result.battleLog.join('\\n');
        }
        
        renderParty();
        renderEnemies();
      `}} />
    </div>,
    { title: 'Battle Simulator - Oregon Trail' }
  )
})

// Travel Calculator with Wagon Roll
app.get('/travel', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">Travel Calculator</h1>
        </div>
      </header>

      <main class="max-w-4xl mx-auto p-8">
        {/* Wagon Problems Simulator */}
        <div class="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
          <h3 class="font-bold text-yellow-800 mb-4">
            <i class="fas fa-tools mr-2"></i>Wagon Problem Roll
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-yellow-800 mb-2">Terrain Type</label>
              <select id="terrain-type" class="w-full px-4 py-2 border rounded-lg">
                <option value="plains">Plains (10% chance)</option>
                <option value="mountains">Mountains (20% chance)</option>
                <option value="river">River Crossing (30% chance)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-yellow-800 mb-2">Mechanical Skill</label>
              <select id="mechanical-level" class="w-full px-4 py-2 border rounded-lg">
                <option value="0">None (10% repair)</option>
                <option value="1">Mechanical 1 (50% repair)</option>
                <option value="3">Mechanical 3 (95% repair)</option>
              </select>
            </div>
            <div class="flex items-end">
              <button onclick="rollWagonProblem()" class="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold hover:bg-yellow-700 transition">
                <i class="fas fa-dice mr-2"></i>Roll for Problems
              </button>
            </div>
          </div>
          <div id="wagon-result" class="p-4 bg-white rounded-lg hidden">
            <p id="wagon-result-text" class="font-bold"></p>
          </div>
        </div>

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

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Base Speed</label>
              <input type="number" id="base-speed" value="15" min="1" max="30"
                class="w-full px-4 py-2 border rounded-lg text-center font-bold" />
              <span class="text-xs text-gray-500">miles/day</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Party Size</label>
              <input type="number" id="party-size" value="4" min="1" max="20"
                class="w-full px-4 py-2 border rounded-lg text-center font-bold" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Speed Modifier</label>
              <input type="number" id="speed-mod" value="0" min="-10" max="10"
                class="w-full px-4 py-2 border rounded-lg text-center font-bold" />
              <span class="text-xs text-gray-500">+Horse/Travel skill</span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status Effect</label>
              <select id="status-effect" class="w-full px-4 py-2 border rounded-lg">
                <option value="normal">Normal</option>
                <option value="happy">Happy (2x speed)</option>
                <option value="depressed">Depressed (÷3 speed)</option>
                <option value="fear">Fear (÷3 speed)</option>
                <option value="angry">Angry (÷3 speed)</option>
              </select>
            </div>
          </div>

          <button onclick="calculateTravel()" class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
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
              <p class="text-sm text-gray-600">Adj. Speed</p>
              <p id="result-speed" class="text-2xl font-bold text-green-600">-- mi/day</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Travel Days</p>
              <p id="result-days" class="text-2xl font-bold text-yellow-600">--</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Food Needed</p>
              <p id="result-food" class="text-2xl font-bold text-red-600">-- units</p>
            </div>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        async function rollWagonProblem() {
          const terrain = document.getElementById('terrain-type').value;
          const mechLevel = parseInt(document.getElementById('mechanical-level').value);
          
          const res = await fetch('/api/wagon-roll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              terrain,
              hasMechanical: mechLevel > 0,
              mechanicalLevel: mechLevel
            })
          });
          
          const data = await res.json();
          const resultDiv = document.getElementById('wagon-result');
          const resultText = document.getElementById('wagon-result-text');
          
          resultDiv.classList.remove('hidden');
          
          if (!data.hasProblem) {
            resultDiv.className = 'p-4 bg-green-100 rounded-lg';
            resultText.className = 'font-bold text-green-700';
            resultText.textContent = '✅ No wagon problems! (Rolled ' + data.roll + ' vs ' + data.problemChance + '% chance)';
          } else {
            if (data.repairResult.success) {
              resultDiv.className = 'p-4 bg-yellow-100 rounded-lg';
              resultText.className = 'font-bold text-yellow-700';
              resultText.textContent = '🔧 Wagon broke down but REPAIRED! (Problem roll: ' + data.roll + ', Repair roll: ' + data.repairResult.roll + ' vs ' + data.repairResult.chance + '%)';
            } else {
              resultDiv.className = 'p-4 bg-red-100 rounded-lg';
              resultText.className = 'font-bold text-red-700';
              resultText.textContent = '❌ Wagon broke down and REPAIR FAILED! Lose 1 day. (Problem roll: ' + data.roll + ', Repair roll: ' + data.repairResult.roll + ' vs ' + data.repairResult.chance + '%)';
            }
          }
        }
        
        async function calculateTravel() {
          const fromIndex = parseInt(document.getElementById('travel-from').value);
          const toIndex = parseInt(document.getElementById('travel-to').value);
          const baseSpeed = parseInt(document.getElementById('base-speed').value);
          const modifiers = parseInt(document.getElementById('speed-mod').value);
          const partySize = parseInt(document.getElementById('party-size').value);
          const statusEffect = document.getElementById('status-effect').value;
          
          const res = await fetch('/api/calculate-travel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fromIndex, toIndex, baseSpeed, modifiers, statusEffect, partySize })
          });
          
          const data = await res.json();
          
          document.getElementById('result-distance').textContent = data.distance + ' mi';
          document.getElementById('result-speed').textContent = data.speed + ' mi/day';
          document.getElementById('result-days').textContent = data.actualDays + ' days';
          document.getElementById('result-food').textContent = data.foodNeeded + ' units';
        }
      `}} />
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
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">🏆 Victory Point Calculator</h1>
        </div>
      </header>

      <main class="max-w-4xl mx-auto p-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Base Points</h3>
            <label class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <input type="checkbox" id="reached-oregon" class="w-5 h-5" />
              <span class="font-medium">Reached Oregon City</span>
              <span class="ml-auto font-bold text-green-600">+{VP_REWARDS.reachOregon} VP</span>
            </label>
          </div>

          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Survivors</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Surviving Spouses</label>
                <input type="number" id="surviving-spouses" value="0" min="0" class="w-full px-4 py-2 border rounded-lg text-center" />
                <p class="text-xs text-gray-500 mt-1">+{VP_REWARDS.survivingSpouse} VP each</p>
              </div>
              <div class="p-4 bg-gray-50 rounded-lg">
                <label class="block text-sm font-medium text-gray-700 mb-2">Surviving Children</label>
                <input type="number" id="surviving-children" value="0" min="0" class="w-full px-4 py-2 border rounded-lg text-center" />
                <p class="text-xs text-gray-500 mt-1">+{VP_REWARDS.survivingChild} VP each</p>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Wealth (Total $)</h3>
            <input type="number" id="total-wealth" value="0" min="0" class="w-full px-4 py-2 border rounded-lg text-center text-xl" />
            <p class="text-xs text-gray-500 mt-1 text-center">Every $10 = 1 VP</p>
          </div>

          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Discoveries</h3>
            <div class="grid grid-cols-2 gap-3">
              {[
                { id: 'viking-rune', name: 'Viking Rune Stone', vp: VP_REWARDS.vikingRune },
                { id: 'indian-mummy', name: 'Indian Mummy', vp: VP_REWARDS.indianMummy },
                { id: 'sasquatch', name: 'Sasquatch Defeated', vp: VP_REWARDS.sasquatch },
                { id: 'jackalope', name: 'Jackalope', vp: VP_REWARDS.jackalope },
                { id: 'dead-alien', name: 'Dead Alien', vp: VP_REWARDS.deadAlien },
                { id: 'dinosaur-bones', name: 'Dinosaur Bones', vp: VP_REWARDS.dinosaurBones },
                { id: 'fountain-youth', name: 'Fountain of Youth', vp: VP_REWARDS.fountainOfYouth },
                { id: 'convert-tribe', name: 'Converted Tribe', vp: VP_REWARDS.convertTribe },
              ].map(item => (
                <label class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                  <input type="checkbox" id={item.id} class="w-5 h-5 discovery-check" />
                  <span>{item.name}</span>
                  <span class="ml-auto font-bold text-purple-600">+{item.vp} VP</span>
                </label>
              ))}
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Paintings</h3>
            <input type="number" id="paintings" value="0" min="0" class="w-full px-4 py-2 border rounded-lg text-center" />
            <p class="text-xs text-gray-500 mt-1 text-center">+{VP_REWARDS.paintingPer} VP each</p>
          </div>

          <div class="mb-8">
            <label class="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <input type="checkbox" id="elder-statesman" class="w-5 h-5" />
              <span class="font-medium">Elder Statesman (2x VP)</span>
              <span class="ml-auto font-bold text-yellow-600">x{VP_REWARDS.elderStatesmanMultiplier}</span>
            </label>
          </div>

          <button onclick="calculateVP()" class="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition">
            <i class="fas fa-calculator mr-2"></i>Calculate Total VP
          </button>

          <div id="vp-results" class="mt-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white text-center">
            <h2 class="text-lg font-medium mb-2">GRAND TOTAL</h2>
            <p id="total-vp" class="text-6xl font-bold">0 VP</p>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        async function calculateVP() {
          const data = {
            reachedOregon: document.getElementById('reached-oregon').checked,
            survivingSpouses: parseInt(document.getElementById('surviving-spouses').value) || 0,
            survivingChildren: parseInt(document.getElementById('surviving-children').value) || 0,
            totalWealth: parseInt(document.getElementById('total-wealth').value) || 0,
            paintings: parseInt(document.getElementById('paintings').value) || 0,
            vikingRune: document.getElementById('viking-rune').checked,
            indianMummy: document.getElementById('indian-mummy').checked,
            sasquatch: document.getElementById('sasquatch').checked,
            jackalope: document.getElementById('jackalope').checked,
            deadAlien: document.getElementById('dead-alien').checked,
            dinosaurBones: document.getElementById('dinosaur-bones').checked,
            fountainOfYouth: document.getElementById('fountain-youth').checked,
            convertTribe: document.getElementById('convert-tribe').checked,
            elderStatesman: document.getElementById('elder-statesman').checked
          };
          
          const res = await fetch('/api/calculate-vp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          const result = await res.json();
          document.getElementById('total-vp').textContent = result.total + ' VP';
        }
      `}} />
    </div>,
    { title: 'Victory Points - Oregon Trail' }
  )
})

// Student Worksheet Page
app.get('/worksheet', (c) => {
  return c.render(
    <div class="min-h-screen bg-white">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          header, .no-print { display: none !important; }
          body { background: white; }
          .print-page { page-break-after: always; }
        }
      `}} />
      
      <header class="wagon-trail text-white py-4 px-8 no-print">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
            <h1 class="text-2xl font-bold">Student Worksheet</h1>
          </div>
          <button onclick="window.print()" class="bg-white text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-100">
            <i class="fas fa-print mr-2"></i>Print
          </button>
        </div>
      </header>

      <main class="max-w-4xl mx-auto p-8">
        {/* Page 1: Character Sheet */}
        <div class="print-page border-2 border-gray-300 rounded-xl p-8 mb-8">
          <div class="text-center mb-6">
            <h1 class="text-3xl font-bold">OREGON TRAIL CHARACTER SHEET</h1>
            <p class="text-gray-600">Independence, Missouri to Oregon City</p>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="border-b-2 border-gray-400 pb-2">
              <label class="text-sm text-gray-600">Player Name:</label>
            </div>
            <div class="border-b-2 border-gray-400 pb-2">
              <label class="text-sm text-gray-600">Wagon Train Name:</label>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="border-2 border-gray-400 rounded p-3">
              <label class="text-sm text-gray-600 block mb-1">Profession:</label>
              <div class="h-6 border-b border-gray-300"></div>
            </div>
            <div class="border-2 border-gray-400 rounded p-3">
              <label class="text-sm text-gray-600 block mb-1">Nationality:</label>
              <div class="h-6 border-b border-gray-300"></div>
            </div>
            <div class="border-2 border-gray-400 rounded p-3">
              <label class="text-sm text-gray-600 block mb-1">Religion:</label>
              <div class="h-6 border-b border-gray-300"></div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="border-2 border-red-400 rounded p-3 text-center">
              <label class="text-sm text-red-600 block">Health Points</label>
              <div class="text-4xl font-bold">___/___</div>
            </div>
            <div class="border-2 border-green-400 rounded p-3 text-center">
              <label class="text-sm text-green-600 block">Money ($)</label>
              <div class="text-4xl font-bold">$_____</div>
            </div>
            <div class="border-2 border-yellow-400 rounded p-3 text-center">
              <label class="text-sm text-yellow-600 block">Victory Points</label>
              <div class="text-4xl font-bold">_____</div>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-bold mb-2 border-b pb-1">Skills:</h3>
            <div class="grid grid-cols-4 gap-2">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div class="border border-gray-300 rounded p-2 h-8"></div>
              ))}
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-bold mb-2 border-b pb-1">Party Members:</h3>
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b-2">
                  <th class="text-left py-1">Name</th>
                  <th class="text-left py-1">Role</th>
                  <th class="text-left py-1">HP</th>
                  <th class="text-left py-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1,2,3,4,5].map(i => (
                  <tr class="border-b">
                    <td class="py-2 border-r pr-2"><div class="h-4"></div></td>
                    <td class="py-2 border-r px-2"><div class="h-4"></div></td>
                    <td class="py-2 border-r px-2"><div class="h-4"></div></td>
                    <td class="py-2 pl-2"><div class="h-4"></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 class="font-bold mb-2 border-b pb-1">Notes:</h3>
            <div class="border border-gray-300 rounded p-2 h-24"></div>
          </div>
        </div>

        {/* Page 2: Inventory & Travel Log */}
        <div class="print-page border-2 border-gray-300 rounded-xl p-8">
          <h2 class="text-2xl font-bold text-center mb-6">INVENTORY & TRAVEL LOG</h2>

          <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 class="font-bold mb-2 border-b pb-1">Wagon Inventory (20 slots):</h3>
              <div class="grid grid-cols-4 gap-1">
                {[...Array(20)].map((_, i) => (
                  <div class="border border-gray-300 rounded p-1 h-8 text-xs text-center">{i+1}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 class="font-bold mb-2 border-b pb-1">Weapons:</h3>
              <div class="space-y-2">
                {[1,2,3].map(i => (
                  <div class="border border-gray-300 rounded p-2 h-8"></div>
                ))}
              </div>
              <h3 class="font-bold mt-4 mb-2 border-b pb-1">Animals:</h3>
              <div class="space-y-2">
                {[1,2,3].map(i => (
                  <div class="border border-gray-300 rounded p-2 h-8"></div>
                ))}
              </div>
            </div>
          </div>

          <h3 class="font-bold mb-2 border-b pb-1">Daily Travel Log:</h3>
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2 bg-gray-100">
                <th class="py-1 px-2 text-left">Day</th>
                <th class="py-1 px-2 text-left">Location</th>
                <th class="py-1 px-2 text-left">Miles</th>
                <th class="py-1 px-2 text-left">Food Used</th>
                <th class="py-1 px-2 text-left">Events/Notes</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(15)].map((_, i) => (
                <tr class="border-b">
                  <td class="py-2 px-2 border-r">{i+1}</td>
                  <td class="py-2 px-2 border-r"></td>
                  <td class="py-2 px-2 border-r"></td>
                  <td class="py-2 px-2 border-r"></td>
                  <td class="py-2 px-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>,
    { title: 'Student Worksheet - Oregon Trail' }
  )
})

// Reference Guide
app.get('/reference', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">📚 Reference Guide</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Effects */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Status Effects</h2>
            <div class="mb-4">
              <h3 class="font-bold text-red-600 mb-2">Negative</h3>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                {STATUS_EFFECTS.negative.map(e => (
                  <div class="flex items-start gap-2 p-2 bg-red-50 rounded text-sm">
                    <span class="text-xl">{e.icon}</span>
                    <div><strong>{e.name}:</strong> {e.effect}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 class="font-bold text-green-600 mb-2">Positive</h3>
              <div class="space-y-2">
                {STATUS_EFFECTS.positive.map(e => (
                  <div class="flex items-start gap-2 p-2 bg-green-50 rounded text-sm">
                    <span class="text-xl">{e.icon}</span>
                    <div><strong>{e.name}:</strong> {e.effect}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Skills Reference</h2>
            <div class="space-y-2 max-h-96 overflow-y-auto">
              {SKILLS.map(s => (
                <div class="p-2 bg-gray-50 rounded text-sm">
                  <strong class="text-blue-600">{s.name}:</strong> {s.description}
                </div>
              ))}
            </div>
          </div>

          {/* Treasures */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Treasures</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-bold text-yellow-600 mb-2">Big Treasure (Roll 1)</h3>
                <div class="space-y-1">
                  {TREASURES.big.map(t => (
                    <div class="p-2 bg-yellow-50 rounded text-sm"><strong>{t.name}:</strong> {t.effect}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trail Stops */}
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">Trail Stops</h2>
            <div class="space-y-2">
              {TRAIL_STOPS.map((stop, i) => (
                <div class="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                  <span class={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    stop.type === 'start' ? 'bg-green-600' :
                    stop.type === 'end' ? 'bg-red-600' :
                    stop.type === 'fort' ? 'bg-blue-600' :
                    'bg-gray-500'
                  }`}>{i+1}</span>
                  <div>
                    <strong>{stop.name}</strong>
                    <span class="text-gray-500 ml-2">{stop.distance}mi | {stop.description}</span>
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

export default app
