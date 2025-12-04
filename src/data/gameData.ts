// Oregon Trail Simulation - Complete Game Data

// Job Classes organized by tier
export const JOB_CLASSES = {
  level1: {
    name: "Working Class (Hard Mode)",
    jobs: [
      { id: "missionary", name: "Missionary", funds: "random", health: 3, skills: ["Charisma", "Holy", "Linguist"], notes: "Can revive 1 player once." },
      { id: "teacher", name: "Teacher", funds: 10, health: 2, skills: ["Charisma", "Writing"], notes: "Writing: All party members get 1 extra skill." },
      { id: "soldier", name: "Soldier", funds: 10, health: 4, skills: ["Bravery", "Weapons", "Tough"], notes: "Immune to Fear." },
      { id: "hunter", name: "Hunter", funds: 10, health: 4, skills: ["Weapons", "Travel", "Animals"], notes: "Essential for food gathering." },
      { id: "lumberjack", name: "Lumberjack", funds: 10, health: 4, skills: ["Carry", "Woodworking"], notes: "Great for wagon repair." },
      { id: "herbalist", name: "Herbalist", funds: 5, health: 3, skills: ["Medicine 1", "Travel", "Herbalist"], notes: "Can gather 2 berries/day automatically." },
      { id: "shepherd", name: "Shepherd", funds: 10, health: 4, skills: ["Animals", "Travel"], notes: "Good with livestock." },
      { id: "fisherman", name: "Fisherman", funds: 10, health: 4, skills: ["Water", "Fishing"], notes: "2x meat from fishing." },
      { id: "ex_slave", name: "Ex-Slave", funds: 5, health: 5, skills: ["Tough", "Carry"], notes: "Extremely resilient." },
      { id: "factory_worker", name: "Factory Worker", funds: 50, health: 2, skills: ["Mechanical"], notes: "Good for repairs." },
      { id: "outlaw", name: "Outlaw", funds: "random", health: 3, skills: ["Trickery", "Travel"], notes: "Can steal/trick." },
      { id: "cook", name: "Cook", funds: 10, health: 3, skills: ["Cooking"], notes: "Divides food consumption by 2." },
      { id: "miner", name: "Miner", funds: 10, health: 3, skills: ["Dark Vision", "Carry", "Miner"], notes: "Get $50-$500 in caves." }
    ]
  },
  level2: {
    name: "Middle Class (Medium Mode)",
    jobs: [
      { id: "banker", name: "Banker", funds: 500, health: 2, skills: ["Money 2"], notes: "Buy cheap, sell high." },
      { id: "veterinarian", name: "Veterinarian", funds: 50, health: 3, skills: ["Animals", "Medicine 1"], notes: "Heals animals & minor sickness." },
      { id: "lawyer", name: "Lawyer", funds: 100, health: 2, skills: ["Charisma", "Trickery", "Writing"], notes: "" },
      { id: "doctor", name: "Doctor", funds: 100, health: 3, skills: ["Medicine 2", "Charisma", "Extra Skill"], notes: "Heals up to Disease II." },
      { id: "fur_trapper", name: "Fur Trapper", funds: 50, health: 4, skills: ["Weapons", "Travel", "Water", "Fur-Trapper"], notes: "Double pelts from hunting." },
      { id: "merchant", name: "Merchant", funds: 50, health: 3, skills: ["Money 2", "Travel", "Charisma", "Trickery"], notes: "Economic powerhouse." },
      { id: "frontiersman", name: "Frontiersman", funds: 10, health: 5, skills: ["Weapons", "Travel", "Animals", "Tough"], notes: "Combat specialist." },
      { id: "pirate", name: "Pirate", funds: 50, health: 4, skills: ["Weapons", "Trickery", "Water", "Swords"], notes: "" }
    ]
  },
  level3: {
    name: "Elite (Easy Mode)",
    jobs: [
      { id: "elder_statesman", name: "Elder Statesman", funds: "2x VP", health: 5, skills: ["Charisma 3", "Writing 2", "Trickery"], notes: "Massive VP multiplier." },
      { id: "firebrand_preacher", name: "Firebrand Preacher", funds: "variable", health: 5, skills: ["Charisma 3", "Writing 2", "Travel", "Holy 3", "Linguist"], notes: "Holy 3 = 3 Revives." },
      { id: "explorer", name: "Explorer", funds: 10, health: 5, skills: ["Charisma 2", "Brave", "Weapons", "Travel", "Tough"], notes: "Ultimate survivor." },
      { id: "surgeon", name: "Surgeon", funds: 500, health: 4, skills: ["Medicine 3", "Tough", "Cook", "Intelligence"], notes: "Heals all diseases." },
      { id: "aristocrat", name: "Aristocrat", funds: 1000, health: 3, skills: ["Charisma 2", "Weapons", "Animals", "Writing", "Swords"], notes: "Starts with Beautiful Sword ($1200)." },
      { id: "inventor", name: "Inventor", funds: 500, health: 3, skills: ["Charisma", "Intelligence", "Mechanical 3"], notes: "Starts with Tesla Gun." }
    ]
  }
};

// Nationalities with bonuses
export const NATIONALITIES = [
  { id: "african_american", name: "African-American", bonus: "Tough (Extra)" },
  { id: "american_yankee", name: "American (Yankee)", bonus: "Mechanical, Writing, +$50" },
  { id: "american_south", name: "American (South)", bonus: "Weapons (Free Rifle), +1 HP" },
  { id: "american_indian", name: "American-Indian", bonus: "Animals, Linguist, Travel" },
  { id: "chinese", name: "Chinese", bonus: "Medicine 2, Carry, Money 2" },
  { id: "dutch", name: "Dutch", bonus: "Money 2, Fishing, Water" },
  { id: "english", name: "English", bonus: "Water, Travel, Mechanical" },
  { id: "french", name: "French", bonus: "Charisma, Cooking" },
  { id: "german", name: "German", bonus: "Mechanical, Weapons" },
  { id: "hungarian", name: "Hungarian", bonus: "Trickery, Animals" },
  { id: "irish", name: "Irish", bonus: "Holy, Lucky, +10 Whiskey" },
  { id: "italian", name: "Italian", bonus: "Cooking, Charisma" },
  { id: "japanese", name: "Japanese", bonus: "Sword Skill, Fishing, Free Katana" },
  { id: "polish", name: "Polish", bonus: "Bravery, Animals, Holy" },
  { id: "russian", name: "Russian", bonus: "Tough, +1 HP" },
  { id: "scotch", name: "Scotch", bonus: "Mountaineering, Swords, +10 Whiskey" },
  { id: "spanish", name: "Spanish", bonus: "Bravery, Travel" },
  { id: "swiss", name: "Swiss", bonus: "Mountaineering, Money 2, Medicine 2" },
  { id: "welsh", name: "Welsh", bonus: "Dark Vision (Extra)" }
];

// Religions
export const RELIGIONS = [
  { id: "protestant", name: "Protestant", effect: "Better relations with Protestant forts." },
  { id: "catholic", name: "Catholic", effect: "Better relations with Catholics." },
  { id: "mormon", name: "Mormon", effect: "Better relations with Mormons; males may bring extra spouses." },
  { id: "none", name: "None/Indigenous", effect: "Better relations with American Indians. (Cannot be Missionary/Preacher)." }
];

// Supply Market (Base Prices)
export const SUPPLIES = {
  food: [
    { id: "chocolate", name: "Chocolate", price: 10, spoils: false },
    { id: "cans", name: "Canned Goods", price: 5, spoils: false },
    { id: "fruit", name: "Fruit", price: 5, spoils: true },
    { id: "meat", name: "Meat", price: 5, spoils: true }
  ],
  health: [
    { id: "first_aid", name: "First Aid Kit", price: 12 },
    { id: "whiskey", name: "Whiskey", price: 10 }
  ],
  weapons: [
    { id: "rifle", name: "Rifle", price: 80, modifier: 2, powerful: true },
    { id: "long_rifle", name: "Long Rifle", price: 100, modifier: 2, powerful: true },
    { id: "pistol", name: "Pistol", price: 50, modifier: 1, powerful: false },
    { id: "shotgun", name: "Shotgun", price: 80, modifier: 2, powerful: true }
  ],
  tools: [
    { id: "rope", name: "Rope", price: 2 },
    { id: "shovel", name: "Shovel", price: 5 },
    { id: "torches", name: "Torches", price: 5 },
    { id: "climbing_gear", name: "Climbing Gear", price: 10 }
  ],
  trade_goods: [
    { id: "marbles", name: "Colorful Marbles", price: 5, tradeValue: 200 },
    { id: "fireworks", name: "Fireworks", price: 10 }
  ],
  animals: [
    { id: "ox", name: "Ox", price: 50, carrySlots: 8, notes: "Required to pull wagon" },
    { id: "horse", name: "Horse", price: 30, carrySlots: 5, notes: "+1 Travel Speed OR 5 carry slots" },
    { id: "donkey", name: "Donkey", price: 10, carrySlots: 5 },
    { id: "dog", name: "Dog", price: 5, carrySlots: 2, notes: "Boosts attack/tracking" }
  ]
};

// Inflation multipliers by location
export const INFLATION_RATES: Record<string, number> = {
  "independence": 1.0,
  "courthouse_rock": 1.25,
  "chimney_rock": 1.25,
  "fort_laramie": 1.5,
  "independence_rock": 1.75,
  "fort_bridger": 2.0,
  "soda_springs": 2.25,
  "fort_hall": 2.5,
  "fort_boise": 3.0,
  "whitman_mission": 3.0,
  "the_dalles": 3.0,
  "oregon_city": 1.0
};

// Trail Route
export const TRAIL_STOPS = [
  { id: "independence", name: "Independence, MO", distance: 0, daysFromPrev: 0, type: "start", description: "Starting point" },
  { id: "courthouse_rock", name: "Courthouse Rock", distance: 480, daysFromPrev: 32, type: "landmark", description: "First major landmark" },
  { id: "chimney_rock", name: "Chimney Rock", distance: 12, daysFromPrev: 1, type: "village", description: "Lakota Village nearby" },
  { id: "fort_laramie", name: "Fort Laramie", distance: 70, daysFromPrev: 5, type: "fort", description: "Major Trading Post" },
  { id: "independence_rock", name: "Independence Rock", distance: 190, daysFromPrev: 12, type: "landmark", description: "Famous landmark" },
  { id: "fort_bridger", name: "Fort Bridger", distance: 225, daysFromPrev: 15, type: "fort", description: "Mormon Settlement" },
  { id: "soda_springs", name: "Soda Springs", distance: 162, daysFromPrev: 8, type: "landmark", description: "Natural springs" },
  { id: "fort_hall", name: "Fort Hall", distance: 57, daysFromPrev: 2, type: "fort", description: "Shoshone Village nearby" },
  { id: "fort_boise", name: "Fort Boise", distance: 280, daysFromPrev: 16, type: "fort", description: "High Inflation area" },
  { id: "whitman_mission", name: "Whitman Mission", distance: 220, daysFromPrev: 12, type: "mission", description: "Historic mission" },
  { id: "the_dalles", name: "The Dalles", distance: 120, daysFromPrev: 7, type: "crossing", description: "River Rafting Decision point" },
  { id: "oregon_city", name: "Oregon City", distance: 100, daysFromPrev: 5, type: "end", description: "Finish Line!" }
];

// Random Events (d100)
export const RANDOM_EVENTS = [
  { roll: [1, 1], id: "hear_fighting", name: "Hear Fighting", description: "You hear sounds of fighting nearby. Join? (Y/N)", decision: true },
  { roll: [2, 8], id: "cave", name: "Cave Discovered!", description: "Find Cave (Need Torch or Risk Death). Loot: Treasure, Supplies, or Tunnel.", requirement: "Torch or Dark Vision" },
  { roll: [9, 12], id: "help_needed", name: "Someone Needs Help", description: "Find someone needing help (VP gain or Ambush risk).", decision: true },
  { roll: [13, 13], id: "burnt_cabin", name: "Burnt Cabin", description: "Find a burnt cabin with moonshiner whiskey.", loot: "Whiskey" },
  { roll: [14, 14], id: "odd_stone", name: "Odd Stone", description: "Linguist needed to decipher: Rune Stone +200 VP", requirement: "Linguist", vp: 200 },
  { roll: [15, 20], id: "abandoned_wagon", name: "Abandoned Wagon", description: "Find an abandoned wagon with supplies.", loot: "Random supplies" },
  { roll: [21, 25], id: "burial_ground", name: "Indian Burial Ground", description: "Loot = Mummy/Hostile; Go Around = Lose time.", decision: true },
  { roll: [26, 28], id: "rattlesnake", name: "Rattlesnake Bite!", description: "A party member is bitten! (Poisoned status)", effect: "Poisoned" },
  { roll: [29, 29], id: "ambush", name: "Ambush!", description: "Attacked by Indians/Bandits/Wolves!", combat: true },
  { roll: [30, 30], id: "sasquatch", name: "Sasquatch Encounter!", description: "Fight? Win = 400 VP. Legendary creature!", combat: true, vp: 400 },
  { roll: [31, 31], id: "jackalope", name: "Jackalope!", description: "Need Whiskey + Animal Skill = 100 VP", requirement: "Whiskey + Animals", vp: 100 },
  { roll: [32, 41], id: "nothing", name: "Nothing Eventful", description: "The trail continues peacefully.", effect: null },
  { roll: [42, 48], id: "get_lost", name: "Get Lost!", description: "Lose 1-4 days of travel.", effect: "Lost" },
  { roll: [49, 54], id: "injury", name: "Injury Event", description: "A party member is injured! Lose 1-3 Health.", effect: "Damage" },
  { roll: [55, 55], id: "good_weather", name: "Good Weather", description: "Perfect traveling conditions!", effect: "Bonus" },
  { roll: [56, 56], id: "locked_treasure", name: "Locked Treasure", description: "Found a locked chest! Need Mechanical skill to open.", requirement: "Mechanical" },
  { roll: [57, 60], id: "nothing2", name: "Uneventful", description: "Nothing special happens today.", effect: null },
  { roll: [61, 61], id: "cold_snap", name: "Cold Snap!", description: "-1 Health party-wide!", effect: "Cold" },
  { roll: [62, 65], id: "rain", name: "Torrential Rain", description: "Heavy rain! Lose 2 days.", effect: "Delay" },
  { roll: [66, 77], id: "nothing3", name: "Safe Travel", description: "The journey continues without incident.", effect: null },
  { roll: [78, 78], id: "war", name: "WAR!", description: "Stumble into a battle! Escape with Trickster/Charisma 3 or be captured.", requirement: "Trickery or Charisma 3" },
  { roll: [79, 83], id: "wagon_breakdown", name: "Wagon Breakdown", description: "Your wagon breaks down! Fix with Rope/Mechanical.", requirement: "Rope or Mechanical" },
  { roll: [84, 95], id: "rival_gang", name: "Rival Gang Encounter", description: "Meet a rival wagon train.", decision: true },
  { roll: [96, 96], id: "poxed_camp", name: "Poxed Camp", description: "Discovered a disease-ridden camp. Risk of infection!", effect: "Disease" },
  { roll: [97, 100], id: "lost_forever", name: "Lost Forever", description: "A party member wanders off! (Death/Lost)", effect: "Death" }
];

// Hunting Results (d20)
export const HUNTING_RESULTS = [
  { roll: [1, 4], name: "Squirrel", type: "Small Game", meat: 1, fur: false },
  { roll: [5, 6], name: "Rabbit", type: "Small Game", meat: 2, fur: false },
  { roll: [7, 7], name: "Duck", type: "Small Game", meat: 3, fur: false },
  { roll: [8, 8], name: "Goose", type: "Small Game", meat: 4, fur: false },
  { roll: [9, 9], name: "Beaver", type: "Fur Animal", meat: 3, fur: true },
  { roll: [10, 10], name: "Fox", type: "Fur Animal", meat: 2, fur: true },
  { roll: [11, 12], name: "Nothing", type: "No Catch", meat: 0, fur: false },
  { roll: [13, 13], name: "Mountain Lion Ambush!", type: "Danger", meat: 0, fur: false, damage: 1 },
  { roll: [14, 14], name: "Deer", type: "Big Game", meat: 6, fur: false },
  { roll: [15, 15], name: "Elk", type: "Big Game", meat: 15, fur: false },
  { roll: [16, 16], name: "Moose", type: "Big Game", meat: 25, fur: false },
  { roll: [17, 17], name: "Buffalo", type: "Big Game", meat: 40, fur: false },
  { roll: [18, 18], name: "Nothing Special", type: "No Catch", meat: 0, fur: false },
  { roll: [19, 19], name: "Wolf Encounter!", type: "Predator", meat: 4, fur: true, combat: true },
  { roll: [20, 20], name: "Bear Encounter!", type: "Predator", meat: 10, fur: true, combat: true },
  { roll: [21, 21], name: "Grizzly Bear!", type: "Predator", meat: 15, fur: true, combat: true }
];

// Fishing Results (d12)
export const FISHING_RESULTS = [
  { roll: [1, 1], name: "No Fish", meat: 0 },
  { roll: [2, 3], name: "Bluegill", meat: 1 },
  { roll: [4, 5], name: "Catfish", meat: 2 },
  { roll: [6, 7], name: "Bass", meat: 3 },
  { roll: [8, 9], name: "Trout", meat: 4 },
  { roll: [10, 10], name: "Salmon", meat: 6 },
  { roll: [11, 11], name: "Beaver", meat: 3, fur: true },
  { roll: [12, 12], name: "Otter", meat: 2, fur: true }
];

// Enemies
export const ENEMIES = [
  { id: "wolf", name: "Wolf", hp: 3, level: 2, abilities: [], xp: 10 },
  { id: "wolf_pack", name: "Wolf Pack", hp: 6, level: 2, abilities: ["Multiple"], xp: 25 },
  { id: "bandit", name: "Bandit", hp: 3, level: 2, abilities: [], xp: 15 },
  { id: "bandits", name: "Bandit Gang", hp: 9, level: 2, abilities: ["Multiple"], xp: 40 },
  { id: "mountain_lion", name: "Mountain Lion", hp: 3, level: 2, abilities: [], xp: 15 },
  { id: "grizzly", name: "Grizzly Bear", hp: 8, level: 3, abilities: ["Tough", "Bleeding"], xp: 50 },
  { id: "sasquatch", name: "Sasquatch", hp: 30, level: 4, abilities: ["Dismember"], xp: 400 },
  { id: "hostile_natives", name: "Hostile Natives", hp: 6, level: 2, abilities: [], xp: 30 }
];

// Status Effects
export const STATUS_EFFECTS = {
  negative: [
    { id: "depressed", name: "Depressed", effect: "Travel takes 3x as long", icon: "😔" },
    { id: "disease_1", name: "Disease I", effect: "Lose 1 Health every few days. Cured by Medicine 1", icon: "🤒" },
    { id: "disease_2", name: "Disease II", effect: "Lose 2 Health every few days. Cured by Medicine 2", icon: "🤢" },
    { id: "disease_3", name: "Disease III", effect: "Lose 3 Health every few days. Cured by Medicine 3", icon: "☠️" },
    { id: "kleptomaniac", name: "Kleptomaniac", effect: "Steals $1-5/day", icon: "🤑" },
    { id: "insane", name: "Insane", effect: "Becomes Enemy after 7 days", icon: "🤪" },
    { id: "cannibal", name: "Cannibal", effect: "Eats party member every night", icon: "👹" },
    { id: "poisoned", name: "Poisoned", effect: "Lose 1 Health/day", icon: "🐍" },
    { id: "bleeding", name: "Bleeding", effect: "Lose 2 Health/day", icon: "🩸" },
    { id: "fear", name: "Fear", effect: "Travel takes 2x as long (unless Brave)", icon: "😨" }
  ],
  positive: [
    { id: "happy", name: "Happy", effect: "2x Movement Speed", icon: "😊" },
    { id: "blessed", name: "Blessed", effect: "+1 Health (can exceed max)", icon: "✨" }
  ]
};

// Skills Reference
export const SKILLS = [
  { id: "animals", name: "Animals", description: "Handle livestock, track animals" },
  { id: "bravery", name: "Bravery", description: "Immune to Fear effects" },
  { id: "carry", name: "Carry", description: "Increased carrying capacity" },
  { id: "charisma", name: "Charisma", description: "Better trading, negotiations" },
  { id: "cooking", name: "Cooking", description: "Reduces food consumption by 50%" },
  { id: "dark_vision", name: "Dark Vision", description: "See in caves without torches" },
  { id: "fishing", name: "Fishing", description: "2x meat from fishing" },
  { id: "fur_trapper", name: "Fur-Trapper", description: "Double pelts from hunting" },
  { id: "herbalist", name: "Herbalist", description: "Gather 2 berries/day automatically" },
  { id: "holy", name: "Holy", description: "Extra Life - prevent death once" },
  { id: "intelligence", name: "Intelligence", description: "Solve puzzles, make better decisions" },
  { id: "linguist", name: "Linguist", description: "Reroll failed reaction checks, 20% discount at Indian Trading Posts" },
  { id: "mechanical", name: "Mechanical", description: "Fix wagons (50% at Lv1, 95% at Lv3)" },
  { id: "medicine", name: "Medicine", description: "Heal diseases (Lv1-3 based on severity)" },
  { id: "miner", name: "Miner", description: "Get $50-$500 in caves" },
  { id: "money", name: "Money", description: "Better buying/selling prices" },
  { id: "mountaineering", name: "Mountaineering", description: "Navigate mountain terrain" },
  { id: "swords", name: "Swords", description: "Melee combat bonus" },
  { id: "tough", name: "Tough", description: "Extra resilience, resist damage" },
  { id: "travel", name: "Travel", description: "+1 Travel Speed" },
  { id: "trickery", name: "Trickery", description: "Steal, deceive, escape situations" },
  { id: "water", name: "Water", description: "Navigate rivers, swim" },
  { id: "weapons", name: "Weapons", description: "Combat proficiency with firearms" },
  { id: "woodworking", name: "Woodworking", description: "Craft and repair wooden items" },
  { id: "writing", name: "Writing", description: "+1 Skill Slot to all party (Working Class skills only)" }
];

// Victory Point calculations
export const VP_REWARDS = {
  reachOregon: 500,
  wealthPer10: 1,
  survivingSpouse: 100,
  survivingChild: 50,
  paintingPer: 5,
  vikingRune: 200,
  indianMummy: 100,
  sasquatch: 400,
  jackalope: 100
};
