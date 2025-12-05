import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { renderer } from './renderer'
import api from './routes/api'
import { 
  ALL_JOBS, NATIONALITIES, RELIGIONS, SUPPLIES, TRAIL_STOPS,
  RANDOM_EVENTS, HUNTING_RESULTS, FISHING_RESULTS, ENEMIES,
  STATUS_EFFECTS, SKILLS, VP_REWARDS, TRADING_POSTS, NATIVE_VILLAGES,
  TREASURES, TESLA_GUN_RESULTS, HEALTH_LEVELS, FUND_LEVELS,
  WAGON_PROBLEMS, BARTER_ITEMS, NATIVE_RELATIONS, NATIVE_ENEMIES
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
            <a href="/native-relations" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-2">
              <i class="fas fa-feather-alt"></i> Native Relations
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
          <a href="/new-game" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-green-600">
            <div class="flex items-center gap-4">
              <div class="bg-green-100 p-3 rounded-lg"><i class="fas fa-flag-checkered text-green-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Start New Game</h3><p class="text-sm text-gray-500">Create a new simulation</p></div>
            </div>
          </a>
          <a href="/characters" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-blue-600">
            <div class="flex items-center gap-4">
              <div class="bg-blue-100 p-3 rounded-lg"><i class="fas fa-users text-blue-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Character Creator</h3><p class="text-sm text-gray-500">Jobs, nationalities, skills</p></div>
            </div>
          </a>
          <a href="/store" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-yellow-600">
            <div class="flex items-center gap-4">
              <div class="bg-yellow-100 p-3 rounded-lg"><i class="fas fa-store text-yellow-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Supply Market</h3><p class="text-sm text-gray-500">Independence prices</p></div>
            </div>
          </a>
          <a href="/dice" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-red-600">
            <div class="flex items-center gap-4">
              <div class="bg-red-100 p-3 rounded-lg"><i class="fas fa-dice text-red-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Dice Roller</h3><p class="text-sm text-gray-500">Events, hunting, fishing</p></div>
            </div>
          </a>
        </div>

        {/* Quick Actions - Row 2 */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <a href="/trading-posts" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-purple-600">
            <div class="flex items-center gap-4">
              <div class="bg-purple-100 p-3 rounded-lg"><i class="fas fa-campground text-purple-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Trading Posts</h3><p class="text-sm text-gray-500">Forts & native villages</p></div>
            </div>
          </a>
          <a href="/combat" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-red-800">
            <div class="flex items-center gap-4">
              <div class="bg-red-100 p-3 rounded-lg"><i class="fas fa-fist-raised text-red-800 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Battle Simulator</h3><p class="text-sm text-gray-500">Full combat simulation</p></div>
            </div>
          </a>
          <a href="/travel" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-teal-600">
            <div class="flex items-center gap-4">
              <div class="bg-teal-100 p-3 rounded-lg"><i class="fas fa-route text-teal-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Travel Calculator</h3><p class="text-sm text-gray-500">Distance, time & wagon rolls</p></div>
            </div>
          </a>
          <a href="/victory" class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md card-hover transition cursor-pointer border-l-4 border-amber-600">
            <div class="flex items-center gap-4">
              <div class="bg-amber-100 p-3 rounded-lg"><i class="fas fa-trophy text-amber-600 text-xl"></i></div>
              <div><h3 class="font-bold text-gray-800">Victory Points</h3><p class="text-sm text-gray-500">Calculate final score</p></div>
            </div>
          </a>
        </div>

        {/* Active Games with Wagon Tracking */}
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 mb-8">
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
        <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-route text-trail-brown"></i> The Oregon Trail
            <span class="text-sm font-normal text-gray-500 ml-2">(Click any stop for historical info)</span>
          </h2>
          <div class="overflow-x-auto">
            <div class="flex items-center gap-2 min-w-max pb-4">
              {TRAIL_STOPS.map((stop, index) => (
                <div class="flex items-center">
                  <div class="flex flex-col items-center min-w-[90px] cursor-pointer group" onclick={`showHistoricalInfo('${stop.id}')`}>
                    <div class={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow transition-transform group-hover:scale-110 ${
                      stop.type === 'start' ? 'bg-green-600' :
                      stop.type === 'end' ? 'bg-red-600' :
                      stop.type === 'fort' ? 'bg-blue-600' :
                      stop.type === 'village' ? 'bg-purple-600' :
                      stop.type === 'mission' ? 'bg-amber-600' :
                      'bg-gray-500'
                    }`}>
                      {index + 1}
                    </div>
                    <p class="text-xs text-center mt-1 font-medium leading-tight group-hover:text-blue-600 transition-colors">{stop.name}</p>
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

        {/* Historical Info Modal */}
        <div id="historical-modal" class="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-amber-700 text-white p-4 rounded-t-xl flex items-center justify-between">
              <h3 id="modal-title" class="text-xl font-bold flex items-center gap-2">
                <i class="fas fa-landmark"></i> <span>Historical Significance</span>
              </h3>
              <button onclick="closeHistoricalModal()" class="text-white/70 hover:text-white text-2xl">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div id="modal-content" class="p-6">
              {/* Content will be injected by JavaScript */}
            </div>
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        const trailStopsData = ${JSON.stringify(TRAIL_STOPS)};
        
        function showHistoricalInfo(stopId) {
          const stop = trailStopsData.find(s => s.id === stopId);
          if (!stop || !stop.historicalSignificance) return;
          
          const h = stop.historicalSignificance;
          const modal = document.getElementById('historical-modal');
          const title = document.getElementById('modal-title');
          const content = document.getElementById('modal-content');
          
          title.innerHTML = '<i class="fas fa-landmark"></i> ' + h.title;
          
          let factsHtml = h.keyFacts.map(f => '<li class="mb-1">' + f + '</li>').join('');
          
          content.innerHTML = 
            '<div class="mb-4">' +
              '<span class="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">' +
                '<i class="fas fa-calendar-alt mr-1"></i> Est. ' + h.yearEstablished +
              '</span>' +
            '</div>' +
            '<p class="text-gray-700 mb-4 text-lg leading-relaxed">' + h.summary + '</p>' +
            '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">' +
              '<h4 class="font-bold text-blue-800 mb-2"><i class="fas fa-list-ul mr-2"></i>Key Facts</h4>' +
              '<ul class="list-disc list-inside text-blue-900 space-y-1">' + factsHtml + '</ul>' +
            '</div>' +
            '<div class="bg-green-50 border-l-4 border-green-500 p-4">' +
              '<h4 class="font-bold text-green-800 mb-2"><i class="fas fa-question-circle mr-2"></i>Why Was This Important?</h4>' +
              '<p class="text-green-900">' + h.whyImportant + '</p>' +
            '</div>';
          
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
        
        function closeHistoricalModal() {
          const modal = document.getElementById('historical-modal');
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        
        // Close modal on backdrop click
        document.getElementById('historical-modal')?.addEventListener('click', function(e) {
          if (e.target === this) closeHistoricalModal();
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') closeHistoricalModal();
        });
      `}} />
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
          <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            Trail Progress
            <span class="text-sm font-normal text-gray-500">(Click stops for historical info)</span>
          </h2>
          <div class="overflow-x-auto">
            <div class="flex items-start gap-1 min-w-max pb-4">
              {TRAIL_STOPS.map((stop, index) => {
                const trainsHere = trains.filter((t: any) => t.current_location_index === index)
                return (
                  <div class="flex items-start">
                    <div class="flex flex-col items-center min-w-[80px] cursor-pointer group" onclick={`showHistoricalInfo('${stop.id}')`}>
                      <div class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:scale-110 ${
                        stop.type === 'start' ? 'bg-green-600' :
                        stop.type === 'end' ? 'bg-red-600' :
                        stop.type === 'fort' ? 'bg-blue-600' :
                        'bg-gray-500'
                      }`}>{index + 1}</div>
                      <p class="text-xs text-center mt-1 font-medium leading-tight group-hover:text-blue-600 transition-colors">{stop.name}</p>
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

        {/* Historical Info Modal */}
        <div id="historical-modal" class="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-amber-700 text-white p-4 rounded-t-xl flex items-center justify-between">
              <h3 id="modal-title" class="text-xl font-bold flex items-center gap-2">
                <i class="fas fa-landmark"></i> <span>Historical Significance</span>
              </h3>
              <button onclick="closeHistoricalModal()" class="text-white/70 hover:text-white text-2xl">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div id="modal-content" class="p-6">
              {/* Content will be injected by JavaScript */}
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
        const trailStopsData = ${JSON.stringify(TRAIL_STOPS)};
        
        async function updateTrainLocation(trainId) {
          const select = document.getElementById('location-' + trainId);
          const newIndex = parseInt(select.value);
          
          try {
            await fetch('/api/wagon-trains/' + trainId, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                currentLocationIndex: newIndex,
                currentLocationId: trailStopsData[newIndex]?.id
              })
            });
            location.reload();
          } catch (err) {
            alert('Failed to update location');
          }
        }
        
        function showHistoricalInfo(stopId) {
          const stop = trailStopsData.find(s => s.id === stopId);
          if (!stop || !stop.historicalSignificance) return;
          
          const h = stop.historicalSignificance;
          const modal = document.getElementById('historical-modal');
          const title = document.getElementById('modal-title');
          const content = document.getElementById('modal-content');
          
          title.innerHTML = '<i class="fas fa-landmark"></i> ' + h.title;
          
          let factsHtml = h.keyFacts.map(f => '<li class="mb-1">' + f + '</li>').join('');
          
          content.innerHTML = 
            '<div class="mb-4">' +
              '<span class="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">' +
                '<i class="fas fa-calendar-alt mr-1"></i> Est. ' + h.yearEstablished +
              '</span>' +
            '</div>' +
            '<p class="text-gray-700 mb-4 text-lg leading-relaxed">' + h.summary + '</p>' +
            '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">' +
              '<h4 class="font-bold text-blue-800 mb-2"><i class="fas fa-list-ul mr-2"></i>Key Facts</h4>' +
              '<ul class="list-disc list-inside text-blue-900 space-y-1">' + factsHtml + '</ul>' +
            '</div>' +
            '<div class="bg-green-50 border-l-4 border-green-500 p-4">' +
              '<h4 class="font-bold text-green-800 mb-2"><i class="fas fa-question-circle mr-2"></i>Why Was This Important?</h4>' +
              '<p class="text-green-900">' + h.whyImportant + '</p>' +
            '</div>';
          
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
        
        function closeHistoricalModal() {
          const modal = document.getElementById('historical-modal');
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
        
        // Close modal on backdrop click
        document.getElementById('historical-modal')?.addEventListener('click', function(e) {
          if (e.target === this) closeHistoricalModal();
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') closeHistoricalModal();
        });
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
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold">⚔️ Battle Simulator</h1>
        </div>
      </header>

      <main class="max-w-6xl mx-auto p-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Party Side */}
          <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <i class="fas fa-users text-blue-600"></i> Wagon Party
            </h2>
            <div id="party-list" class="space-y-2 mb-4 min-h-[100px]"></div>
            
            <div class="border-t border-gray-300 pt-4">
              <h3 class="font-medium mb-2 text-gray-700">Add Party Member</h3>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <input type="text" id="party-name" placeholder="Name" class="px-3 py-2 bg-white border border-gray-300 rounded text-gray-800" />
                <input type="number" id="party-hp" placeholder="HP" value="3" min="1" class="px-3 py-2 bg-white border border-gray-300 rounded text-gray-800" />
              </div>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <select id="party-weapon" class="px-3 py-2 bg-white border border-gray-300 rounded text-gray-800">
                  <option value="1" data-weapon="unarmed">Unarmed (1 dmg)</option>
                  <option value="1" data-weapon="pistol">Pistol (1 dmg)</option>
                  <option value="2" data-weapon="rifle" selected>Rifle (2 dmg)</option>
                  <option value="3" data-weapon="shotgun">Shotgun (3 dmg)</option>
                  <option value="0" data-weapon="tesla">⚡ Tesla Gun (d10 special)</option>
                </select>
                <select id="party-traits" class="px-3 py-2 bg-white border border-gray-300 rounded text-gray-800">
                  <option value="">No Trait</option>
                  <option value="tough">Tough (half damage taken)</option>
                  <option value="bravery">Bravery (+1 to hit)</option>
                  <option value="weapons">Weapons skill (+1 dmg)</option>
                  <option value="lucky">Lucky (reroll misses)</option>
                  <option value="famous_inventor">Famous Inventor (Tesla immunity)</option>
                </select>
              </div>
              <button onclick="addPartyMember()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                <i class="fas fa-plus mr-1"></i> Add Party Member
              </button>
            </div>
          </div>

          {/* Enemy Side */}
          <div class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <i class="fas fa-skull text-red-600"></i> Enemies
            </h2>
            <div id="enemy-list" class="space-y-2 mb-4 min-h-[100px]"></div>
            
            <div class="border-t border-gray-300 pt-4">
              <h3 class="font-medium mb-2 text-gray-700">Add Enemy</h3>
              <select id="enemy-select" class="w-full px-3 py-2 bg-white border border-gray-300 rounded mb-2 text-gray-800">
                <optgroup label="Standard Enemies">
                  {ENEMIES.map(e => (
                    <option value={JSON.stringify(e)}>{e.name} (HP: {e.hp}, Dmg: {e.damage})</option>
                  ))}
                </optgroup>
                <optgroup label="🪶 Native Americans (Hostile Relations)">
                  {NATIVE_ENEMIES.map(e => (
                    <option value={JSON.stringify(e)}>🪶 {e.name} (HP: {e.hp}, Dmg: {e.damage})</option>
                  ))}
                </optgroup>
              </select>
              <button onclick="addEnemy()" class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                <i class="fas fa-plus mr-1"></i> Add Enemy
              </button>
            </div>
          </div>
        </div>

        {/* Native Allies Section */}
        <div class="bg-amber-100/90 backdrop-blur-sm rounded-xl p-4 mb-8 shadow-lg border-2 border-amber-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-3xl">🪶</span>
              <div>
                <h3 class="font-bold text-amber-800">Native American Allies</h3>
                <p class="text-amber-700 text-sm">Add allied warriors when at +3 Relations (50% chance, 1d4 warriors)</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button onclick="addNativeAlly(1)" class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-sm">
                +1 Warrior
              </button>
              <button onclick="addNativeAlly(4)" class="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded text-sm">
                +1d4 Warriors
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
        <div id="battle-results" class="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hidden">
          <h2 class="text-2xl font-bold mb-4 text-center" id="battle-outcome"></h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-100 p-4 rounded-lg text-center border border-blue-300">
              <p class="text-sm text-blue-700">Surviving Party</p>
              <p class="text-3xl font-bold text-blue-800" id="surviving-party">0</p>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg text-center border border-gray-300">
              <p class="text-sm text-gray-600">Rounds</p>
              <p class="text-3xl font-bold text-gray-800" id="battle-rounds">0</p>
            </div>
            <div class="bg-red-100 p-4 rounded-lg text-center border border-red-300">
              <p class="text-sm text-red-700">Enemies Defeated</p>
              <p class="text-3xl font-bold text-red-800" id="enemies-defeated">0</p>
            </div>
          </div>
          
          {/* Party Status Report */}
          <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-clipboard-list text-blue-600"></i> Party Status Report
            </h3>
            <div id="party-report" class="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Party report cards will be inserted here */}
            </div>
          </div>
          
          {/* Battle Log */}
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-scroll text-amber-600"></i> Battle Log
            </h3>
            <div class="bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-sm text-white">
              <pre id="battle-log" class="whitespace-pre-wrap"></pre>
            </div>
          </div>
        </div>

        {/* Enemy Reference */}
        <div class="mt-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 class="text-xl font-bold mb-4 text-gray-800">Enemy Reference</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {ENEMIES.map(e => (
              <div class="bg-gray-100 p-2 rounded border border-gray-300">
                <span class="font-medium text-gray-800">{e.name}</span>
                <span class="text-red-600 ml-1">HP:{e.hp}</span>
                <span class="text-amber-600 ml-1">Dmg:{e.damage}</span>
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
          list.innerHTML = party.map((p, i) => {
            const traits = p.traits ? ' [' + p.traits + ']' : '';
            const weapon = p.hasTesla ? '⚡Tesla' : 'Dmg:' + p.damage;
            const isNative = p.isNativeAlly ? '🪶 ' : '';
            const bgClass = p.isNativeAlly ? 'bg-amber-100 border border-amber-300' : 'bg-blue-100 border border-blue-300';
            return '<div class="flex items-center justify-between ' + bgClass + ' p-2 rounded">' +
              '<span class="text-gray-800">' + isNative + p.name + ' (HP:' + p.hp + ', ' + weapon + ')' + traits + '</span>' +
              '<button onclick="removeParty(' + i + ')" class="text-red-600 hover:text-red-800"><i class="fas fa-times"></i></button>' +
              '</div>';
          }).join('');
        }
        
        function renderEnemies() {
          const list = document.getElementById('enemy-list');
          list.innerHTML = enemies.map((e, i) => 
            '<div class="flex items-center justify-between bg-red-100 border border-red-300 p-2 rounded">' +
            '<span class="text-gray-800">' + e.name + ' (HP:' + e.hp + ', Dmg:' + e.damage + ')' + (e.abilities ? ' [' + e.abilities.join(', ') + ']' : '') + '</span>' +
            '<button onclick="removeEnemy(' + i + ')" class="text-red-600 hover:text-red-800"><i class="fas fa-times"></i></button>' +
            '</div>'
          ).join('');
        }
        
        function addPartyMember() {
          const name = document.getElementById('party-name').value || 'Settler';
          const hp = parseInt(document.getElementById('party-hp').value) || 3;
          const weaponSelect = document.getElementById('party-weapon');
          const damage = parseInt(weaponSelect.value) || 1;
          const weaponType = weaponSelect.options[weaponSelect.selectedIndex].dataset.weapon;
          const traits = document.getElementById('party-traits').value;
          
          const member = { 
            name, 
            hp, 
            damage,
            hasTesla: weaponType === 'tesla',
            traits: traits || null,
            abilities: traits ? [traits] : []
          };
          
          party.push(member);
          document.getElementById('party-name').value = '';
          renderParty();
        }
        
        function addEnemy() {
          const select = document.getElementById('enemy-select');
          const enemy = JSON.parse(select.value);
          enemies.push({ ...enemy });
          renderEnemies();
        }
        
        function addNativeAlly(count) {
          let numWarriors = count;
          if (count === 4) {
            // Roll 1d4
            numWarriors = Math.floor(Math.random() * 4) + 1;
            alert('Rolled 1d4: ' + numWarriors + ' Native Warrior(s) join your party!');
          }
          
          for (let i = 0; i < numWarriors; i++) {
            party.push({
              name: 'Native Warrior',
              hp: 4,
              damage: 2,
              hasTesla: false,
              traits: 'bravery',
              abilities: ['bravery', 'Travel'],
              isNativeAlly: true
            });
          }
          renderParty();
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
            (result.outcome === 'victory' ? 'text-green-600' : 
             result.outcome === 'defeat' ? 'text-red-600' : 'text-yellow-600');
          document.getElementById('surviving-party').textContent = result.survivingParty.length;
          document.getElementById('battle-rounds').textContent = result.rounds;
          document.getElementById('enemies-defeated').textContent = result.casualties.enemies.length;
          document.getElementById('battle-log').textContent = result.battleLog.join('\\n');
          
          // Render party status report
          const partyReportDiv = document.getElementById('party-report');
          if (result.partyReport) {
            partyReportDiv.innerHTML = result.partyReport.map(member => {
              const isAlive = member.alive;
              const hpPercent = Math.max(0, (member.currentHp / member.maxHp) * 100);
              const hpColor = hpPercent > 50 ? 'bg-green-500' : hpPercent > 25 ? 'bg-yellow-500' : 'bg-red-500';
              const bgColor = isAlive ? (member.isNativeAlly ? 'bg-amber-50 border-amber-300' : 'bg-blue-50 border-blue-300') : 'bg-gray-200 border-gray-400';
              const textColor = isAlive ? 'text-gray-800' : 'text-gray-500';
              const nativeIcon = member.isNativeAlly ? '🪶 ' : '';
              
              // Status effects badges
              let statusBadges = '';
              if (member.statusEffects && member.statusEffects.length > 0) {
                statusBadges = member.statusEffects.map(effect => {
                  let badgeClass = 'bg-gray-200 text-gray-700';
                  let icon = '⚠️';
                  if (effect === 'Bleeding') { badgeClass = 'bg-red-200 text-red-700'; icon = '💉'; }
                  else if (effect === 'Poisoned') { badgeClass = 'bg-purple-200 text-purple-700'; icon = '☠️'; }
                  else if (effect === 'Infected Wound') { badgeClass = 'bg-yellow-200 text-yellow-700'; icon = '🦠'; }
                  return '<span class="inline-block px-2 py-0.5 rounded text-xs font-medium ' + badgeClass + '">' + icon + ' ' + effect + '</span>';
                }).join(' ');
              }
              
              // Stats line
              const statsLine = isAlive 
                ? (member.killCount > 0 ? '<span class="text-green-600">⚔️ ' + member.killCount + ' kill' + (member.killCount > 1 ? 's' : '') + '</span>' : '') +
                  (member.damageDealt > 0 ? '<span class="text-blue-600 ml-2">💥 ' + member.damageDealt + ' dmg dealt</span>' : '')
                : '<span class="text-gray-500 italic">Fallen in battle</span>';
              
              return '<div class="' + bgColor + ' border rounded-lg p-3 ' + textColor + '">' +
                '<div class="flex items-center justify-between mb-2">' +
                  '<span class="font-bold">' + nativeIcon + member.name + '</span>' +
                  '<span class="text-sm">' + (isAlive ? '❤️ ' + member.currentHp + '/' + member.maxHp : '💀') + '</span>' +
                '</div>' +
                (isAlive ? '<div class="w-full bg-gray-300 rounded-full h-2 mb-2"><div class="' + hpColor + ' h-2 rounded-full" style="width: ' + hpPercent + '%"></div></div>' : '') +
                (statusBadges ? '<div class="mb-2">' + statusBadges + '</div>' : '') +
                '<div class="text-xs">' + statsLine + '</div>' +
              '</div>';
            }).join('');
          }
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
            <i class="fas fa-tools mr-2"></i>Wagon Problem Roll (Terrain Check)
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

        {/* Standalone Wagon Repair */}
        <div class="bg-orange-50 border-2 border-orange-300 rounded-xl p-6 mb-8">
          <h3 class="font-bold text-orange-800 mb-4">
            <i class="fas fa-wrench mr-2"></i>Attempt Wagon Repair (Wagon Already Broken)
          </h3>
          <p class="text-sm text-orange-700 mb-4">Use this when the wagon is already damaged and you need to attempt a repair without rolling for terrain damage.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-orange-800 mb-2">Mechanical Skill</label>
              <select id="repair-mechanical-level" class="w-full px-4 py-2 border rounded-lg">
                <option value="0">None (10% repair chance)</option>
                <option value="1">Mechanical 1 (50% repair chance)</option>
                <option value="3">Mechanical 3 (95% repair chance)</option>
              </select>
            </div>
            <div class="flex items-end">
              <button onclick="attemptRepair()" class="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition">
                <i class="fas fa-wrench mr-2"></i>Attempt Repair
              </button>
            </div>
          </div>
          <div id="repair-result" class="p-4 bg-white rounded-lg hidden">
            <p id="repair-result-text" class="font-bold"></p>
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
        
        async function attemptRepair() {
          const mechLevel = parseInt(document.getElementById('repair-mechanical-level').value);
          
          const res = await fetch('/api/repair-wagon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              hasMechanical: mechLevel > 0,
              mechanicalLevel: mechLevel
            })
          });
          
          const data = await res.json();
          const resultDiv = document.getElementById('repair-result');
          const resultText = document.getElementById('repair-result-text');
          
          resultDiv.classList.remove('hidden');
          
          if (data.success) {
            resultDiv.className = 'p-4 bg-green-100 rounded-lg';
            resultText.className = 'font-bold text-green-700';
            resultText.textContent = '✅ REPAIR SUCCESSFUL! (Rolled ' + data.roll + ' vs ' + data.chance + '% repair chance)';
          } else {
            resultDiv.className = 'p-4 bg-red-100 rounded-lg';
            resultText.className = 'font-bold text-red-700';
            resultText.textContent = '❌ REPAIR FAILED! Lose 1 day. (Rolled ' + data.roll + ' vs ' + data.chance + '% repair chance)';
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
        .worksheet-img {
          width: 100%;
          height: auto;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .worksheet-img:hover {
          transform: scale(1.01);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .worksheet-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
      `}} />
      
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
            <h1 class="text-2xl font-bold">📋 Student Worksheets</h1>
          </div>
        </div>
      </header>

      <main class="max-w-5xl mx-auto p-8">
        {/* Instructions */}
        <div class="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-8">
          <h2 class="font-bold text-amber-800 mb-2 flex items-center gap-2">
            <i class="fas fa-info-circle"></i> Instructions
          </h2>
          <ul class="text-amber-700 text-sm space-y-1">
            <li>• <strong>Click image</strong> to open full-size in a new tab</li>
            <li>• <strong>Download:</strong> Click the download button to save the worksheet</li>
            <li>• <strong>Character Sheet:</strong> Use for tracking player info, skills, party members, and notes</li>
            <li>• <strong>Inventory & Travel Log:</strong> Use for tracking wagon inventory, weapons, animals, and daily travel</li>
          </ul>
        </div>

        {/* Page 1: Character Sheet */}
        <div class="worksheet-card">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-user-circle text-blue-600"></i> Character Sheet
            </h2>
            <a href="/worksheets/character_sheet.png" download="Oregon_Trail_Character_Sheet.png" class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2">
              <i class="fas fa-download"></i> Download
            </a>
          </div>
          <a href="/worksheets/character_sheet.png" target="_blank">
            <img src="/worksheets/character_sheet.png" alt="Oregon Trail Character Sheet" class="worksheet-img" />
          </a>
        </div>

        {/* Page 2: Inventory & Travel Log */}
        <div class="worksheet-card">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <i class="fas fa-box-open text-amber-600"></i> Inventory & Travel Log
            </h2>
            <a href="/worksheets/inventory_log.png" download="Oregon_Trail_Inventory_Log.png" class="bg-amber-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-amber-700 transition flex items-center gap-2">
              <i class="fas fa-download"></i> Download
            </a>
          </div>
          <a href="/worksheets/inventory_log.png" target="_blank">
            <img src="/worksheets/inventory_log.png" alt="Oregon Trail Inventory and Travel Log" class="worksheet-img" />
          </a>
        </div>
      </main>
    </div>,
    { title: 'Student Worksheets - Oregon Trail' }
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

// Native American Relations Page
app.get('/native-relations', (c) => {
  return c.render(
    <div class="min-h-screen">
      <header class="wagon-trail text-white py-4 px-8">
        <div class="max-w-7xl mx-auto flex items-center gap-4">
          <a href="/" class="text-white/70 hover:text-white transition"><i class="fas fa-arrow-left"></i></a>
          <h1 class="text-2xl font-bold"><i class="fas fa-feather-alt mr-2"></i>Native American Relations</h1>
        </div>
      </header>

      <main class="max-w-6xl mx-auto p-8">
        {/* Relations Meter Control */}
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-sliders-h text-purple-600"></i> Universal Relations Meter
          </h2>
          <p class="text-sm text-gray-600 mb-6">
            Control the overall relationship between settlers and Native American tribes. This affects all trading, encounters, and potential conflicts.
          </p>
          
          {/* Relations Slider */}
          <div class="mb-6">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-red-600 font-bold">💀 Hostile</span>
              <span class="text-gray-500 font-bold">🤝 Neutral</span>
              <span class="text-green-600 font-bold">⚔️ Allied</span>
            </div>
            <input 
              type="range" 
              id="relations-slider" 
              min="-3" 
              max="3" 
              value="0" 
              class="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style="background: linear-gradient(to right, #991b1b, #dc2626, #f97316, #6b7280, #22c55e, #16a34a, #166534);"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>-3</span>
              <span>-2</span>
              <span>-1</span>
              <span>0</span>
              <span>+1</span>
              <span>+2</span>
              <span>+3</span>
            </div>
          </div>

          {/* Current Status Display */}
          <div id="relations-status" class="p-6 rounded-xl text-center bg-gray-100">
            <div class="text-6xl mb-2" id="status-icon">🤝</div>
            <h3 class="text-2xl font-bold" id="status-name">Neutral</h3>
            <p class="text-gray-600" id="status-description">Standard relations - cautious respect</p>
          </div>
        </div>

        {/* Current Effects */}
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Current Effects</h2>
          <div id="effects-list" class="space-y-2">
            <div class="p-3 bg-gray-50 rounded-lg text-sm">• Normal barter rates</div>
            <div class="p-3 bg-gray-50 rounded-lg text-sm">• All village activities available</div>
            <div class="p-3 bg-gray-50 rounded-lg text-sm">• No special bonuses or penalties</div>
          </div>
        </div>

        {/* Roll Checks Section */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Raid Check */}
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-red-700 mb-4">
              <i class="fas fa-exclamation-triangle mr-2"></i>Raid Encounter Check
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              Roll when camping in territory. Only applies at Wary (-1) or worse relations.
            </p>
            <div class="text-center mb-4">
              <div id="raid-chance" class="text-3xl font-bold text-gray-400">0%</div>
              <p class="text-sm text-gray-500">Raid Chance</p>
            </div>
            <button 
              onclick="rollRaidCheck()"
              id="raid-roll-btn"
              disabled
              class="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <i class="fas fa-dice mr-2"></i>Roll d100 for Raid
            </button>
            <div id="raid-result" class="mt-4 p-4 rounded-lg hidden"></div>
          </div>

          {/* Allied Aid Check */}
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-green-700 mb-4">
              <i class="fas fa-hands-helping mr-2"></i>Allied Aid Check
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              Roll before battle to see if Native allies join. Only applies at Allied (+3) relations.
            </p>
            <div class="text-center mb-4">
              <div id="ally-chance" class="text-3xl font-bold text-gray-400">0%</div>
              <p class="text-sm text-gray-500">Aid Chance</p>
            </div>
            <button 
              onclick="rollAllyCheck()"
              id="ally-roll-btn"
              disabled
              class="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <i class="fas fa-dice mr-2"></i>Roll d100 for Aid
            </button>
            <div id="ally-result" class="mt-4 p-4 rounded-lg hidden"></div>
          </div>
        </div>

        {/* Relations Reference Table */}
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Relations Reference</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100">
                  <th class="px-4 py-2 text-left">Level</th>
                  <th class="px-4 py-2 text-left">Status</th>
                  <th class="px-4 py-2 text-left">Barter Effect</th>
                  <th class="px-4 py-2 text-left">Raid Chance</th>
                  <th class="px-4 py-2 text-left">Special</th>
                </tr>
              </thead>
              <tbody>
                {NATIVE_RELATIONS.levels.map(level => (
                  <tr class={`border-b ${level.level < 0 ? 'bg-red-50' : level.level > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <td class="px-4 py-2 font-bold">{level.level > 0 ? '+' : ''}{level.level}</td>
                    <td class="px-4 py-2">
                      <span class="text-xl mr-2">{level.icon}</span>
                      <span class="font-medium">{level.name}</span>
                    </td>
                    <td class="px-4 py-2">
                      {level.barterPenalty ? 
                        <span class="text-red-600">+{level.barterPenalty}% cost</span> : 
                        level.barterBonus ? 
                        <span class="text-green-600">-{level.barterBonus}% cost</span> : 
                        <span class="text-gray-500">Normal</span>
                      }
                    </td>
                    <td class="px-4 py-2">
                      {level.raidChance > 0 ? 
                        <span class="text-red-600 font-bold">{level.raidChance}%</span> : 
                        <span class="text-gray-400">None</span>
                      }
                    </td>
                    <td class="px-4 py-2 text-xs">
                      {level.level === 3 && <span class="text-green-600">50% chance warriors join battle</span>}
                      {level.level === -3 && <span class="text-red-600">Warriors may join enemies</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions That Change Relations */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-green-700 mb-4">
              <i class="fas fa-plus-circle mr-2"></i>Actions That Improve Relations
            </h3>
            <div class="space-y-2">
              {NATIVE_RELATIONS.relationChanges.positive.map(item => (
                <div class="flex justify-between p-2 bg-green-50 rounded">
                  <span>{item.action}</span>
                  <span class="font-bold text-green-600">+{item.change}</span>
                </div>
              ))}
            </div>
          </div>
          <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-red-700 mb-4">
              <i class="fas fa-minus-circle mr-2"></i>Actions That Harm Relations
            </h3>
            <div class="space-y-2">
              {NATIVE_RELATIONS.relationChanges.negative.map(item => (
                <div class="flex justify-between p-2 bg-red-50 rounded">
                  <span>{item.action}</span>
                  <span class="font-bold text-red-600">{item.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Native Combatants Reference */}
        <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Native Combatants (for Battle Simulator)</h2>
          <p class="text-sm text-gray-600 mb-4">Use these when Native Americans join battles - either as allies (+3 relations) or enemies (-3 relations).</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {NATIVE_ENEMIES.map(enemy => (
              <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                <div class="text-2xl mb-2">🪶</div>
                <h4 class="font-bold text-amber-800">{enemy.name}</h4>
                <p class="text-sm">HP: {enemy.hp} | Dmg: {enemy.damage}</p>
                <p class="text-xs text-amber-600">{enemy.abilities.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <script dangerouslySetInnerHTML={{__html: `
        const relationsData = ${JSON.stringify(NATIVE_RELATIONS.levels)};
        const slider = document.getElementById('relations-slider');
        
        function updateRelationsDisplay() {
          const level = parseInt(slider.value);
          const data = relationsData.find(r => r.level === level);
          
          document.getElementById('status-icon').textContent = data.icon;
          document.getElementById('status-name').textContent = data.name;
          document.getElementById('status-name').className = 'text-2xl font-bold text-' + data.color;
          document.getElementById('status-description').textContent = data.description;
          
          // Update effects list
          const effectsList = document.getElementById('effects-list');
          effectsList.innerHTML = data.effects.map(e => 
            '<div class="p-3 ' + (level < 0 ? 'bg-red-50' : level > 0 ? 'bg-green-50' : 'bg-gray-50') + ' rounded-lg text-sm">• ' + e + '</div>'
          ).join('');
          
          // Update status box color
          const statusBox = document.getElementById('relations-status');
          statusBox.className = 'p-6 rounded-xl text-center ' + 
            (level < 0 ? 'bg-red-100' : level > 0 ? 'bg-green-100' : 'bg-gray-100');
          
          // Update raid chance
          document.getElementById('raid-chance').textContent = data.raidChance + '%';
          document.getElementById('raid-roll-btn').disabled = data.raidChance === 0;
          
          // Update ally chance
          const allyChance = data.allyChance || 0;
          document.getElementById('ally-chance').textContent = allyChance + '%';
          document.getElementById('ally-roll-btn').disabled = allyChance === 0;
          
          // Clear previous results
          document.getElementById('raid-result').classList.add('hidden');
          document.getElementById('ally-result').classList.add('hidden');
        }
        
        function rollRaidCheck() {
          const level = parseInt(slider.value);
          const data = relationsData.find(r => r.level === level);
          const roll = Math.floor(Math.random() * 100) + 1;
          const isRaid = roll <= data.raidChance;
          
          const resultDiv = document.getElementById('raid-result');
          resultDiv.classList.remove('hidden');
          
          if (isRaid) {
            // Determine raid size
            let raidSize = 'Small Raiding Party (2 warriors)';
            if (roll <= data.raidChance / 3) {
              raidSize = 'War Party (6 warriors)';
            } else if (roll <= data.raidChance / 2) {
              raidSize = 'Raiding Party (4 warriors)';
            }
            
            resultDiv.className = 'mt-4 p-4 rounded-lg bg-red-100';
            resultDiv.innerHTML = '<div class="text-center">' +
              '<div class="text-4xl mb-2">⚔️</div>' +
              '<p class="font-bold text-red-700">RAID! Rolled ' + roll + ' (needed ' + data.raidChance + ' or less)</p>' +
              '<p class="text-red-600 mt-2">' + raidSize + '</p>' +
              '<p class="text-sm text-red-500 mt-1">Go to Battle Simulator to resolve!</p>' +
              '</div>';
          } else {
            resultDiv.className = 'mt-4 p-4 rounded-lg bg-green-100';
            resultDiv.innerHTML = '<div class="text-center">' +
              '<div class="text-4xl mb-2">✅</div>' +
              '<p class="font-bold text-green-700">Safe! Rolled ' + roll + ' (needed ' + data.raidChance + ' or less)</p>' +
              '<p class="text-green-600">No raid encounter.</p>' +
              '</div>';
          }
        }
        
        function rollAllyCheck() {
          const level = parseInt(slider.value);
          const data = relationsData.find(r => r.level === level);
          const roll = Math.floor(Math.random() * 100) + 1;
          const allyChance = data.allyChance || 0;
          const isAid = roll <= allyChance;
          
          const resultDiv = document.getElementById('ally-result');
          resultDiv.classList.remove('hidden');
          
          if (isAid) {
            // Roll 1d4 for number of warriors
            const warriors = Math.floor(Math.random() * 4) + 1;
            
            resultDiv.className = 'mt-4 p-4 rounded-lg bg-green-100';
            resultDiv.innerHTML = '<div class="text-center">' +
              '<div class="text-4xl mb-2">🪶⚔️</div>' +
              '<p class="font-bold text-green-700">ALLIES JOIN! Rolled ' + roll + ' (needed ' + allyChance + ' or less)</p>' +
              '<p class="text-green-600 mt-2">' + warriors + ' Native Warrior(s) join your battle!</p>' +
              '<p class="text-sm text-green-500 mt-1">HP: 4, Damage: 2, Abilities: Bravery, Travel</p>' +
              '</div>';
          } else {
            resultDiv.className = 'mt-4 p-4 rounded-lg bg-yellow-100';
            resultDiv.innerHTML = '<div class="text-center">' +
              '<div class="text-4xl mb-2">🤷</div>' +
              '<p class="font-bold text-yellow-700">No Aid. Rolled ' + roll + ' (needed ' + allyChance + ' or less)</p>' +
              '<p class="text-yellow-600">The tribes cannot spare warriors today.</p>' +
              '</div>';
          }
        }
        
        slider.addEventListener('input', updateRelationsDisplay);
        updateRelationsDisplay();
      `}} />
    </div>,
    { title: 'Native Relations - Oregon Trail' }
  )
})

export default app
