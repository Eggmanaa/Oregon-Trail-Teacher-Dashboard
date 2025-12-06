// Oregon Trail Teacher Interface - Client-Side JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ============ DICE ROLLING ============
  
  const rollButton = (buttonId, resultId, eventId, endpoint) => {
    const btn = document.getElementById(buttonId);
    const resultEl = document.getElementById(resultId);
    const eventEl = document.getElementById(eventId);
    
    if (btn && resultEl) {
      btn.addEventListener('click', async () => {
        // Add rolling animation
        resultEl.classList.add('dice-roll');
        resultEl.textContent = '...';
        
        try {
          const response = await fetch(`/api/roll/${endpoint}`);
          const data = await response.json();
          
          setTimeout(() => {
            resultEl.classList.remove('dice-roll');
            resultEl.textContent = data.roll;
            
            // Show event details if available
            if (eventEl && data.event) {
              eventEl.classList.remove('hidden');
              const nameEl = document.getElementById(`${resultId.replace('-result', '')}-event-name`);
              const descEl = document.getElementById(`${resultId.replace('-result', '')}-event-desc`);
              if (nameEl) nameEl.textContent = data.event.name;
              if (descEl) descEl.textContent = data.event.description || `Meat: ${data.event.meat || 0}`;
            } else if (eventEl) {
              eventEl.classList.add('hidden');
            }
          }, 300);
        } catch (error) {
          resultEl.textContent = 'Error';
          console.error('Roll error:', error);
        }
      });
    }
  };
  
  // Setup dice rollers
  rollButton('roll-d100', 'd100-result', 'd100-event', 'd100');
  rollButton('roll-d20', 'd20-result', 'd20-event', 'd20');
  rollButton('roll-d12', 'd12-result', 'd12-event', 'd12');
  
  // d6 Combat roll with modifier
  const d6Btn = document.getElementById('roll-d6');
  const d6Result = document.getElementById('d6-result');
  const combatModifier = document.getElementById('combat-modifier');
  const combatTotal = document.getElementById('combat-total');
  
  if (d6Btn && d6Result) {
    d6Btn.addEventListener('click', async () => {
      d6Result.classList.add('dice-roll');
      d6Result.textContent = '...';
      
      try {
        const response = await fetch('/api/roll/d6');
        const data = await response.json();
        const modifier = parseInt(combatModifier?.value || 0);
        const total = data.roll + modifier;
        
        setTimeout(() => {
          d6Result.classList.remove('dice-roll');
          d6Result.textContent = data.roll;
          if (combatTotal) {
            combatTotal.textContent = `${total} ${total >= 4 ? '✓ HIT!' : '✗ MISS'}`;
            combatTotal.style.color = total >= 4 ? '#16a34a' : '#dc2626';
          }
        }, 300);
      } catch (error) {
        d6Result.textContent = 'Error';
      }
    });
  }
  
  // ============ STORE INFLATION ============
  
  const locationSelect = document.getElementById('location-select');
  const inflationDisplay = document.getElementById('inflation-display');
  const supplyItems = document.querySelectorAll('.supply-item');
  
  const inflationRates = {
    'independence': 1.0,
    'courthouse_rock': 1.25,
    'chimney_rock': 1.25,
    'fort_laramie': 1.5,
    'independence_rock': 1.75,
    'fort_bridger': 2.0,
    'soda_springs': 2.25,
    'fort_hall': 2.5,
    'fort_boise': 3.0,
    'whitman_mission': 3.0,
    'the_dalles': 3.0,
    'oregon_city': 1.0
  };
  
  if (locationSelect) {
    locationSelect.addEventListener('change', () => {
      const rate = inflationRates[locationSelect.value] || 1.0;
      if (inflationDisplay) inflationDisplay.textContent = `x${rate}`;
      
      supplyItems.forEach(item => {
        const basePrice = parseInt(item.dataset.basePrice);
        const priceEl = item.querySelector('.item-price');
        if (priceEl && basePrice) {
          priceEl.textContent = `$${Math.round(basePrice * rate)}`;
        }
      });
    });
  }
  
  // ============ NEW GAME FORM ============
  
  const newGameForm = document.getElementById('new-game-form');
  if (newGameForm) {
    newGameForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(newGameForm);
      const data = {
        className: formData.get('className'),
        period: formData.get('period'),
        startDate: formData.get('startDate'),
        numTrains: parseInt(formData.get('numTrains')),
        difficulty: formData.get('difficulty')
      };
      
      try {
        const response = await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const game = await response.json();
        window.location.href = `/game/${game.id}`;
      } catch (error) {
        alert('Error creating game: ' + error.message);
      }
    });
  }
  
  // ============ TRAVEL CALCULATOR ============
  // Note: Travel calculator now uses inline JavaScript in the page
  // This section is kept for backwards compatibility but no longer active
  
  // ============ VICTORY POINTS ============
  
  const calculateVpBtn = document.getElementById('calculate-vp');
  if (calculateVpBtn) {
    calculateVpBtn.addEventListener('click', async () => {
      const data = {
        reachedOregon: document.getElementById('reached-oregon')?.checked,
        survivingSpouses: parseInt(document.getElementById('surviving-spouses')?.value || 0),
        survivingChildren: parseInt(document.getElementById('surviving-children')?.value || 0),
        totalWealth: (
          parseInt(document.getElementById('cash')?.value || 0) +
          parseInt(document.getElementById('wagon-value')?.value || 0) +
          parseInt(document.getElementById('animals-value')?.value || 0)
        ),
        paintings: parseInt(document.getElementById('paintings')?.value || 0),
        vikingRune: document.getElementById('viking-rune')?.checked,
        indianMummy: document.getElementById('indian-mummy')?.checked,
        sasquatch: document.getElementById('sasquatch')?.checked,
        jackalope: document.getElementById('jackalope')?.checked,
        elderStatesman: document.getElementById('elder-statesman')?.checked
      };
      
      try {
        const response = await fetch('/api/calculate-vp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        document.getElementById('total-vp').textContent = `${result.total.toLocaleString()} VP`;
      } catch (error) {
        alert('Calculation error: ' + error.message);
      }
    });
  }
  
  // ============ COMBAT SYSTEM ============
  
  const enemySelect = document.getElementById('enemy-select');
  const enemyHpDisplay = document.getElementById('enemy-hp');
  const enemyHpBar = document.getElementById('enemy-hp-bar');
  const enemyNameDisplay = document.getElementById('enemy-name');
  const enemyAbilities = document.getElementById('enemy-abilities');
  const combatLog = document.getElementById('combat-log');
  
  let currentEnemyHp = 3;
  let maxEnemyHp = 3;
  
  if (enemySelect) {
    const updateEnemy = () => {
      const option = enemySelect.options[enemySelect.selectedIndex];
      const enemy = JSON.parse(option.dataset.enemy || '{}');
      
      currentEnemyHp = enemy.hp || 3;
      maxEnemyHp = enemy.hp || 3;
      
      if (enemyNameDisplay) enemyNameDisplay.textContent = enemy.name;
      if (enemyHpDisplay) enemyHpDisplay.textContent = `${currentEnemyHp}/${maxEnemyHp}`;
      if (enemyHpBar) enemyHpBar.style.width = '100%';
      if (enemyAbilities) {
        enemyAbilities.innerHTML = (enemy.abilities || [])
          .map(a => `<span class="bg-purple-600 px-2 py-1 rounded text-sm">${a}</span>`)
          .join('');
      }
    };
    
    enemySelect.addEventListener('change', updateEnemy);
    updateEnemy();
    
    // Damage/Heal buttons
    const damageBtn = document.getElementById('enemy-damage');
    const healBtn = document.getElementById('enemy-heal');
    
    const updateHpDisplay = () => {
      if (enemyHpDisplay) enemyHpDisplay.textContent = `${currentEnemyHp}/${maxEnemyHp}`;
      if (enemyHpBar) enemyHpBar.style.width = `${(currentEnemyHp / maxEnemyHp) * 100}%`;
      addToLog(currentEnemyHp <= 0 ? '💀 Enemy defeated!' : `Enemy HP: ${currentEnemyHp}/${maxEnemyHp}`);
    };
    
    if (damageBtn) {
      damageBtn.addEventListener('click', () => {
        currentEnemyHp = Math.max(0, currentEnemyHp - 1);
        updateHpDisplay();
      });
    }
    
    if (healBtn) {
      healBtn.addEventListener('click', () => {
        currentEnemyHp = Math.min(maxEnemyHp, currentEnemyHp + 1);
        updateHpDisplay();
      });
    }
  }
  
  // Attack roll
  const attackRollBtn = document.getElementById('attack-roll');
  const attackResult = document.getElementById('attack-result');
  
  if (attackRollBtn) {
    attackRollBtn.addEventListener('click', async () => {
      const modifier = parseInt(document.getElementById('attack-weapon')?.value || 0);
      
      try {
        const response = await fetch('/api/roll/d6');
        const data = await response.json();
        const total = data.roll + modifier;
        const isHit = total >= 4;
        
        attackResult.classList.remove('hidden');
        document.getElementById('attack-roll-value').textContent = data.roll;
        document.getElementById('attack-mod-value').textContent = modifier;
        document.getElementById('attack-total-value').textContent = total;
        
        const hitMiss = document.getElementById('attack-hit-miss');
        hitMiss.textContent = isHit ? '✓ HIT! (1 Damage)' : '✗ MISS';
        hitMiss.className = `text-2xl font-bold ${isHit ? 'text-green-500' : 'text-red-500'}`;
        
        if (isHit && currentEnemyHp > 0) {
          currentEnemyHp = Math.max(0, currentEnemyHp - 1);
          if (enemyHpDisplay) enemyHpDisplay.textContent = `${currentEnemyHp}/${maxEnemyHp}`;
          if (enemyHpBar) enemyHpBar.style.width = `${(currentEnemyHp / maxEnemyHp) * 100}%`;
        }
        
        addToLog(`Attack: ${data.roll} + ${modifier} = ${total} → ${isHit ? 'HIT!' : 'MISS'}`);
        
      } catch (error) {
        console.error('Attack roll error:', error);
      }
    });
  }
  
  // Combat log
  function addToLog(message) {
    if (combatLog) {
      const time = new Date().toLocaleTimeString();
      combatLog.innerHTML += `<p class="text-gray-300"><span class="text-gray-500">[${time}]</span> ${message}</p>`;
      combatLog.scrollTop = combatLog.scrollHeight;
    }
  }
  
  const clearLogBtn = document.getElementById('clear-log');
  if (clearLogBtn && combatLog) {
    clearLogBtn.addEventListener('click', () => {
      combatLog.innerHTML = '<p class="text-gray-500">Combat log cleared...</p>';
    });
  }
  
  // ============ RANDOMIZERS ============
  
  const randomizeJobBtn = document.getElementById('randomize-job');
  if (randomizeJobBtn) {
    randomizeJobBtn.addEventListener('click', () => {
      const allJobs = document.querySelectorAll('.job-card');
      if (allJobs.length > 0) {
        // Remove highlight from all
        allJobs.forEach(card => card.classList.remove('ring-4', 'ring-purple-500'));
        
        // Pick random
        const randomIndex = Math.floor(Math.random() * allJobs.length);
        const selected = allJobs[randomIndex];
        selected.classList.add('ring-4', 'ring-purple-500');
        selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  const randomizeNationalityBtn = document.getElementById('randomize-nationality');
  if (randomizeNationalityBtn) {
    randomizeNationalityBtn.addEventListener('click', () => {
      const allNats = document.querySelectorAll('.nationality-card');
      if (allNats.length > 0) {
        allNats.forEach(card => card.classList.remove('ring-4', 'ring-purple-500'));
        const randomIndex = Math.floor(Math.random() * allNats.length);
        const selected = allNats[randomIndex];
        selected.classList.add('ring-4', 'ring-purple-500');
        selected.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  // ============ PRINT CERTIFICATE ============
  
  const printCertBtn = document.getElementById('print-certificate');
  if (printCertBtn) {
    printCertBtn.addEventListener('click', () => {
      const totalVp = document.getElementById('total-vp')?.textContent || '0 VP';
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Oregon Trail Certificate</title>
          <style>
            body { font-family: Georgia, serif; text-align: center; padding: 40px; }
            h1 { font-size: 36px; margin-bottom: 10px; }
            h2 { font-size: 24px; color: #666; }
            .vp { font-size: 72px; color: #2563eb; font-weight: bold; margin: 40px 0; }
            .border { border: 8px double #8B4513; padding: 40px; margin: 20px; }
            .date { color: #999; margin-top: 40px; }
          </style>
        </head>
        <body>
          <div class="border">
            <h2>🚂 The Oregon Trail Simulation 🚂</h2>
            <h1>Certificate of Achievement</h1>
            <p>This certifies that the wagon train has successfully completed the journey</p>
            <p><strong>Independence, Missouri → Oregon City</strong></p>
            <div class="vp">${totalVp}</div>
            <p>Victory Points Earned</p>
            <p class="date">${new Date().toLocaleDateString()}</p>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    });
  }
  
  console.log('Oregon Trail Teacher Interface loaded!');
});
