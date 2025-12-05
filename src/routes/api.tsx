import { Hono } from 'hono'
import { 
  ALL_JOBS, NATIONALITIES, RELIGIONS, SUPPLIES, TRAIL_STOPS,
  RANDOM_EVENTS, HUNTING_RESULTS, FISHING_RESULTS, ENEMIES,
  STATUS_EFFECTS, SKILLS, VP_REWARDS, TRADING_POSTS, NATIVE_VILLAGES,
  TREASURES, TESLA_GUN_RESULTS, WAGON_PROBLEMS, BARTER_ITEMS
} from '../data/gameData'

type Bindings = { DB: D1Database }
const api = new Hono<{ Bindings: Bindings }>()

// Get all game data
api.get('/game-data', (c) => {
  return c.json({
    jobs: ALL_JOBS,
    nationalities: NATIONALITIES,
    religions: RELIGIONS,
    supplies: SUPPLIES,
    trailStops: TRAIL_STOPS,
    randomEvents: RANDOM_EVENTS,
    huntingResults: HUNTING_RESULTS,
    fishingResults: FISHING_RESULTS,
    enemies: ENEMIES,
    statusEffects: STATUS_EFFECTS,
    skills: SKILLS,
    vpRewards: VP_REWARDS,
    tradingPosts: TRADING_POSTS,
    nativeVillages: NATIVE_VILLAGES,
    treasures: TREASURES,
    teslaGunResults: TESLA_GUN_RESULTS,
    barterItems: BARTER_ITEMS
  })
})

// Roll dice - Fixed for d22 hunting
api.get('/roll/:type', (c) => {
  const type = c.req.param('type')
  let max = 6
  
  switch(type) {
    case 'd100': max = 100; break
    case 'd22': max = 22; break
    case 'd20': max = 20; break
    case 'd12': max = 12; break
    case 'd10': max = 10; break
    case 'd6': max = 6; break
    case 'd4': max = 4; break
    default: max = parseInt(type.replace('d', '')) || 6
  }
  
  const result = Math.floor(Math.random() * max) + 1
  
  // Find matching event
  let event = null
  if (type === 'd100') {
    event = RANDOM_EVENTS.find(e => result >= e.roll[0] && result <= e.roll[1])
  } else if (type === 'd22') {
    // Fixed: HUNTING_RESULTS now uses single roll numbers
    event = HUNTING_RESULTS.find(e => e.roll === result)
  } else if (type === 'd12') {
    event = FISHING_RESULTS.find(e => e.roll === result)
  } else if (type === 'd10') {
    event = TESLA_GUN_RESULTS.find(e => e.roll === result)
  }
  
  return c.json({ roll: result, max, event })
})

// ============ DATABASE OPERATIONS ============

// Create new game
api.post('/games', async (c) => {
  const { DB } = c.env
  const body = await c.req.json()
  const id = crypto.randomUUID()
  
  try {
    await DB.prepare(`
      INSERT INTO games (id, name, class_name, period, start_date, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).bind(
      id,
      body.name || `Game ${id.substring(0, 8)}`,
      body.className,
      body.period,
      body.startDate || new Date().toISOString().split('T')[0]
    ).run()
    
    // Create wagon trains
    const numTrains = body.numTrains || 6
    for (let i = 0; i < numTrains; i++) {
      const trainId = crypto.randomUUID()
      await DB.prepare(`
        INSERT INTO wagon_trains (id, game_id, name, current_location_id, cash, vp, status)
        VALUES (?, ?, ?, 'independence', 0, 0, 'active')
      `).bind(trainId, id, body.wagonNames?.[i] || `Wagon Train ${i + 1}`).run()
    }
    
    const game = await DB.prepare('SELECT * FROM games WHERE id = ?').bind(id).first()
    const trains = await DB.prepare('SELECT * FROM wagon_trains WHERE game_id = ?').bind(id).all()
    
    return c.json({ ...game, wagonTrains: trains.results })
  } catch (error) {
    return c.json({ error: 'Failed to create game', details: String(error) }, 500)
  }
})

// Get all games
api.get('/games', async (c) => {
  const { DB } = c.env
  try {
    const games = await DB.prepare(`
      SELECT g.*, 
        (SELECT COUNT(*) FROM wagon_trains WHERE game_id = g.id) as wagon_count
      FROM games g 
      WHERE g.status != 'archived'
      ORDER BY g.created_at DESC
    `).all()
    return c.json(games.results)
  } catch (error) {
    return c.json({ error: 'Failed to fetch games' }, 500)
  }
})

// Get single game with wagon trains
api.get('/games/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  try {
    const game = await DB.prepare('SELECT * FROM games WHERE id = ?').bind(id).first()
    if (!game) return c.json({ error: 'Game not found' }, 404)
    
    const trains = await DB.prepare(`
      SELECT * FROM wagon_trains WHERE game_id = ? ORDER BY name
    `).bind(id).all()
    
    return c.json({ ...game, wagonTrains: trains.results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch game' }, 500)
  }
})

// Update wagon train location
api.put('/wagon-trains/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  const body = await c.req.json()
  
  try {
    const updates: string[] = []
    const values: any[] = []
    
    if (body.currentLocationId !== undefined) {
      updates.push('current_location_id = ?')
      values.push(body.currentLocationId)
    }
    if (body.currentLocationIndex !== undefined) {
      updates.push('current_location_index = ?')
      values.push(body.currentLocationIndex)
    }
    if (body.daysTraveled !== undefined) {
      updates.push('days_traveled = ?')
      values.push(body.daysTraveled)
    }
    if (body.cash !== undefined) {
      updates.push('cash = ?')
      values.push(body.cash)
    }
    if (body.vp !== undefined) {
      updates.push('vp = ?')
      values.push(body.vp)
    }
    if (body.status !== undefined) {
      updates.push('status = ?')
      values.push(body.status)
    }
    if (body.notes !== undefined) {
      updates.push('notes = ?')
      values.push(body.notes)
    }
    if (body.name !== undefined) {
      updates.push('name = ?')
      values.push(body.name)
    }
    
    updates.push("updated_at = datetime('now')")
    values.push(id)
    
    await DB.prepare(`UPDATE wagon_trains SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values).run()
    
    const train = await DB.prepare('SELECT * FROM wagon_trains WHERE id = ?').bind(id).first()
    return c.json(train)
  } catch (error) {
    return c.json({ error: 'Failed to update wagon train' }, 500)
  }
})

// Delete a game (archive it)
api.delete('/games/:id', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  try {
    await DB.prepare("UPDATE games SET status = 'archived', updated_at = datetime('now') WHERE id = ?")
      .bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to delete game' }, 500)
  }
})

// Permanently delete a game
api.delete('/games/:id/permanent', async (c) => {
  const { DB } = c.env
  const id = c.req.param('id')
  
  try {
    await DB.prepare('DELETE FROM games WHERE id = ?').bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to permanently delete game' }, 500)
  }
})

// Add character to wagon train
api.post('/wagon-trains/:id/characters', async (c) => {
  const { DB } = c.env
  const trainId = c.req.param('id')
  const body = await c.req.json()
  const id = crypto.randomUUID()
  
  try {
    await DB.prepare(`
      INSERT INTO characters (id, wagon_train_id, name, job_id, job_name, nationality_id, religion_id, 
        health, max_health, skills, status_effects, is_alive, role, weapon)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
    `).bind(
      id, trainId, body.name, body.jobId, body.jobName, body.nationalityId || null,
      body.religionId || null, body.health, body.maxHealth,
      JSON.stringify(body.skills || []), JSON.stringify([]),
      body.role || 'member', body.weapon || null
    ).run()
    
    const character = await DB.prepare('SELECT * FROM characters WHERE id = ?').bind(id).first()
    return c.json(character)
  } catch (error) {
    return c.json({ error: 'Failed to add character' }, 500)
  }
})

// Get characters for wagon train
api.get('/wagon-trains/:id/characters', async (c) => {
  const { DB } = c.env
  const trainId = c.req.param('id')
  
  try {
    const characters = await DB.prepare('SELECT * FROM characters WHERE wagon_train_id = ?')
      .bind(trainId).all()
    return c.json(characters.results)
  } catch (error) {
    return c.json({ error: 'Failed to fetch characters' }, 500)
  }
})

// Calculate travel
api.post('/calculate-travel', async (c) => {
  const body = await c.req.json()
  const { fromIndex, toIndex, baseSpeed, modifiers, statusEffect, partySize } = body
  
  let totalDistance = 0
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    totalDistance += TRAIL_STOPS[i].distance
  }
  
  const adjustedSpeed = Math.max(1, baseSpeed + (modifiers || 0))
  const baseDays = Math.ceil(totalDistance / adjustedSpeed)
  
  // Apply status effect multipliers (corrected)
  let actualDays = baseDays
  if (statusEffect === 'happy') {
    actualDays = Math.ceil(baseDays / 2) // 2x faster = half the time
  } else if (statusEffect === 'depressed' || statusEffect === 'fear' || statusEffect === 'angry') {
    actualDays = baseDays * 3 // Divide speed by 3 = 3x time
  }
  
  const foodNeeded = actualDays * (partySize || 4)
  
  return c.json({
    distance: totalDistance,
    speed: adjustedSpeed,
    baseDays,
    actualDays,
    foodNeeded,
    statusEffect
  })
})

// Wagon problem roll
api.post('/wagon-roll', async (c) => {
  const body = await c.req.json()
  const { terrain, hasMechanical, mechanicalLevel } = body
  
  const problemChance = WAGON_PROBLEMS[terrain as keyof typeof WAGON_PROBLEMS] || 10
  const roll = Math.floor(Math.random() * 100) + 1
  const hasProblem = roll <= problemChance
  
  let repairResult = null
  if (hasProblem) {
    const repairRoll = Math.floor(Math.random() * 100) + 1
    let repairChance = WAGON_PROBLEMS.repairChance.noMechanical
    if (hasMechanical) {
      repairChance = mechanicalLevel >= 3 
        ? WAGON_PROBLEMS.repairChance.mechanical3 
        : WAGON_PROBLEMS.repairChance.mechanical1
    }
    repairResult = {
      roll: repairRoll,
      chance: repairChance,
      success: repairRoll <= repairChance
    }
  }
  
  return c.json({
    terrain,
    problemChance,
    roll,
    hasProblem,
    repairResult
  })
})

// Simulate combat
api.post('/simulate-combat', async (c) => {
  const body = await c.req.json()
  const { party, enemies } = body
  
  // Clone combatants for simulation
  const partyMembers = party.map((p: any) => ({ ...p, currentHp: p.hp }))
  const enemyForces = enemies.map((e: any) => ({ ...e, currentHp: e.hp }))
  
  const battleLog: string[] = []
  let round = 0
  const maxRounds = 20
  
  while (round < maxRounds) {
    round++
    battleLog.push(`--- Round ${round} ---`)
    
    // Check if battle is over
    const aliveParty = partyMembers.filter((p: any) => p.currentHp > 0)
    const aliveEnemies = enemyForces.filter((e: any) => e.currentHp > 0)
    
    if (aliveParty.length === 0 || aliveEnemies.length === 0) break
    
    // Party attacks
    for (const member of aliveParty) {
      if (aliveEnemies.filter((e: any) => e.currentHp > 0).length === 0) break
      
      const target = aliveEnemies.find((e: any) => e.currentHp > 0)
      if (!target) break
      
      const attackRoll = Math.floor(Math.random() * 6) + 1
      const damage = member.damage || 1
      const hitChance = 4 // Need 4+ to hit
      
      if (attackRoll >= hitChance) {
        const actualDamage = target.abilities?.includes('Tough') ? Math.ceil(damage / 2) : damage
        target.currentHp -= actualDamage
        battleLog.push(`${member.name} hits ${target.name} for ${actualDamage} damage! (${target.currentHp}hp left)`)
        
        if (target.currentHp <= 0) {
          battleLog.push(`${target.name} is defeated!`)
        }
      } else {
        battleLog.push(`${member.name} misses ${target.name}!`)
      }
    }
    
    // Enemy attacks
    for (const enemy of enemyForces.filter((e: any) => e.currentHp > 0)) {
      const aliveTargets = partyMembers.filter((p: any) => p.currentHp > 0)
      if (aliveTargets.length === 0) break
      
      const target = aliveTargets[Math.floor(Math.random() * aliveTargets.length)]
      const attackRoll = Math.floor(Math.random() * 6) + 1
      const damage = enemy.damage || 1
      
      if (attackRoll >= 4) {
        const actualDamage = target.abilities?.includes('Tough') ? Math.ceil(damage / 2) : damage
        target.currentHp -= actualDamage
        battleLog.push(`${enemy.name} hits ${target.name} for ${actualDamage} damage! (${target.currentHp}hp left)`)
        
        if (target.currentHp <= 0) {
          battleLog.push(`${target.name} falls in battle!`)
        }
      } else {
        battleLog.push(`${enemy.name} misses ${target.name}!`)
      }
    }
  }
  
  const survivingParty = partyMembers.filter((p: any) => p.currentHp > 0)
  const survivingEnemies = enemyForces.filter((e: any) => e.currentHp > 0)
  
  let outcome: 'victory' | 'defeat' | 'draw'
  if (survivingEnemies.length === 0 && survivingParty.length > 0) {
    outcome = 'victory'
    battleLog.push('=== VICTORY! ===')
  } else if (survivingParty.length === 0) {
    outcome = 'defeat'
    battleLog.push('=== DEFEAT ===')
  } else {
    outcome = 'draw'
    battleLog.push('=== DRAW (max rounds reached) ===')
  }
  
  return c.json({
    outcome,
    rounds: round,
    survivingParty,
    survivingEnemies,
    casualties: {
      party: partyMembers.filter((p: any) => p.currentHp <= 0),
      enemies: enemyForces.filter((e: any) => e.currentHp <= 0)
    },
    battleLog
  })
})

// Calculate Victory Points
api.post('/calculate-vp', async (c) => {
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
  if (body.deadAlien) total += VP_REWARDS.deadAlien
  if (body.dinosaurBones) total += VP_REWARDS.dinosaurBones
  if (body.fountainOfYouth) total += VP_REWARDS.fountainOfYouth
  if (body.convertTribe) total += VP_REWARDS.convertTribe
  
  if (body.elderStatesman) total *= VP_REWARDS.elderStatesmanMultiplier
  
  return c.json({ total })
})

export default api
