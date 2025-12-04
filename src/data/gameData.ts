// Oregon Trail Simulation - Complete Game Data
// Updated with rules from teacher documents

// Job Classes organized by tier
export const JOB_CLASSES = {
  level1: {
    name: "Level 1 (Hard Mode)",
    description: "For students with lower participation points",
    jobs: [
      { id: "missionary", name: "Missionary", funds: "random", health: 3, skills: ["Charisma", "Holy (Extra Life)", "Linguist"], notes: "Can revive 1 player once." },
      { id: "teacher", name: "Teacher", funds: 10, health: 2, skills: ["Charisma", "Writing"], notes: "All party members get extra skill." },
      { id: "soldier", name: "Soldier", funds: 10, health: 4, skills: ["Bravery", "Weapons", "Tough"], notes: "Immune to Fear." },
      { id: "hunter", name: "Hunter", funds: 10, health: 4, skills: ["Weapons", "Travel", "Animals"], notes: "Essential for food gathering." },
      { id: "lumberjack", name: "Lumberjack", funds: 10, health: 4, skills: ["Carry", "Woodworking (Mechanical)"], notes: "Great for wagon repair." },
      { id: "herbalist", name: "Herbalist", funds: 5, health: 3, skills: ["Medicine 1", "Travel", "Herbalist"], notes: "Gather 2 berries/day guaranteed." },
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
    name: "Level 2 (Medium Mode)",
    description: "For students with moderate participation points",
    jobs: [
      { id: "banker", name: "Banker", funds: 500, health: 2, skills: ["Money 2"], notes: "Buy 20% cheaper, sell 20% higher." },
      { id: "veterinarian", name: "Veterinarian", funds: 50, health: 3, skills: ["Animals", "Medicine 1"], notes: "Heals animals & minor sickness." },
      { id: "lawyer", name: "Lawyer", funds: 100, health: 2, skills: ["Charisma", "Trickery", "Writing"], notes: "" },
      { id: "doctor", name: "Doctor", funds: 100, health: 3, skills: ["Medicine 2", "Charisma", "Extra Lv1-2 Skill"], notes: "Heals up to Disease II." },
      { id: "fur_trapper", name: "Fur Trapper", funds: 50, health: 4, skills: ["Weapons", "Travel", "Water", "Fur-Trapper"], notes: "Double pelts from hunting." },
      { id: "merchant", name: "Merchant", funds: 50, health: 3, skills: ["Money 2", "Travel", "Charisma", "Trickery"], notes: "Economic powerhouse." },
      { id: "frontiersman", name: "Frontiersman", funds: 10, health: 5, skills: ["Weapons", "Travel", "Animals", "Tough"], notes: "Combat specialist." },
      { id: "pirate", name: "Pirate", funds: 50, health: 4, skills: ["Weapons", "Trickery", "Water", "Swords"], notes: "" }
    ]
  },
  level3: {
    name: "Level 3 (Easy Mode)",
    description: "For students with high participation points",
    jobs: [
      { id: "elder_statesman", name: "Elder Statesman", funds: 500, health: 2, skills: ["Charisma 3", "Writing 2", "Trickery"], notes: "2x VP at the end!" },
      { id: "firebrand_preacher", name: "Firebrand Preacher", funds: 500, health: 3, skills: ["Charisma 3", "Writing 2", "Travel", "Holy 3", "Linguist"], notes: "Holy 3 = 3 Revives!" },
      { id: "explorer", name: "Explorer", funds: 10, health: 5, skills: ["Charisma 2", "Brave", "Weapons", "Travel", "Tough"], notes: "Extra Lv1-2 skill. Ultimate survivor." },
      { id: "surgeon", name: "Surgeon", funds: 500, health: 4, skills: ["Medicine 3", "Tough", "Cook", "Intelligence"], notes: "Heals all diseases." },
      { id: "aristocrat", name: "European Aristocrat", funds: 1000, health: 3, skills: ["Charisma 2", "Weapons", "Animals", "Writing", "Swords"], notes: "Comes with Beautiful Sword ($1200). Extra VP!" },
      { id: "inventor", name: "Inventor", funds: 500, health: 3, skills: ["Charisma", "Intelligence", "Mechanical 3"], notes: "Comes with Tesla Gun!" }
    ]
  }
};

// Health levels reference
export const HEALTH_LEVELS = {
  "Child (0-5)": 1,
  "Low": 2,
  "Medium": 3,
  "High": 4,
  "Very High": 5
};

// Fund levels reference
export const FUND_LEVELS = {
  "Very Low": 5,
  "Low": 10,
  "Medium": 50,
  "High": 100,
  "Very High": 500,
  "Extreme": 1000
};

// Nationalities with bonuses
export const NATIONALITIES = [
  { id: "african_american", name: "African-American", bonuses: ["Tough (extra)"] },
  { id: "american_yankee", name: "American (Yankee)", bonuses: ["Mechanical", "Writing", "+$50"] },
  { id: "american_south", name: "American (Southerner)", bonuses: ["Weapons (free rifle)", "One extra health"] },
  { id: "american_indian", name: "American-Indian", bonuses: ["Animals", "Linguist", "Travel"] },
  { id: "chinese", name: "Chinese", bonuses: ["Medicine 2", "Carry", "Money 2"] },
  { id: "dutch", name: "Dutch", bonuses: ["Money 2", "Fishing", "Water"] },
  { id: "english", name: "English", bonuses: ["Water", "Travel", "Mechanical"] },
  { id: "french", name: "French", bonuses: ["Charisma", "Cooking"] },
  { id: "german", name: "German", bonuses: ["Mechanical", "Weapons"] },
  { id: "hungarian", name: "Hungarian", bonuses: ["Trickery", "Animals"] },
  { id: "irish", name: "Irish", bonuses: ["Holy", "Come with 10 whiskey", "Lucky"] },
  { id: "italian", name: "Italian", bonuses: ["Cooking", "Charisma"] },
  { id: "japanese", name: "Japanese", bonuses: ["Come with Katana + Sword skill", "Fishing"] },
  { id: "polish", name: "Polish", bonuses: ["Bravery", "Animals", "Holy"] },
  { id: "russian", name: "Russian", bonuses: ["Tough", "One extra health"] },
  { id: "scotch", name: "Scotch", bonuses: ["Mountaineering", "Come with 10 whiskey", "Swords"] },
  { id: "spanish", name: "Spanish", bonuses: ["Bravery", "Travel"] },
  { id: "swiss", name: "Swiss", bonuses: ["Mountaineering", "Money 2", "Medicine 2"] },
  { id: "welsh", name: "Welsh", bonuses: ["Dark vision (extra)"] }
];

// Religions
export const RELIGIONS = [
  { id: "protestant", name: "Protestant", effect: "Better relations with Protestants and Forts" },
  { id: "catholic", name: "Catholic", effect: "Better relations with Catholics" },
  { id: "mormon", name: "Mormon", effect: "Better relations with Mormons; males may bring extra spouses" },
  { id: "none", name: "None/Indigenous", effect: "Better relations with American Indians (Cannot be Missionary/Firebrand Preacher)" }
];

// Supply Market (Base Prices at Independence)
export const SUPPLIES = {
  weapons: [
    { id: "hunting_rifle", name: "Hunting Rifle", price: 80, effect: "Range (one free shot)" },
    { id: "long_rifle", name: "Long Rifle", price: 100, effect: "Extra range (two free, powerful shots)" },
    { id: "pistol", name: "Pistol", price: 50, effect: "Quick" },
    { id: "shotgun", name: "Shotgun", price: 80, effect: "Powerful" },
    { id: "signature_handgun", name: "Signature Handgun", price: 140, effect: "Quick, powerful" },
    { id: "sword", name: "Sword", price: 50, effect: "Melee" },
    { id: "beautiful_sword", name: "Beautiful Sword", price: 1200, effect: "Powerful melee (free for Aristocrat)" },
    { id: "tesla_gun", name: "Tesla Gun", price: 1000, effect: "??? (free for Inventor, cannot buy)" }
  ],
  food: [
    { id: "chocolate", name: "Chocolate", price: 10, stack: 20, effect: "Food and other uses" },
    { id: "food_cans", name: "Food Cans", price: 5, stack: 20, effect: "Long shelf life" },
    { id: "fruit", name: "Fruit", price: 5, stack: 10, effect: "Spoils quickly" },
    { id: "meat", name: "Meat", price: 5, stack: 20, effect: "Spoils quickly" }
  ],
  health: [
    { id: "first_aid", name: "First Aid Kit", price: 12, stack: 20, effect: "Healing" },
    { id: "whiskey", name: "Whiskey", price: 10, stack: 20, effect: "Trading and other uses" }
  ],
  travel: [
    { id: "climbing_gear", name: "Climbing Gear", price: 10, stack: 20, effect: "Travel through mountains" },
    { id: "marbles", name: "Colorful Marbles", price: 5, stack: 20, effect: "Barter to natives at $200 per marble!" },
    { id: "dynamite", name: "Dynamite", price: 10, stack: 20, effect: "Destroys obstacles, fends off attacks" },
    { id: "fireworks", name: "Fireworks", price: 10, stack: 20, effect: "Scares off enemies" },
    { id: "rope", name: "Rope", price: 2, stack: 20, effect: "Many uses" },
    { id: "shovel", name: "Shovel", price: 5, stack: 5, effect: "Can dig" },
    { id: "torches", name: "Torches", price: 5, stack: 20, effect: "Safely explore caves" },
    { id: "water", name: "Water Barrels", price: 0, stack: 20, effect: "Pass through desert (FREE)" },
    { id: "binoculars", name: "Binoculars", price: 50, stack: 1, effect: "See dangers at forts before entering" }
  ],
  animals: [
    { id: "dog", name: "Dog", price: 5, slots: 2, effect: "Boosts attack (upgrade attack or tracking)" },
    { id: "donkey", name: "Donkey", price: 10, slots: 5, effect: "Carrying only" },
    { id: "ox", name: "Ox", price: 50, slots: 8, effect: "Required to pull wagon" },
    { id: "horse", name: "Horse", price: 30, slots: 5, effect: "+1 travel speed OR 5 carry slots (not stackable). Ride in battle with Animals skill" }
  ]
};

// Hunting Results (d20 or d22)
export const HUNTING_RESULTS = [
  { roll: [1, 1], name: "Sprayed by Skunk", type: "Bad", meat: 0, fur: false, effect: "No food, lose an extra day" },
  { roll: [2, 2], name: "Squirrel", type: "Small Game", meat: 1, fur: false },
  { roll: [3, 3], name: "Rabbit", type: "Small Game", meat: 2, fur: false },
  { roll: [4, 4], name: "Racoon", type: "Small Game", meat: 2, fur: false },
  { roll: [5, 5], name: "Fat Possum", type: "Small Game", meat: 3, fur: false },
  { roll: [6, 6], name: "Duck", type: "Small Game", meat: 2, fur: false },
  { roll: [7, 7], name: "Pompous Goose", type: "Small Game", meat: 4, fur: false },
  { roll: [8, 8], name: "Snake", type: "Small Game", meat: 1, fur: false },
  { roll: [9, 9], name: "Beaver", type: "Fur Animal", meat: 2, fur: true, furCount: 2 },
  { roll: [10, 10], name: "Fox", type: "Fur Animal", meat: 1, fur: true, furCount: 1 },
  { roll: [11, 11], name: "Fat Groundhog", type: "Small Game", meat: 3, fur: false },
  { roll: [12, 12], name: "Wild Honey", type: "Special", meat: 0, honey: 5, effect: "5 honey (doesn't spoil), faster movement when eaten" },
  { roll: [13, 13], name: "Mountain Lion Ambush!", type: "Danger", meat: 0, damage: 1, effect: "Lose 1 health" },
  { roll: [14, 14], name: "Deer", type: "Big Game", meat: 6, hide: 1 },
  { roll: [15, 15], name: "Elk", type: "Big Game", meat: 12, hide: 1 },
  { roll: [16, 16], name: "Moose", type: "Big Game", meat: 15, hide: 2 },
  { roll: [17, 17], name: "Buffalo", type: "Big Game", meat: 40, hide: 4 },
  { roll: [18, 18], name: "Mushrooms", type: "Special", effect: "Good: Remove ailment | Medium: +Health | Bad: Death" },
  { roll: [19, 19], name: "Wolf", type: "Predator", meat: 5, fur: true, combat: "Level 1", peltValue: 20 },
  { roll: [20, 20], name: "Black Bear", type: "Predator", meat: 12, fur: true, combat: "Level 2", peltValue: 100 },
  { roll: [21, 21], name: "Grizzly Bear!", type: "Predator", meat: 16, fur: true, combat: "Level 3", peltValue: 100 },
  { roll: [22, 30], name: "Random Event", type: "Event", effect: "Roll on Event table" }
];

// Fishing Results (d12)
export const FISHING_RESULTS = [
  { roll: [1, 1], name: "No Fish", meat: 0 },
  { roll: [2, 2], name: "Bluegill", meat: 1 },
  { roll: [3, 3], name: "Bass", meat: 2 },
  { roll: [4, 4], name: "Trout", meat: 3 },
  { roll: [5, 5], name: "Salmon", meat: 4 },
  { roll: [6, 6], name: "Big Salmon", meat: 5 },
  { roll: [7, 7], name: "Fat Carp", meat: 6 },
  { roll: [8, 8], name: "Duck", meat: 2 },
  { roll: [9, 9], name: "Pike", meat: 3 },
  { roll: [10, 10], name: "Catfish", meat: 2 },
  { roll: [11, 11], name: "Beaver", meat: 2, fur: true, furCount: 2 },
  { roll: [12, 12], name: "Otter", meat: 2, fur: true, furCount: 2 }
];

// Random Events (d100, 1-83 range with specific entries)
export const RANDOM_EVENTS = [
  { roll: [1, 1], id: "hear_fighting", name: "Hear Fighting", description: "Hear fighting in the distance. Investigate? If YES: Join fight to save Indian guide who joins party (Fight Level-2). If NO: No effect", decision: true },
  { roll: [2, 8], id: "cave", name: "Find a Cave", description: "Explore? Need torch (99% death without). Find: Treasure, Supplies, Enemy, Tunnel shortcut, or send child through small entrance", decision: true },
  { roll: [9, 12], id: "help_needed", name: "Someone Needs Help", description: "Help? (1-9): Good job +VP, NPC joins party. (10): Get jumped! Level 3 FIGHT! +VP if victorious", decision: true },
  { roll: [13, 13], id: "burnt_cabin", name: "Burnt-out Cabin", description: "Investigate? Find moonshiner's stash (+5 whiskey)", loot: "+5 Whiskey" },
  { roll: [14, 14], id: "odd_stone", name: "Odd Stone", description: "Investigate with Intelligence or Linguist. Success: Viking Rune Stone (+200 VP)", requirement: "Intelligence or Linguist", vp: 200 },
  { roll: [15, 20], id: "abandoned_wagon", name: "Abandoned Wagon", description: "Find abandoned conestoga wagon with random supplies", loot: "Random supplies" },
  { roll: [21, 25], id: "burial_ground", name: "Indian Burial Ground", description: "Loot: Indians hostile, gain Mummy (+100VP). Go through: Tribal Opinion -2. Go around: Lose 10 days", decision: true },
  { roll: [26, 28], id: "rattlesnake", name: "Rattlesnake Bite!", description: "Get bitten by rattlesnake (Poisoned status)", effect: "Poisoned" },
  { roll: [29, 29], id: "ambush", name: "Ambush!", description: "Get ambushed! Roll for enemy type: Indians (Level 1-2), Bandits (Level 3), or Wolf Pack (Level 2)", combat: true },
  { roll: [30, 30], id: "sasquatch", name: "Sasquatch!", description: "Find Sasquatch (looks suspiciously like Gabe!). Fight? YES + Victory = 400 VP. NO = No one believes you", combat: true, vp: 400 },
  { roll: [31, 31], id: "jackalope", name: "Jackalope!", description: "Something small watches you. Need Whiskey AND Animal skill to find elusive Jackalope (+100 VP)", requirement: "Whiskey + Animals", vp: 100 },
  { roll: [32, 40], id: "wild_fruit", name: "Wild Fruit/Berries", description: "Find wild fruit and berries", loot: "+5 Fruit" },
  { roll: [41, 41], id: "shaman", name: "Native Shaman", description: "Can remove status ailments for $50", service: "$50" },
  { roll: [42, 48], id: "get_lost", name: "Get Lost!", description: "Your party gets lost. Lose 1-4 days of travel", effect: "Lose 1-4 days" },
  { roll: [49, 51], id: "injured", name: "Injured", description: "Someone is injured. Lose 1 health", effect: "-1 Health" },
  { roll: [52, 53], id: "badly_injured", name: "Badly Injured", description: "Someone is badly injured. Lose 2 health", effect: "-2 Health" },
  { roll: [54, 54], id: "grievous_wound", name: "Grievously Wounded", description: "Someone is grievously wounded. Lose 3 health + Bleeding status", effect: "-3 Health + Bleeding" },
  { roll: [55, 55], id: "nothing", name: "Uneventful", description: "Nothing happens", effect: null },
  { roll: [56, 56], id: "locked_treasure", name: "Locked Treasure (Low)", description: "Find locked treasure. Need Mechanical to open", requirement: "Mechanical" },
  { roll: [57, 57], id: "rescue_lady", name: "Rescue Young Lady", description: "Female joins rescuer's party (+50 VP if survives). Need Medicine I and wagon space", requirement: "Medicine I + Space", vp: 50 },
  { roll: [58, 58], id: "rescue_trapper", name: "Rescue French Fur Trapper", description: "Fur Trapper joins party (+50 VP). Has: Animals, Travel, Water, Carry skills. Need wagon space", vp: 50 },
  { roll: [59, 59], id: "pass_blocked", name: "Pass Blocked", description: "The pass is blocked!", effect: "Lose 7 days" },
  { roll: [60, 60], id: "trickster", name: "Meet Trickster", description: "Lose $1-50 unless you have Trickster or Intelligence in party", effect: "Lose $1-50" },
  { roll: [61, 61], id: "cold_snap", name: "Cold Snap!", description: "Sudden cold! Entire party loses 1 health", effect: "Party -1 Health" },
  { roll: [62, 65], id: "rain", name: "Torrential Rain", description: "Heavy rain delays travel", effect: "Lose 2 days" },
  { roll: [66, 67], id: "excessive_heat", name: "Excessive Heat", description: "Lose 1 day. Need 1 water per person or lose 1 health", effect: "Lose 1 day, need water" },
  { roll: [68, 70], id: "muscle_cramp", name: "Muscle Cramping", description: "Party suffers muscle cramps", effect: "Lose 1 day" },
  { roll: [71, 71], id: "witch_curse", name: "Cursed by Witch!", description: "A witch curses you!", effect: "Cursed status" },
  { roll: [72, 77], id: "camping_spot", name: "Beautiful Camping Spot", description: "Find a beautiful spot to rest. Lose 1 day but gain Happy trait", effect: "Lose 1 day, gain Happy" },
  { roll: [78, 78], id: "war", name: "WAR!", description: "Stumble into battle between two armies! They think you're spies! Escape with Trickster, Travel, March, or Charisma 3. Otherwise: captured 20 days or pay $200", requirement: "Trickery/Travel/Charisma 3" },
  { roll: [79, 83], id: "wagon_breakdown", name: "Wagon Breakdown", description: "Fix with Rope (1 journey) or Mechanical (2 journeys). Mechanical 3 increases travel speed", requirement: "Rope or Mechanical" },
  { roll: [84, 95], id: "rival_gang", name: "Rival Gang Encounter", description: "Encounter another wagon train", decision: true },
  { roll: [96, 96], id: "poxed_camp", name: "Poxed Camp", description: "Find recently deceased wagon family with pox. If investigate: Disease III!", effect: "Risk Disease III" },
  { roll: [97, 100], id: "lost_forever", name: "Lost Forever", description: "Solo: Lost and never heard from again (death). With partner: Argument, both get ANGRY trait. Negated by Travel skill", effect: "Death or Angry" }
];

// Treasures
export const TREASURES = {
  big: [
    { name: "Coronado's Conquistador Armor", effect: "Armored breastplate: TOUGH trait + Health +3" },
    { name: "Cave of Gold", effect: "$10,000 (BARSOOM written on wall)" },
    { name: "Indian Mummy", effect: "+100 VP" },
    { name: "Find Gold!", effect: "$200-500 random" },
    { name: "Dead Alien!", effect: "+500 VP" },
    { name: "Dinosaur Bones", effect: "+200 VP" },
    { name: "Mysterious Egg", effect: "Becomes a Raptor! Can fight, ride, or carry" },
    { name: "Mysterious Voice", effect: "Charisma 3: Sasquatch joins (Endurance 5, Carry 7, carries wagon across rivers)" },
    { name: "Fountain of Youth", effect: "One may drink: Immortal! +1000 VP" }
  ],
  medium: [
    { name: "Gold", effect: "$100-200" }
  ],
  low: [
    { name: "Cool Supplies", effect: "Gun, Binoculars, Telescope, Fireworks, or Dynamite" }
  ]
};

// Enemies
export const ENEMIES = [
  { id: "brave_tomahawk", name: "Brave (Tomahawk)", weapon: "melee", hp: 3, abilities: [] },
  { id: "brave_archer", name: "Brave (Archer)", weapon: "Range 1", hp: 2, abilities: [] },
  { id: "brave_gunner", name: "Brave (Gunner)", weapon: "Range 2", hp: 2, abilities: [] },
  { id: "horseman", name: "Horseman", weapon: "melee", hp: 4, abilities: ["Swift"] },
  { id: "horse_archer", name: "Horse Archer", weapon: "Range 1", hp: 4, abilities: ["Swift"] },
  { id: "war_chief", name: "War Chief", weapon: "melee", hp: 5, abilities: ["Tough"] },
  { id: "medicine_man", name: "Medicine Man", weapon: "n/a", hp: 3, abilities: ["Heals 2hp/turn"] },
  { id: "dog", name: "Dog", weapon: "melee", hp: 2, abilities: [] },
  { id: "wolf", name: "Wolf", weapon: "melee", hp: 3, abilities: [] },
  { id: "alpha_wolf", name: "Alpha Wolf", weapon: "melee", hp: 4, abilities: ["Tough"] },
  { id: "black_bear", name: "Black Bear", weapon: "melee", hp: 5, abilities: ["Tough"] },
  { id: "grizzly_bear", name: "Grizzly Bear", weapon: "melee", hp: 8, abilities: ["Tough", "Bleeding"] },
  { id: "legendary_bear", name: "Legendary Bear", weapon: "melee", hp: 20, abilities: ["Tough", "Bleeding"] },
  { id: "sasquatch", name: "Sasquatch", weapon: "melee", hp: 30, abilities: ["Tough", "Dismember"] },
  { id: "raptor", name: "Raptor", weapon: "melee", hp: 20, abilities: ["Tough", "Bleeding"] },
  { id: "fort_soldier", name: "Fort Soldier", weapon: "Range 1", hp: 4, abilities: [] },
  { id: "fort_commander", name: "Fort Commander", weapon: "Range 1", hp: 3, abilities: ["Signature Handgun"] },
  { id: "fort_horseman", name: "Fort Horseman", weapon: "Range 1", hp: 4, abilities: ["Swift"] },
  { id: "fort_artillery", name: "Fort Artillery", weapon: "Range 4", hp: 2, abilities: ["1 Auto Kill"] },
  { id: "mountainman", name: "Mountainman", weapon: "Range 2", hp: 5, abilities: ["Tough"] },
  { id: "gunslinger", name: "Gunslinger", weapon: "Range 1", hp: 4, abilities: [] }
];

// Fight Levels
export const FIGHT_LEVELS = {
  level1: { description: "Can be dispatched with any weapon", hp: 1 },
  level2: { description: "Can be dispatched with any weapon", hp: 3 },
  level3: { description: "Must be dispatched with powerful weapon", hp: 3, abilities: ["Fear"] }
};

// Status Effects
export const STATUS_EFFECTS = {
  negative: [
    { id: "depressed", name: "Depressed", effect: "Travel takes 3x as long", icon: "😔" },
    { id: "disease_1", name: "Disease I", effect: "Lose 1 health per 5 days", icon: "🤒" },
    { id: "disease_2", name: "Disease II", effect: "Lose 2 health per 4 days", icon: "🤢" },
    { id: "disease_3", name: "Disease III", effect: "Lose 3 health per 3 days", icon: "☠️" },
    { id: "kleptomaniac", name: "Kleptomaniac", effect: "Lose $1-5/day, trouble with law", icon: "🤑" },
    { id: "insane", name: "Insane", effect: "Becomes enemy after 7 days if not cured", icon: "🤪" },
    { id: "cannibal", name: "Cannibal", effect: "Randomly eats party member every night until cured/killed", icon: "👹" },
    { id: "cursed", name: "Cursed", effect: "Suffers from Fear trait", icon: "🔮" },
    { id: "fear", name: "Fear", effect: "-1 health, travel takes 2x as long", icon: "😨" },
    { id: "angry", name: "Angry", effect: "Travel takes 2x as long (remove with Charisma)", icon: "😠" },
    { id: "poisoned", name: "Poisoned", effect: "Lose 1 health per day", icon: "🐍" },
    { id: "bleeding", name: "Bleeding", effect: "Lose 2 health per day", icon: "🩸" }
  ],
  positive: [
    { id: "happy", name: "Happy", effect: "2x faster movement", icon: "😊" },
    { id: "blessed", name: "Blessed", effect: "+1 health (even over cap)", icon: "✨" }
  ]
};

// Trail Route with locations
export const TRAIL_STOPS = [
  { id: "independence", name: "Independence, MO", distance: 0, daysFromPrev: 0, type: "start", description: "Starting point - Buy supplies!" },
  { id: "courthouse_rock", name: "Courthouse Rock", distance: 480, daysFromPrev: 5, type: "landmark", description: "Waypoint" },
  { id: "chimney_rock", name: "Chimney Rock", distance: 12, daysFromPrev: 1, type: "village", description: "Lakota-Sioux Village nearby" },
  { id: "fort_laramie", name: "Fort Laramie", distance: 70, daysFromPrev: 2, type: "fort", description: "Major Trading Post" },
  { id: "independence_rock", name: "Independence Rock", distance: 190, daysFromPrev: 12, type: "landmark", description: "Famous landmark" },
  { id: "fort_bridger", name: "Fort Bridger", distance: 225, daysFromPrev: 15, type: "fort", description: "Mormon Settlement (20% Dysentery)" },
  { id: "soda_springs", name: "Soda Springs", distance: 162, daysFromPrev: 8, type: "landmark", description: "Natural springs" },
  { id: "fort_hall", name: "Fort Hall", distance: 57, daysFromPrev: 2, type: "fort", description: "Mormon area, Shoshone Village nearby (3 days)" },
  { id: "fort_boise", name: "Fort Boise", distance: 280, daysFromPrev: 16, type: "fort", description: "50% Tuberculosis! High prices" },
  { id: "whitman_mission", name: "Whitman Mission", distance: 220, daysFromPrev: 12, type: "mission", description: "30% Measles. Holy 3 = Free items, Holy 1 = 50% off" },
  { id: "the_dalles", name: "The Dalles", distance: 120, daysFromPrev: 7, type: "crossing", description: "River crossing & trade center" },
  { id: "oregon_city", name: "Oregon City", distance: 100, daysFromPrev: 5, type: "end", description: "Finish Line! +500 VP" }
];

// Trading Posts inventory
export const TRADING_POSTS = {
  chimney_rock: {
    name: "Chimney Rock - Lakota-Sioux Village",
    items: [
      { name: "Fruit", price: 6, amount: 2, effect: "Spoils quickly" },
      { name: "Meat", price: 2, amount: 20, effect: "Spoils quickly" },
      { name: "Whiskey", price: 50, amount: 0 },
      { name: "Glass Marbles", price: 200, amount: 0 },
      { name: "Totem Stick", price: 500, amount: "SOLD OUT", effect: "Relation Boost w/ Indians" },
      { name: "Bow and Arrows", price: 20, amount: 5, effect: "Ranged weapon" },
      { name: "Animal Furs", price: 10, amount: "SOLD OUT" },
      { name: "Horse", price: 30, amount: 2 },
      { name: "Animal Trainer", price: 100, amount: "up to level 3", effect: "Combat (dog) + Carry weight" }
    ],
    activities: ["Steal Idol (Trickery - Tribe Angry)", "Horseback Race (Animals)", "Right of Manhood (Tough)", "Convert Tribe (Missionary - +500VP + Indian Guard)", "Join Dance", "Free Whiskey Request", "Argument (Linguist)"]
  },
  fort_laramie: {
    name: "Fort Laramie",
    items: [
      { name: "Food Cans", price: 7, amount: 20 },
      { name: "First Aid Kit", price: 20, amount: 20 },
      { name: "Meat", price: 10, amount: 50 },
      { name: "Whiskey", price: 25, amount: 10 },
      { name: "Hunting Rifle", price: 90, amount: "SOLD OUT" },
      { name: "Pistol", price: 60, amount: "SOLD OUT" },
      { name: "Rope", price: 5, amount: 20 },
      { name: "Torch", price: 5, amount: 20 },
      { name: "Dynamite", price: 15, amount: "SOLD OUT" },
      { name: "Shovel", price: 10, amount: 2 },
      { name: "Donkey", price: 40, amount: 1 },
      { name: "Furs (sell)", price: 50, amount: 0 }
    ],
    activities: ["Gamble (Trickery: $1-300)", "Fiery Sermon (Holy 3: $1-500)", "Ask Donations (Holy 1: $1-25)", "Mysterious Stranger (Shortcut $50)", "Tavern Brawl (Tough)", "Trouble with Law (Charisma 2)", "Balance Books (Money 2)"]
  },
  fort_bridger: {
    name: "Fort Bridger (20% Dysentery)",
    items: [
      { name: "Food Cans", price: 14, amount: 4 },
      { name: "First Aid Kit", price: 50, amount: "SOLD OUT" },
      { name: "Meat", price: 10, amount: 12 },
      { name: "Whiskey", price: 15, amount: 20 },
      { name: "Rope", price: 5, amount: 7 },
      { name: "Dog", price: 0, amount: "SOLD OUT", effect: "FREE!" },
      { name: "Coonskin Cap", price: 2, amount: "SOLD OUT", effect: "+1 Range on all guns for 1 character" },
      { name: "Climbing Gear", price: 15, amount: 4 }
    ],
    activities: ["Gamble (Trickster: $1-5)", "Mysterious Stranger (Shortcut $50)", "Trouble with Law (Charisma 1)", "Fight Legendary Bear (Weapons+Bravery, 3 days)", "Emmett Lombardi the Mountain Man (5hp Tough, drops Coonskin Cap)"]
  },
  fort_hall: {
    name: "Fort Hall",
    items: [
      { name: "Food Cans", price: 10, amount: 15 },
      { name: "First Aid Kit", price: 40, amount: 3 },
      { name: "Meat", price: 5, amount: "SOLD OUT" },
      { name: "Climbing Gear", price: 20, amount: 5 },
      { name: "Furs (sell)", price: 50, amount: 5 }
    ],
    activities: ["No Gambling - FIGHT", "No Proselytizing (Mormons) - FIGHT", "Argument with Mormon Preacher (Holy 3 or FIGHT)", "Children convert to Mormonism", "Found drinking alcohol - FIGHT"],
    nearbyVillage: "Shoshone Village (3 days travel)"
  },
  shoshone_fort_hall: {
    name: "Shoshone Indian Village (near Fort Hall)",
    items: [
      { name: "Meat", price: 2, amount: 10 },
      { name: "Furs", price: 20, amount: 10 },
      { name: "Dog", price: 1, amount: 3 },
      { name: "Horse", price: 20, amount: 2 }
    ],
    activities: ["Steal Idol (Trickery)", "Buffalo Hunt (Animals+Horse+Weapons)", "Right of Manhood (Endurance)", "Salmon Fishing (Fishing)", "Duck Hunt (Hunter)", "Chieftain's Son joins party (3hp Tough melee)", "Marry into Tribe"]
  },
  fort_boise: {
    name: "Fort Boise (50% Tuberculosis!)",
    items: [
      { name: "Hunting Rifle", price: 70, amount: "SOLD OUT" },
      { name: "Elephant Gun", price: 120, amount: "SOLD OUT", effect: "Range + Power" },
      { name: "Shotgun", price: 82, amount: 2 },
      { name: "Dynamite", price: 7, amount: 5 },
      { name: "Horse", price: 32, amount: 5 },
      { name: "Rope", price: 3, amount: 5 },
      { name: "Torch", price: 1, amount: "SOLD OUT" },
      { name: "First Aid Kit", price: 50, amount: 7 },
      { name: "Whiskey", price: 10, amount: 20 },
      { name: "Food Cans", price: 5, amount: 60 },
      { name: "Meat", price: 2, amount: 40 },
      { name: "Fireworks", price: 10, amount: 10 },
      { name: "Snowshoes", price: 10, amount: "SOLD OUT", effect: "Move through snow (1 day per snowshoe)" },
      { name: "Climbing Gear", price: 12, amount: 7 }
    ],
    activities: ["Commander's Wife wants chocolates ($50 per chocolate!)", "Female company = 10% better bartering per day", "Rodeo (Animals: win $50!)", "Hire Ulrich Zwingli (Swiss Mountaineer + Long Rifle + Binoculars, Charisma 2, 2x mountain movement)"]
  },
  whitman_mission: {
    name: "Whitman Mission (30% Measles)",
    items: [
      { name: "Meat", price: 10, amount: 10 },
      { name: "Fruit", price: 12, amount: 5 },
      { name: "Rope", price: 5, amount: "SOLD OUT" },
      { name: "Snowshoes", price: 3, amount: "SOLD OUT" },
      { name: "Wine", price: 20, amount: 3 },
      { name: "First Aid Kit", price: 40, amount: 5 },
      { name: "Dog II", price: 10, amount: 5 },
      { name: "Torch", price: 10, amount: 10 },
      { name: "Shovel", price: 5, amount: 2 },
      { name: "Donkey II", price: 20, amount: 1 }
    ],
    activities: ["Holy 3 = FREE Items!", "Holy 1 = 50% off!", "WARNING: Local village permanently hostile!"]
  },
  the_dalles: {
    name: "The Dalles Village Trade Center",
    items: [
      { name: "Meat", price: 2, amount: 10 },
      { name: "Furs", price: 20, amount: 10 }
    ],
    activities: []
  }
};

// Wagon problems
export const WAGON_PROBLEMS = {
  plains: 10, // 10% chance
  mountains: 20, // 20% chance
  repairChance: {
    noMechanical: 10,
    mechanical1: 50,
    mechanical3: 95
  }
};

// Skills Reference (expanded)
export const SKILLS = [
  { id: "animals", name: "Animals", description: "Ride horses, +10% charm hostile animal before combat" },
  { id: "bravery", name: "Bravery", description: "Immune to Fear" },
  { id: "carry", name: "Carry", description: "+2 carry slots on person (good for wagon breakdown survival)" },
  { id: "charisma", name: "Charisma", description: "Good for negotiations" },
  { id: "charisma_2", name: "Charisma 2", description: "Difficult negotiations, +1 charm human enemy" },
  { id: "charisma_3", name: "Charisma 3", description: "Heated negotiations, +2 charm human enemies" },
  { id: "cooking", name: "Cooking", description: "Divide food consumption by 2" },
  { id: "cooking_2", name: "Cooking 2", description: "Divide food consumption by 3" },
  { id: "cooking_3", name: "Cooking 3", description: "Divide by 3 + party gets Tough in combat" },
  { id: "dark_vision", name: "Dark Vision", description: "Travel through caves without torch" },
  { id: "fishing", name: "Fishing", description: "Can fish, get 2x meat from fishing" },
  { id: "fur_trapper", name: "Fur-Trapper", description: "Double pelts from hunting/fishing" },
  { id: "herbalist", name: "Herbalist", description: "Detect safe food, gather 2 berries/day guaranteed" },
  { id: "holy", name: "Holy", description: "Revive one player from death once" },
  { id: "holy_3", name: "Holy 3", description: "Revive up to 3x during trip" },
  { id: "intelligence", name: "Intelligence", description: "Cannot be tricked, various other uses" },
  { id: "linguist", name: "Linguist", description: "Better results with natives" },
  { id: "luck", name: "Luck", description: "Reroll on critical fails" },
  { id: "mechanical", name: "Mechanical", description: "Better results operating machines, 50% wagon fix" },
  { id: "mechanical_3", name: "Mechanical 3", description: "Building and operating machines, 95% wagon fix" },
  { id: "medicine_1", name: "Medicine 1", description: "Heal level 1 sicknesses" },
  { id: "medicine_2", name: "Medicine 2", description: "Heal level 1-2 sicknesses" },
  { id: "medicine_3", name: "Medicine 3", description: "Heal level 1-3 sicknesses" },
  { id: "miner", name: "Miner", description: "Get $50-500 from exploring caves" },
  { id: "money_2", name: "Money 2", description: "Buy 20% cheaper, sell 20% higher" },
  { id: "mountaineering", name: "Mountaineering", description: "No climbing gear needed for mountains" },
  { id: "painting", name: "Painting", description: "5 canvases, paint scenes for +5 VP each" },
  { id: "travel", name: "Travel", description: "+1 travel speed (not stackable), cannot get lost" },
  { id: "trickery", name: "Trickery", description: "Trick people, steal from other human players" },
  { id: "tough", name: "Tough", description: "Difficult to kill, normal attacks do half damage" },
  { id: "water", name: "Water", description: "Travel safely over rivers, can fish" },
  { id: "weapons", name: "Weapons", description: "Use most weapons without injuring yourself" },
  { id: "writing", name: "Writing", description: "Everyone on team gets +1 level 1 skill" },
  { id: "writing_2", name: "Writing 2", description: "Everyone on team gets +1 level 1 or 2 skill" }
];

// Tesla Gun results (d10)
export const TESLA_GUN_RESULTS = [
  { roll: 1, result: "Zap self (fatal)", note: "Famous Inventor immune" },
  { roll: 2, result: "Zap self (-2hp)", note: "Famous Inventor immune" },
  { roll: 3, result: "Zap self (-1hp)", note: "Famous Inventor immune" },
  { roll: 4, result: "Gun short circuits (breaks)", note: "Famous Inventor immune" },
  { roll: 5, result: "Zap 1 enemy (-1hp)", note: "" },
  { roll: 6, result: "Zap 2 enemies (-2hp)", note: "" },
  { roll: 7, result: "Zap 3 enemies (-3hp)", note: "" },
  { roll: 8, result: "Disintegrate 1 enemy", note: "" },
  { roll: 9, result: "Disintegrate ALL enemies", note: "" },
  { roll: 10, result: "EXPLODES! 5 fighters destroyed", note: "Famous Inventor immune" }
];

// Victory Points
export const VP_REWARDS = {
  reachOregon: 500,
  wealthPer10: 1,
  survivingSpouse: 100,
  survivingChild: 50,
  paintingPer: 5,
  vikingRune: 200,
  indianMummy: 100,
  sasquatch: 400,
  jackalope: 100,
  deadAlien: 500,
  dinosaurBones: 200,
  fountainOfYouth: 1000,
  bigfootFoot: 50,
  fossilizedSkull: 150,
  convertTribe: 500,
  elderStatesmanMultiplier: 2
};
