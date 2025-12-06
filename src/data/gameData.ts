// Oregon Trail Simulation - Complete Game Data
// Updated with rules from teacher documents

// All Jobs in a single list (no difficulty tiers)
export const ALL_JOBS = [
  // Former Level 1 - Working Class
  { id: "missionary", name: "Missionary", funds: "random", health: 3, skills: ["Charisma", "Holy (Extra Life)", "Linguist"], notes: "Can revive 1 player once.", category: "Working Class" },
  { id: "teacher", name: "Teacher", funds: 10, health: 2, skills: ["Charisma", "Writing"], notes: "All party members get extra skill.", category: "Working Class" },
  { id: "soldier", name: "Soldier", funds: 10, health: 4, skills: ["Bravery", "Weapons", "Tough"], notes: "Immune to Fear.", category: "Working Class" },
  { id: "hunter", name: "Hunter", funds: 10, health: 4, skills: ["Weapons", "Travel", "Animals"], notes: "Essential for food gathering.", category: "Working Class" },
  { id: "lumberjack", name: "Lumberjack", funds: 10, health: 4, skills: ["Carry", "Woodworking (Mechanical)"], notes: "Great for wagon repair.", category: "Working Class" },
  { id: "herbalist", name: "Herbalist", funds: 5, health: 3, skills: ["Medicine 1", "Travel", "Herbalist"], notes: "Gather 2 berries/day guaranteed.", category: "Working Class" },
  { id: "shepherd", name: "Shepherd", funds: 10, health: 4, skills: ["Animals", "Travel"], notes: "Good with livestock.", category: "Working Class" },
  { id: "fisherman", name: "Fisherman", funds: 10, health: 4, skills: ["Water", "Fishing"], notes: "2x meat from fishing.", category: "Working Class" },
  { id: "ex_slave", name: "Ex-Slave", funds: 5, health: 5, skills: ["Tough", "Carry"], notes: "Extremely resilient.", category: "Working Class" },
  { id: "factory_worker", name: "Factory Worker", funds: 50, health: 2, skills: ["Mechanical"], notes: "Good for repairs.", category: "Working Class" },
  { id: "outlaw", name: "Outlaw", funds: "random", health: 3, skills: ["Trickery", "Travel"], notes: "Can steal/trick.", category: "Working Class" },
  { id: "cook", name: "Cook", funds: 10, health: 3, skills: ["Cooking"], notes: "Divides food consumption by 2.", category: "Working Class" },
  { id: "miner", name: "Miner", funds: 10, health: 3, skills: ["Dark Vision", "Carry", "Miner"], notes: "Get $50-$500 in caves.", category: "Working Class" },
  // Former Level 2 - Middle Class
  { id: "banker", name: "Banker", funds: 500, health: 2, skills: ["Money 2"], notes: "Buy 20% cheaper, sell 20% higher.", category: "Middle Class" },
  { id: "veterinarian", name: "Veterinarian", funds: 50, health: 3, skills: ["Animals", "Medicine 1"], notes: "Heals animals & minor sickness.", category: "Middle Class" },
  { id: "lawyer", name: "Lawyer", funds: 100, health: 2, skills: ["Charisma", "Trickery", "Writing"], notes: "", category: "Middle Class" },
  { id: "doctor", name: "Doctor", funds: 100, health: 3, skills: ["Medicine 2", "Charisma", "Extra Lv1-2 Skill"], notes: "Heals up to Disease II.", category: "Middle Class" },
  { id: "fur_trapper", name: "Fur Trapper", funds: 50, health: 4, skills: ["Weapons", "Travel", "Water", "Fur-Trapper"], notes: "Double pelts from hunting.", category: "Middle Class" },
  { id: "merchant", name: "Merchant", funds: 50, health: 3, skills: ["Money 2", "Travel", "Charisma", "Trickery"], notes: "Economic powerhouse.", category: "Middle Class" },
  { id: "frontiersman", name: "Frontiersman", funds: 10, health: 5, skills: ["Weapons", "Travel", "Animals", "Tough"], notes: "Combat specialist.", category: "Middle Class" },
  { id: "pirate", name: "Pirate", funds: 50, health: 4, skills: ["Weapons", "Trickery", "Water", "Swords"], notes: "", category: "Middle Class" },
  // Former Level 3 - Elite Class
  { id: "elder_statesman", name: "Elder Statesman", funds: 500, health: 2, skills: ["Charisma 3", "Writing 2", "Trickery"], notes: "2x VP at the end!", category: "Elite" },
  { id: "firebrand_preacher", name: "Firebrand Preacher", funds: 500, health: 3, skills: ["Charisma 3", "Writing 2", "Travel", "Holy 3", "Linguist"], notes: "Holy 3 = 3 Revives!", category: "Elite" },
  { id: "explorer", name: "Explorer", funds: 10, health: 5, skills: ["Charisma 2", "Brave", "Weapons", "Travel", "Tough"], notes: "Extra Lv1-2 skill. Ultimate survivor.", category: "Elite" },
  { id: "surgeon", name: "Surgeon", funds: 500, health: 4, skills: ["Medicine 3", "Tough", "Cook", "Intelligence"], notes: "Heals all diseases.", category: "Elite" },
  { id: "aristocrat", name: "European Aristocrat", funds: 1000, health: 3, skills: ["Charisma 2", "Weapons", "Animals", "Writing", "Swords"], notes: "Comes with Beautiful Sword ($1200). Extra VP!", category: "Elite" },
  { id: "inventor", name: "Inventor", funds: 500, health: 3, skills: ["Charisma", "Intelligence", "Mechanical 3"], notes: "Comes with Tesla Gun!", category: "Elite" }
];

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

// Enhanced Religions with detailed effects
export const RELIGIONS = [
  { 
    id: "protestant", 
    name: "Protestant", 
    effect: "Better relations with Protestants and Forts",
    fortBonus: "+20% discount at US Forts",
    missionBonus: "Free supplies at Whitman Mission",
    tribalRelation: "Neutral",
    specialAbility: "Can conduct Sunday service to remove Fear/Angry from party",
    restrictions: []
  },
  { 
    id: "catholic", 
    name: "Catholic", 
    effect: "Better relations with Catholics and Spanish-speaking peoples",
    fortBonus: "Access to Catholic missions for free healing",
    missionBonus: "+10% better prices at any mission",
    tribalRelation: "Slightly negative with some tribes",
    specialAbility: "Last Rites: Dying party member gets +50 VP",
    restrictions: []
  },
  { 
    id: "mormon", 
    name: "Mormon", 
    effect: "Better relations with Mormons at Fort Bridger and Fort Hall",
    fortBonus: "50% discount at Mormon settlements",
    missionBonus: "Can join Mormon wagon trains for safety",
    tribalRelation: "Neutral",
    specialAbility: "Males may bring extra spouses (+100 VP each)",
    restrictions: ["No alcohol allowed", "Must tithe 10% of earnings"]
  },
  { 
    id: "none", 
    name: "None/Indigenous", 
    effect: "Better relations with American Indians",
    fortBonus: "No special bonus at forts",
    missionBonus: "Cannot receive mission charity",
    tribalRelation: "+2 with all native tribes",
    specialAbility: "Can participate in tribal ceremonies for bonuses",
    restrictions: ["Cannot be Missionary or Firebrand Preacher"]
  }
];

// Barter items for native villages (no cash)
export const BARTER_ITEMS = [
  { id: "whiskey", name: "Whiskey", barterValue: 3, description: "Highly valued for trade" },
  { id: "tobacco", name: "Tobacco", barterValue: 2, description: "Common trade good" },
  { id: "glass_beads", name: "Glass Beads", barterValue: 4, description: "Decorative, highly prized" },
  { id: "colorful_marbles", name: "Colorful Marbles", barterValue: 5, description: "Rare and beautiful" },
  { id: "metal_tools", name: "Metal Tools", barterValue: 3, description: "Useful implements" },
  { id: "blankets", name: "Blankets", barterValue: 4, description: "Warm and practical" },
  { id: "cloth", name: "Cloth/Fabric", barterValue: 2, description: "For clothing" },
  { id: "mirrors", name: "Small Mirrors", barterValue: 5, description: "Fascinating novelty" },
  { id: "knives", name: "Metal Knives", barterValue: 4, description: "Superior to stone" },
  { id: "rifles", name: "Rifles", barterValue: 10, description: "Powerful weapons" },
  { id: "ammunition", name: "Ammunition", barterValue: 2, description: "For firearms" },
  { id: "horses", name: "Horses", barterValue: 8, description: "Valuable animals" }
];

// Supply Market (Base Prices at Independence)
export const SUPPLIES = {
  weapons: [
    { id: "hunting_rifle", name: "Hunting Rifle", price: 80, effect: "Range (one free shot)", damage: 2 },
    { id: "long_rifle", name: "Long Rifle", price: 100, effect: "Extra range (two free, powerful shots)", damage: 3 },
    { id: "pistol", name: "Pistol", price: 50, effect: "Quick", damage: 1 },
    { id: "shotgun", name: "Shotgun", price: 80, effect: "Powerful", damage: 2 },
    { id: "signature_handgun", name: "Signature Handgun", price: 140, effect: "Quick, powerful", damage: 2 },
    { id: "sword", name: "Sword", price: 50, effect: "Melee", damage: 1 },
    { id: "beautiful_sword", name: "Beautiful Sword", price: 1200, effect: "Powerful melee (free for Aristocrat)", damage: 3 },
    { id: "tesla_gun", name: "Tesla Gun", price: 1000, effect: "??? (free for Inventor, cannot buy)", damage: "special" },
    { id: "bow_arrows", name: "Bow and Arrows", price: 20, effect: "Silent ranged weapon", damage: 1 }
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
    { id: "dog", name: "Dog", price: 5, slots: 2, effect: "Boosts attack (upgrade attack or tracking)", hp: 2, damage: 1 },
    { id: "donkey", name: "Donkey", price: 10, slots: 5, effect: "Carrying only" },
    { id: "ox", name: "Ox", price: 50, slots: 8, effect: "Required to pull wagon" },
    { id: "horse", name: "Horse", price: 30, slots: 5, effect: "+1 travel speed OR 5 carry slots. Ride in battle with Animals skill", hp: 3, damage: 1 }
  ]
};

// Hunting Results (d22) - Fixed to work correctly
export const HUNTING_RESULTS = [
  { roll: 1, name: "Sprayed by Skunk", type: "Bad", meat: 0, fur: false, effect: "No food, lose an extra day" },
  { roll: 2, name: "Squirrel", type: "Small Game", meat: 1, fur: false },
  { roll: 3, name: "Rabbit", type: "Small Game", meat: 2, fur: false },
  { roll: 4, name: "Racoon", type: "Small Game", meat: 2, fur: false },
  { roll: 5, name: "Fat Possum", type: "Small Game", meat: 3, fur: false },
  { roll: 6, name: "Duck", type: "Small Game", meat: 2, fur: false },
  { roll: 7, name: "Pompous Goose", type: "Small Game", meat: 4, fur: false },
  { roll: 8, name: "Snake", type: "Small Game", meat: 1, fur: false },
  { roll: 9, name: "Beaver", type: "Fur Animal", meat: 2, fur: true, furCount: 2 },
  { roll: 10, name: "Fox", type: "Fur Animal", meat: 1, fur: true, furCount: 1 },
  { roll: 11, name: "Fat Groundhog", type: "Small Game", meat: 3, fur: false },
  { roll: 12, name: "Wild Honey", type: "Special", meat: 0, honey: 5, effect: "5 honey (doesn't spoil), faster movement when eaten" },
  { roll: 13, name: "Mountain Lion Ambush!", type: "Danger", meat: 0, damage: 1, effect: "Lose 1 health", combat: true },
  { roll: 14, name: "Deer", type: "Big Game", meat: 6, hide: 1 },
  { roll: 15, name: "Elk", type: "Big Game", meat: 12, hide: 1 },
  { roll: 16, name: "Moose", type: "Big Game", meat: 15, hide: 2 },
  { roll: 17, name: "Buffalo", type: "Big Game", meat: 40, hide: 4 },
  { roll: 18, name: "Mushrooms", type: "Special", effect: "Roll d6: 1-2 Good (Remove ailment), 3-4 Medium (+1 Health), 5-6 Bad (Poisoned!)" },
  { roll: 19, name: "Wolf", type: "Predator", meat: 5, fur: true, furCount: 1, combat: true, combatLevel: 1, peltValue: 20 },
  { roll: 20, name: "Black Bear", type: "Predator", meat: 12, fur: true, furCount: 1, combat: true, combatLevel: 2, peltValue: 100 },
  { roll: 21, name: "Grizzly Bear!", type: "Predator", meat: 16, fur: true, furCount: 1, combat: true, combatLevel: 3, peltValue: 100 },
  { roll: 22, name: "Random Event", type: "Event", effect: "Roll on Random Event table (d100)" }
];

// Fishing Results (d12)
export const FISHING_RESULTS = [
  { roll: 1, name: "No Fish", meat: 0 },
  { roll: 2, name: "Bluegill", meat: 1 },
  { roll: 3, name: "Bass", meat: 2 },
  { roll: 4, name: "Trout", meat: 3 },
  { roll: 5, name: "Salmon", meat: 4 },
  { roll: 6, name: "Big Salmon", meat: 5 },
  { roll: 7, name: "Fat Carp", meat: 6 },
  { roll: 8, name: "Duck", meat: 2 },
  { roll: 9, name: "Pike", meat: 3 },
  { roll: 10, name: "Catfish", meat: 2 },
  { roll: 11, name: "Beaver", meat: 2, fur: true, furCount: 2 },
  { roll: 12, name: "Otter", meat: 2, fur: true, furCount: 2 }
];

// Random Events (d100)
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
  { roll: [41, 41], id: "shaman", name: "Native Shaman", description: "Can remove status ailments. Barter required (value 3+)", service: "Barter" },
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

// Enemies with combat stats
export const ENEMIES = [
  { id: "brave_tomahawk", name: "Brave (Tomahawk)", weapon: "melee", hp: 3, damage: 1, abilities: [] },
  { id: "brave_archer", name: "Brave (Archer)", weapon: "Range 1", hp: 2, damage: 1, abilities: [] },
  { id: "brave_gunner", name: "Brave (Gunner)", weapon: "Range 2", hp: 2, damage: 2, abilities: [] },
  { id: "horseman", name: "Horseman", weapon: "melee", hp: 4, damage: 2, abilities: ["Swift"] },
  { id: "horse_archer", name: "Horse Archer", weapon: "Range 1", hp: 4, damage: 1, abilities: ["Swift"] },
  { id: "war_chief", name: "War Chief", weapon: "melee", hp: 5, damage: 2, abilities: ["Tough"] },
  { id: "medicine_man", name: "Medicine Man", weapon: "n/a", hp: 3, damage: 0, abilities: ["Heals 2hp/turn"] },
  { id: "dog", name: "Dog", weapon: "melee", hp: 2, damage: 1, abilities: [] },
  { id: "wolf", name: "Wolf", weapon: "melee", hp: 3, damage: 1, abilities: [] },
  { id: "alpha_wolf", name: "Alpha Wolf", weapon: "melee", hp: 4, damage: 2, abilities: ["Tough"] },
  { id: "black_bear", name: "Black Bear", weapon: "melee", hp: 5, damage: 2, abilities: ["Tough"] },
  { id: "grizzly_bear", name: "Grizzly Bear", weapon: "melee", hp: 8, damage: 3, abilities: ["Tough", "Bleeding"] },
  { id: "legendary_bear", name: "Legendary Bear", weapon: "melee", hp: 20, damage: 4, abilities: ["Tough", "Bleeding"] },
  { id: "sasquatch", name: "Sasquatch", weapon: "melee", hp: 30, damage: 5, abilities: ["Tough", "Dismember"] },
  { id: "raptor", name: "Raptor", weapon: "melee", hp: 20, damage: 4, abilities: ["Tough", "Bleeding"] },
  { id: "fort_soldier", name: "Fort Soldier", weapon: "Range 1", hp: 4, damage: 2, abilities: [] },
  { id: "fort_commander", name: "Fort Commander", weapon: "Range 1", hp: 3, damage: 3, abilities: ["Signature Handgun"] },
  { id: "fort_horseman", name: "Fort Horseman", weapon: "Range 1", hp: 4, damage: 2, abilities: ["Swift"] },
  { id: "fort_artillery", name: "Fort Artillery", weapon: "Range 4", hp: 2, damage: 10, abilities: ["1 Auto Kill"] },
  { id: "mountainman", name: "Mountainman", weapon: "Range 2", hp: 5, damage: 3, abilities: ["Tough"] },
  { id: "gunslinger", name: "Gunslinger", weapon: "Range 1", hp: 4, damage: 2, abilities: [] },
  { id: "bandit", name: "Bandit", weapon: "Range 1", hp: 3, damage: 1, abilities: [] },
  { id: "bandit_leader", name: "Bandit Leader", weapon: "Range 2", hp: 5, damage: 2, abilities: ["Tough"] },
  { id: "mountain_lion", name: "Mountain Lion", weapon: "melee", hp: 4, damage: 2, abilities: ["Swift"] }
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
    { id: "depressed", name: "Depressed", effect: "Travel time divided by 3", icon: "😔", travelDivisor: 3 },
    { id: "disease_1", name: "Disease I", effect: "Lose 1 health per 5 days", icon: "🤒" },
    { id: "disease_2", name: "Disease II", effect: "Lose 2 health per 4 days", icon: "🤢" },
    { id: "disease_3", name: "Disease III", effect: "Lose 3 health per 3 days", icon: "☠️" },
    { id: "kleptomaniac", name: "Kleptomaniac", effect: "Lose $1-5/day, trouble with law", icon: "🤑" },
    { id: "insane", name: "Insane", effect: "Becomes enemy after 7 days if not cured", icon: "🤪" },
    { id: "cannibal", name: "Cannibal", effect: "Randomly eats party member every night until cured/killed", icon: "👹" },
    { id: "cursed", name: "Cursed", effect: "Suffers from Fear trait", icon: "🔮" },
    { id: "fear", name: "Fear", effect: "-1 health, travel time divided by 3", icon: "😨", travelDivisor: 3 },
    { id: "angry", name: "Angry", effect: "Travel time divided by 3 (remove with Charisma)", icon: "😠", travelDivisor: 3 },
    { id: "poisoned", name: "Poisoned", effect: "Lose 1 health per day", icon: "🐍" },
    { id: "bleeding", name: "Bleeding", effect: "Lose 2 health per day", icon: "🩸" }
  ],
  positive: [
    { id: "happy", name: "Happy", effect: "2x faster movement", icon: "😊", travelMultiplier: 2 },
    { id: "blessed", name: "Blessed", effect: "+1 health (even over cap)", icon: "✨" }
  ]
};

// Trail Route with locations and historical significance
export const TRAIL_STOPS = [
  { 
    id: "independence", 
    name: "Independence, MO", 
    distance: 0, 
    daysFromPrev: 0, 
    type: "start", 
    description: "Starting point - Buy supplies!", 
    terrain: "plains",
    historicalSignificance: {
      title: "Independence, Missouri - Gateway to the West",
      yearEstablished: "1827",
      summary: "Independence was the primary jumping-off point for settlers heading west on the Oregon, California, and Santa Fe Trails. By the 1840s, it was called the 'Queen City of the Trails.'",
      keyFacts: [
        "Became the eastern terminus of the Santa Fe Trail in 1827",
        "By 1846, over 2,700 wagons departed from Independence annually",
        "Outfitters sold everything emigrants needed: wagons, oxen, food, and supplies",
        "Emigrants typically departed in April-May to cross mountains before winter"
      ],
      whyImportant: "Independence represented the last major American settlement before entering Indian Territory. Here, emigrants made final preparations, formed wagon companies, and said goodbye to civilization as they knew it."
    }
  },
  { 
    id: "courthouse_rock", 
    name: "Courthouse Rock", 
    distance: 480, 
    daysFromPrev: 5, 
    type: "landmark", 
    description: "Waypoint", 
    terrain: "plains",
    historicalSignificance: {
      title: "Courthouse and Jail Rocks - Nature's Courtroom",
      yearEstablished: "Named 1830s",
      summary: "These distinctive clay and sandstone formations rose 400 feet above the North Platte River valley, visible for miles. Emigrants called them 'Courthouse' and 'Jail' for their resemblance to buildings back East.",
      keyFacts: [
        "Formed from Brule clay and Gering sandstone, 20-25 million years old",
        "Served as a crucial navigation landmark for wagon trains",
        "Many emigrants climbed to the top and carved their names",
        "First major 'tourist attraction' of the Oregon Trail journey"
      ],
      whyImportant: "Seeing Courthouse Rock meant emigrants had completed nearly one-third of their journey and were entering the dramatic landscape of the High Plains."
    }
  },
  { 
    id: "chimney_rock", 
    name: "Chimney Rock", 
    distance: 12, 
    daysFromPrev: 1, 
    type: "village", 
    description: "Lakota-Sioux Village nearby", 
    terrain: "plains",
    historicalSignificance: {
      title: "Chimney Rock - The Most Famous Landmark",
      yearEstablished: "Named 1820s",
      summary: "Rising 325 feet above the North Platte valley, Chimney Rock was the most mentioned landmark in emigrant diaries. Its distinctive spire could be seen for two days' travel away.",
      keyFacts: [
        "Mentioned in more emigrant journals than any other trail landmark",
        "Originally over 500 feet tall - erosion has reduced its height",
        "The Lakota-Sioux called it 'Elk Penis' for its shape",
        "Designated a National Historic Site in 1956",
        "Nearby Lakota-Sioux villages traded with passing emigrants"
      ],
      whyImportant: "Chimney Rock marked the transition from the prairie lowlands to the Rocky Mountain region. It was a photographer's favorite and appeared on countless postcards sent back East."
    }
  },
  { 
    id: "fort_laramie", 
    name: "Fort Laramie", 
    distance: 70, 
    daysFromPrev: 5, 
    type: "fort", 
    description: "Major Trading Post", 
    terrain: "plains",
    historicalSignificance: {
      title: "Fort Laramie - Crossroads of the West",
      yearEstablished: "1834",
      summary: "Originally a fur trading post called Fort William, Fort Laramie became the most important military post on the Northern Plains and a vital resupply point for emigrants.",
      keyFacts: [
        "Founded by fur traders William Sublette and Robert Campbell in 1834",
        "Purchased by the U.S. Army in 1849 for $4,000",
        "Site of the 1851 and 1868 Fort Laramie Treaties with Plains tribes",
        "Emigrants could buy supplies, repair wagons, and send letters home",
        "Peak years saw 50,000+ emigrants pass through annually"
      ],
      whyImportant: "Fort Laramie was where emigrants left the Great Plains and entered the Rocky Mountains. It was their last reliable contact with the U.S. government and military."
    }
  },
  { 
    id: "independence_rock", 
    name: "Independence Rock", 
    distance: 190, 
    daysFromPrev: 4, 
    type: "landmark", 
    description: "Famous landmark", 
    terrain: "mountains",
    historicalSignificance: {
      title: "Independence Rock - The Register of the Desert",
      yearEstablished: "Named 1830",
      summary: "This massive granite dome, 1,900 feet long and 700 feet wide, became known as 'The Great Register of the Desert' because thousands of emigrants carved or painted their names on its surface.",
      keyFacts: [
        "Named because fur trappers celebrated July 4th, 1830 here",
        "Over 5,000 names are still visible carved into the rock",
        "Emigrants used axle grease, tar, and gunpowder to write names",
        "Reaching here by July 4th meant you were on schedule to cross mountains before winter",
        "Father Pierre-Jean De Smet called it 'The Great Register of the Desert' in 1840"
      ],
      whyImportant: "Independence Rock was both a milestone marker and a time check. Arriving by Independence Day (July 4th) meant wagon trains were on pace to cross the Sierra Nevada before winter snows."
    }
  },
  { 
    id: "fort_bridger", 
    name: "Fort Bridger", 
    distance: 225, 
    daysFromPrev: 8, 
    type: "fort", 
    description: "Mormon Settlement (20% Dysentery)", 
    terrain: "mountains",
    historicalSignificance: {
      title: "Fort Bridger - Mountain Man's Trading Post",
      yearEstablished: "1843",
      summary: "Founded by legendary mountain man Jim Bridger, this trading post sat at a crossroads where the Oregon Trail split from routes to California and Salt Lake City.",
      keyFacts: [
        "Built by Jim Bridger and Louis Vasquez as a supply stop",
        "Jim Bridger was one of the most famous mountain men in American history",
        "Sold to the Mormons in 1855, who burned it in 1857 during the Utah War",
        "Rebuilt by the U.S. Army and operated until 1890",
        "The Donner Party stopped here and fatefully chose the untested Hastings Cutoff"
      ],
      whyImportant: "Fort Bridger represented a critical decision point where emigrants chose their final destination: Oregon, California, or Salt Lake. Wrong decisions here led to disaster, as the Donner Party learned."
    }
  },
  { 
    id: "soda_springs", 
    name: "Soda Springs", 
    distance: 162, 
    daysFromPrev: 8, 
    type: "landmark", 
    description: "Natural springs", 
    terrain: "mountains",
    historicalSignificance: {
      title: "Soda Springs - Nature's Wonder",
      yearEstablished: "Known since 1811",
      summary: "This area featured dozens of natural mineral springs with carbonated water that emigrants compared to 'soda water.' Steamboat Spring erupted every few seconds with a sound like a steamboat.",
      keyFacts: [
        "Over 1,000 mineral springs in the area, many naturally carbonated",
        "Steamboat Spring erupted regularly until a dam flooded it in 1937",
        "Emigrants used the mineral water for drinking and baking bread",
        "Beer Spring was named because its water tasted like flat beer",
        "Many emigrants spent extra days here exploring the natural wonders"
      ],
      whyImportant: "Soda Springs provided a much-needed morale boost after weeks of difficult mountain travel. The strange and wonderful springs gave emigrants stories to tell and letters to write home about."
    }
  },
  { 
    id: "fort_hall", 
    name: "Fort Hall", 
    distance: 57, 
    daysFromPrev: 2, 
    type: "fort", 
    description: "Mormon area, Shoshone Village nearby (3 days)", 
    terrain: "mountains",
    historicalSignificance: {
      title: "Fort Hall - The Oregon-California Parting",
      yearEstablished: "1834",
      summary: "Built by American trader Nathaniel Wyeth, Fort Hall became a crucial decision point where the Oregon Trail and California Trail diverged. The Hudson's Bay Company operated it from 1837-1856.",
      keyFacts: [
        "Built by Nathaniel Wyeth after being cheated by the Rocky Mountain Fur Company",
        "The Hudson's Bay Company bought it to control American emigration",
        "British traders reportedly discouraged emigrants from going to Oregon",
        "Where the California Trail branched off toward Sacramento",
        "Shoshone tribes traded horses and food with emigrants"
      ],
      whyImportant: "Fort Hall was where emigrants made their final choice between Oregon and California. The Shoshone tribes here were generally friendly and helped emigrants prepare for the difficult journey ahead."
    }
  },
  { 
    id: "fort_boise", 
    name: "Fort Boise", 
    distance: 280, 
    daysFromPrev: 10, 
    type: "fort", 
    description: "50% Tuberculosis! High prices", 
    terrain: "mountains",
    historicalSignificance: {
      title: "Fort Boise - Last Stop Before the Desert",
      yearEstablished: "1834",
      summary: "Another Hudson's Bay Company post, Fort Boise was the last major supply point before emigrants faced the brutal Snake River Plain and the dreaded crossing into Oregon.",
      keyFacts: [
        "Built by the Hudson's Bay Company near the Boise River",
        "Abandoned in 1855 due to Shoshone attacks during the Snake War",
        "Emigrants faced 300 miles of desert and difficult river crossings ahead",
        "Disease was rampant due to contaminated water sources",
        "Prices were extremely high due to difficulty of resupply"
      ],
      whyImportant: "Fort Boise represented the end of relatively 'easy' travel. Beyond lay the most dangerous portion of the Oregon Trail, with desert crossings, steep mountain passes, and treacherous river fords."
    }
  },
  { 
    id: "whitman_mission", 
    name: "Whitman Mission", 
    distance: 220, 
    daysFromPrev: 12, 
    type: "mission", 
    description: "30% Measles. Holy 3 = Free items, Holy 1 = 50% off", 
    terrain: "mountains",
    historicalSignificance: {
      title: "Whitman Mission - Tragedy on the Trail",
      yearEstablished: "1836",
      summary: "Marcus and Narcissa Whitman established this Presbyterian mission to convert the Cayuse Indians. It became a way station for Oregon Trail emigrants, but ended in tragedy in 1847.",
      keyFacts: [
        "Marcus Whitman and his wife Narcissa were among the first Americans to cross the Rockies by wagon",
        "The mission provided medical care, food, and supplies to emigrants",
        "A measles epidemic in 1847 killed half the local Cayuse tribe",
        "On November 29, 1847, Cayuse warriors killed the Whitmans and 11 others",
        "The 'Whitman Massacre' led to the Cayuse War and Oregon becoming a U.S. territory"
      ],
      whyImportant: "The Whitman Mission tragedy changed the course of Pacific Northwest history. It demonstrated both the hope and the conflict inherent in westward expansion and relations with Native Americans."
    }
  },
  { 
    id: "the_dalles", 
    name: "The Dalles", 
    distance: 120, 
    daysFromPrev: 5, 
    type: "crossing", 
    description: "River crossing & trade center", 
    terrain: "river",
    historicalSignificance: {
      title: "The Dalles - Gateway to the Columbia",
      yearEstablished: "Trading center for 10,000+ years",
      summary: "The Dalles was one of the most important Native American trading centers in North America for millennia. For emigrants, it represented the final major obstacle before reaching the Willamette Valley.",
      keyFacts: [
        "Native Americans had traded at The Dalles for over 10,000 years",
        "The name comes from French 'dalle' meaning flagstone or rapids",
        "Emigrants faced a terrible choice: raft the dangerous Columbia or take the brutal Barlow Road",
        "Many emigrants drowned attempting to raft through the Columbia River Gorge",
        "The Chinook people controlled trade and charged ferrying fees"
      ],
      whyImportant: "The Dalles forced emigrants to make one final life-or-death decision. The Columbia River route was faster but deadly dangerous, while the Barlow Road was safer but exhausting. Either way, Oregon was finally within reach."
    }
  },
  { 
    id: "oregon_city", 
    name: "Oregon City", 
    distance: 100, 
    daysFromPrev: 5, 
    type: "end", 
    description: "Finish Line! +500 VP", 
    terrain: "plains",
    historicalSignificance: {
      title: "Oregon City - End of the Trail",
      yearEstablished: "1829",
      summary: "Oregon City was the first incorporated city west of the Rocky Mountains and the official end of the Oregon Trail. It served as the territorial capital and the place where emigrants filed their land claims.",
      keyFacts: [
        "Founded by John McLoughlin, 'Father of Oregon'",
        "First incorporated city west of the Rockies (1844)",
        "Served as Oregon Territory capital from 1848-1852",
        "Willamette Falls provided power for the first long-distance electricity transmission in America",
        "The Land Office here processed thousands of Donation Land Claims",
        "Emigrants received 640 acres free under the Donation Land Claim Act of 1850"
      ],
      whyImportant: "Reaching Oregon City meant you had survived one of the most grueling journeys in American history. Here, emigrants could finally claim their land, build their homes, and start their new lives in the promised land of Oregon."
    }
  }
];

// Native Villages (Barter only - no cash)
export const NATIVE_VILLAGES = {
  chimney_rock: {
    name: "Chimney Rock - Lakota-Sioux Village",
    tribe: "Lakota-Sioux",
    isNativeVillage: true,
    barterOnly: true,
    items: [
      { name: "Fruit", barterValue: 1, amount: 2, effect: "Spoils quickly" },
      { name: "Meat", barterValue: 1, amount: 20, effect: "Spoils quickly" },
      { name: "Totem Stick", barterValue: 8, amount: 1, effect: "Relation Boost w/ Indians" },
      { name: "Bow and Arrows", barterValue: 3, amount: 5, effect: "Ranged weapon" },
      { name: "Animal Furs", barterValue: 2, amount: 5 },
      { name: "Horse", barterValue: 6, amount: 2 },
      { name: "Pemmican (dried meat)", barterValue: 2, amount: 10, effect: "Never spoils" },
      { name: "Moccasins", barterValue: 2, amount: 3, effect: "+1 Travel speed for 3 days" },
      { name: "Buffalo Robe", barterValue: 4, amount: 2, effect: "Protection from cold" }
    ],
    activities: [
      "Steal Idol (Trickery - Tribe becomes hostile)",
      "Horseback Race (Animals skill - Win a horse!)",
      "Right of Manhood (Tough - Earn tribal respect)",
      "Convert Tribe (Missionary only - +500VP + Indian Guard joins)",
      "Join Dance (Free - +1 tribal relation)",
      "Trade Stories (Linguist - Learn local dangers)",
      "Challenge Warrior (Combat - Win respect or lose 1 HP)"
    ]
  },
  shoshone: {
    name: "Shoshone Indian Village",
    tribe: "Shoshone",
    isNativeVillage: true,
    barterOnly: true,
    items: [
      { name: "Meat", barterValue: 1, amount: 10 },
      { name: "Furs", barterValue: 3, amount: 10 },
      { name: "Dog", barterValue: 2, amount: 3 },
      { name: "Horse", barterValue: 5, amount: 2 },
      { name: "Salmon (dried)", barterValue: 2, amount: 15, effect: "Never spoils" },
      { name: "Camas Root", barterValue: 1, amount: 20, effect: "Nutritious food" },
      { name: "Obsidian Knife", barterValue: 3, amount: 2, effect: "Sharp tool" },
      { name: "Healing Herbs", barterValue: 4, amount: 3, effect: "Cure Disease I" }
    ],
    activities: [
      "Steal Idol (Trickery - Tribe becomes hostile)",
      "Buffalo Hunt (Animals+Horse+Weapons - Large meat haul)",
      "Right of Manhood (Endurance - Earn tribal respect)",
      "Salmon Fishing (Fishing skill - Double fish catch)",
      "Duck Hunt (Hunter - Get 5 duck meat)",
      "Chieftain's Son joins party (Charisma - 3hp Tough melee ally)",
      "Marry into Tribe (Free spouse! Must stay 7 days)"
    ]
  },
  the_dalles: {
    name: "The Dalles Village Trade Center",
    tribe: "Chinook",
    isNativeVillage: true,
    barterOnly: true,
    items: [
      { name: "Salmon", barterValue: 1, amount: 30, effect: "Fresh fish" },
      { name: "Dried Salmon", barterValue: 2, amount: 20, effect: "Never spoils" },
      { name: "Furs", barterValue: 3, amount: 10 },
      { name: "Canoe Passage", barterValue: 5, amount: 1, effect: "Safe river crossing" },
      { name: "Cedar Rope", barterValue: 1, amount: 10, effect: "Strong rope" },
      { name: "Woven Basket", barterValue: 2, amount: 5, effect: "+2 carry slots" }
    ],
    activities: [
      "River Guide (Linguist - Safe passage advice)",
      "Fishing Competition (Fishing - Win supplies)",
      "Trade Negotiations (Charisma 2 - Better rates)",
      "Portage Help (Pay 3 barter value - Safe wagon transport)",
      "Weather Prediction (Intelligence - Know best travel days)",
      "Purchase Canoe (8 barter value - Skip land route)"
    ]
  }
};

// Trading Posts (Forts - use cash)
export const TRADING_POSTS = {
  fort_laramie: {
    name: "Fort Laramie",
    isNativeVillage: false,
    items: [
      { name: "Food Cans", price: 7, amount: 20 },
      { name: "First Aid Kit", price: 20, amount: 20 },
      { name: "Meat", price: 10, amount: 50 },
      { name: "Whiskey", price: 25, amount: 10 },
      { name: "Hunting Rifle", price: 90, amount: 2 },
      { name: "Pistol", price: 60, amount: 3 },
      { name: "Rope", price: 5, amount: 20 },
      { name: "Torch", price: 5, amount: 20 },
      { name: "Dynamite", price: 15, amount: 5 },
      { name: "Shovel", price: 10, amount: 2 },
      { name: "Donkey", price: 40, amount: 1 },
      { name: "Furs (sell)", price: 50, amount: 0, sellOnly: true }
    ],
    activities: [
      "Gamble (Trickery: Win/Lose $1-300)",
      "Fiery Sermon (Holy 3: Collect $1-500)",
      "Ask Donations (Holy 1: Collect $1-25)",
      "Mysterious Stranger (Pay $50 for shortcut info)",
      "Tavern Brawl (Tough: Win $20 or lose 1 HP)",
      "Trouble with Law (Charisma 2 or pay $50 fine)",
      "Balance Books (Money 2: Earn $25)"
    ]
  },
  fort_bridger: {
    name: "Fort Bridger (20% Dysentery Risk)",
    isNativeVillage: false,
    diseaseRisk: { type: "Dysentery", chance: 20 },
    items: [
      { name: "Food Cans", price: 14, amount: 4 },
      { name: "First Aid Kit", price: 50, amount: 2 },
      { name: "Meat", price: 10, amount: 12 },
      { name: "Whiskey", price: 15, amount: 20 },
      { name: "Rope", price: 5, amount: 7 },
      { name: "Dog", price: 5, amount: 1 },
      { name: "Coonskin Cap", price: 25, amount: 1, effect: "+1 Range on all guns for 1 character" },
      { name: "Climbing Gear", price: 15, amount: 4 }
    ],
    activities: [
      "Gamble (Trickster: Win/Lose $1-50)",
      "Mysterious Stranger (Pay $50 for shortcut info)",
      "Trouble with Law (Charisma 1 or pay $25 fine)",
      "Fight Legendary Bear (Weapons+Bravery: 3 days, huge pelt)",
      "Meet Emmett Lombardi (Mountainman - hire for $100)"
    ]
  },
  fort_hall: {
    name: "Fort Hall (Mormon Settlement)",
    isNativeVillage: false,
    mormonSettlement: true,
    items: [
      { name: "Food Cans", price: 10, amount: 15 },
      { name: "First Aid Kit", price: 40, amount: 3 },
      { name: "Meat", price: 5, amount: 10 },
      { name: "Climbing Gear", price: 20, amount: 5 },
      { name: "Furs (sell)", price: 50, amount: 5, sellOnly: true }
    ],
    activities: [
      "Gamble - FORBIDDEN (Start fight if caught!)",
      "Proselytize - FORBIDDEN for non-Mormons (Start fight!)",
      "Argument with Mormon Preacher (Holy 3 or Fight)",
      "Children may convert to Mormonism",
      "Found drinking alcohol (Fight or pay $100)"
    ],
    nearbyVillage: "Shoshone Village (3 days travel)"
  },
  fort_boise: {
    name: "Fort Boise (50% Tuberculosis Risk!)",
    isNativeVillage: false,
    diseaseRisk: { type: "Tuberculosis", chance: 50 },
    items: [
      { name: "Hunting Rifle", price: 70, amount: 1 },
      { name: "Elephant Gun", price: 120, amount: 1, effect: "Range + Power" },
      { name: "Shotgun", price: 82, amount: 2 },
      { name: "Dynamite", price: 7, amount: 5 },
      { name: "Horse", price: 32, amount: 5 },
      { name: "Rope", price: 3, amount: 5 },
      { name: "Torch", price: 1, amount: 5 },
      { name: "First Aid Kit", price: 50, amount: 7 },
      { name: "Whiskey", price: 10, amount: 20 },
      { name: "Food Cans", price: 5, amount: 60 },
      { name: "Meat", price: 2, amount: 40 },
      { name: "Fireworks", price: 10, amount: 10 },
      { name: "Snowshoes", price: 10, amount: 3, effect: "Move through snow" },
      { name: "Climbing Gear", price: 12, amount: 7 }
    ],
    activities: [
      "Commander's Wife wants chocolates (Pay $50 per chocolate!)",
      "Rodeo (Animals skill: Win $50!)",
      "Hire Ulrich Zwingli (Swiss Mountaineer: $150)"
    ]
  },
  whitman_mission: {
    name: "Whitman Mission (30% Measles Risk)",
    isNativeVillage: false,
    diseaseRisk: { type: "Measles", chance: 30 },
    items: [
      { name: "Meat", price: 10, amount: 10 },
      { name: "Fruit", price: 12, amount: 5 },
      { name: "Rope", price: 5, amount: 5 },
      { name: "Snowshoes", price: 3, amount: 2 },
      { name: "Wine", price: 20, amount: 3 },
      { name: "First Aid Kit", price: 40, amount: 5 },
      { name: "Dog", price: 10, amount: 5 },
      { name: "Torch", price: 10, amount: 10 },
      { name: "Shovel", price: 5, amount: 2 },
      { name: "Donkey", price: 20, amount: 1 }
    ],
    activities: [
      "Holy 3 = ALL items FREE!",
      "Holy 1 = 50% off all items!",
      "Pray for healing (Remove Disease I)",
      "WARNING: Local native village is permanently hostile!"
    ]
  }
};

// Wagon problems
export const WAGON_PROBLEMS = {
  plains: 10, // 10% chance
  mountains: 20, // 20% chance
  river: 30, // 30% chance at river crossings
  repairChance: {
    noMechanical: 10,
    mechanical1: 50,
    mechanical3: 95
  }
};

// Skills Reference
export const SKILLS = [
  { id: "animals", name: "Animals", description: "Ride horses, +10% charm hostile animal before combat" },
  { id: "bravery", name: "Bravery", description: "Immune to Fear" },
  { id: "carry", name: "Carry", description: "+2 carry slots on person" },
  { id: "charisma", name: "Charisma", description: "Good for negotiations" },
  { id: "charisma_2", name: "Charisma 2", description: "Difficult negotiations, +1 charm human enemy" },
  { id: "charisma_3", name: "Charisma 3", description: "Heated negotiations, +2 charm human enemies" },
  { id: "cooking", name: "Cooking", description: "Divide food consumption by 2" },
  { id: "cooking_2", name: "Cooking 2", description: "Divide food consumption by 3" },
  { id: "cooking_3", name: "Cooking 3", description: "Divide by 3 + party gets Tough in combat" },
  { id: "dark_vision", name: "Dark Vision", description: "Travel through caves without torch" },
  { id: "fishing", name: "Fishing", description: "Can fish, get 2x meat from fishing" },
  { id: "fur_trapper", name: "Fur-Trapper", description: "Double pelts from hunting/fishing" },
  { id: "herbalist", name: "Herbalist", description: "Detect safe food, gather 2 berries/day" },
  { id: "holy", name: "Holy", description: "Revive one player from death once" },
  { id: "holy_3", name: "Holy 3", description: "Revive up to 3x during trip" },
  { id: "intelligence", name: "Intelligence", description: "Cannot be tricked" },
  { id: "linguist", name: "Linguist", description: "Better results with natives" },
  { id: "luck", name: "Luck", description: "Reroll on critical fails" },
  { id: "mechanical", name: "Mechanical", description: "50% wagon fix chance" },
  { id: "mechanical_3", name: "Mechanical 3", description: "95% wagon fix chance" },
  { id: "medicine_1", name: "Medicine 1", description: "Heal level 1 sicknesses" },
  { id: "medicine_2", name: "Medicine 2", description: "Heal level 1-2 sicknesses" },
  { id: "medicine_3", name: "Medicine 3", description: "Heal level 1-3 sicknesses" },
  { id: "miner", name: "Miner", description: "Get $50-500 from caves" },
  { id: "money_2", name: "Money 2", description: "Buy 20% cheaper, sell 20% higher" },
  { id: "mountaineering", name: "Mountaineering", description: "No climbing gear needed" },
  { id: "painting", name: "Painting", description: "Paint scenes for +5 VP each" },
  { id: "travel", name: "Travel", description: "+1 travel speed, cannot get lost" },
  { id: "trickery", name: "Trickery", description: "Trick people, steal" },
  { id: "tough", name: "Tough", description: "Normal attacks do half damage" },
  { id: "water", name: "Water", description: "Travel safely over rivers" },
  { id: "weapons", name: "Weapons", description: "Use weapons without injury" },
  { id: "writing", name: "Writing", description: "Team gets +1 level 1 skill" },
  { id: "writing_2", name: "Writing 2", description: "Team gets +1 level 1-2 skill" }
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

// Native American Relations System
// Scale: -3 (Hostile) to +3 (Allied), 0 is Neutral
export const NATIVE_RELATIONS = {
  levels: [
    { 
      level: -3, 
      name: "Hostile", 
      icon: "💀",
      color: "red-800",
      barterPenalty: 100, // Cannot barter at all
      description: "War parties actively hunting settlers",
      effects: [
        "Cannot trade at Native villages",
        "50% chance of raiding party attack when camping (d100 roll 1-50)",
        "Native warriors may join enemy forces in battles",
        "Lose 2 days avoiding hostile territory"
      ],
      raidChance: 50,
      battleReinforcements: true
    },
    { 
      level: -2, 
      name: "Unfriendly", 
      icon: "😠",
      color: "red-600",
      barterPenalty: 50, // +50% barter cost
      description: "Tribes are suspicious and unwelcoming",
      effects: [
        "Barter costs +50% more",
        "25% chance of raiding party attack when camping (d100 roll 1-25)",
        "No access to village activities",
        "Lose 1 day navigating around villages"
      ],
      raidChance: 25,
      battleReinforcements: false
    },
    { 
      level: -1, 
      name: "Wary", 
      icon: "😐",
      color: "orange-500",
      barterPenalty: 25, // +25% barter cost
      description: "Tribes are cautious but will trade",
      effects: [
        "Barter costs +25% more",
        "10% chance of raiding party encounter (d100 roll 1-10)",
        "Limited village activities available"
      ],
      raidChance: 10,
      battleReinforcements: false
    },
    { 
      level: 0, 
      name: "Neutral", 
      icon: "🤝",
      color: "gray-500",
      barterPenalty: 0, // Normal barter
      description: "Standard relations - cautious respect",
      effects: [
        "Normal barter rates",
        "All village activities available",
        "No special bonuses or penalties"
      ],
      raidChance: 0,
      battleReinforcements: false
    },
    { 
      level: 1, 
      name: "Friendly", 
      icon: "😊",
      color: "green-500",
      barterBonus: 10, // -10% barter cost
      description: "Tribes welcome travelers",
      effects: [
        "Barter costs -10% less",
        "Access to special village items",
        "Can request guide (+2 travel speed for 1 leg)"
      ],
      raidChance: 0,
      battleReinforcements: false
    },
    { 
      level: 2, 
      name: "Trusted", 
      icon: "🙏",
      color: "green-600",
      barterBonus: 25, // -25% barter cost
      description: "Strong bonds with local tribes",
      effects: [
        "Barter costs -25% less",
        "Can trade for horses at reduced rates",
        "25% chance of warning about dangers ahead (d100 roll 1-25)",
        "Can request healing from shaman (free)"
      ],
      raidChance: 0,
      battleReinforcements: false
    },
    { 
      level: 3, 
      name: "Allied", 
      icon: "⚔️",
      color: "green-800",
      barterBonus: 50, // -50% barter cost
      description: "Blood brothers - tribes will fight alongside you",
      effects: [
        "Barter costs -50% less",
        "50% chance of Native warriors joining your battles (d100 roll 1-50)",
        "If aided: 1d4 warriors join (HP: 4, Damage: 2, Abilities: Bravery, Travel)",
        "Free lodging and food at villages",
        "Tribe may gift horses or supplies"
      ],
      raidChance: 0,
      battleReinforcements: true,
      allyChance: 50
    }
  ],
  
  // Native warrior stats for battles
  nativeWarrior: {
    name: "Native Warrior",
    hp: 4,
    damage: 2,
    abilities: ["Bravery", "Travel"]
  },
  
  // Raiding party stats
  raidingParty: {
    small: { warriors: 2, name: "Small Raiding Party" },
    medium: { warriors: 4, name: "Raiding Party" },
    large: { warriors: 6, name: "War Party" }
  },
  
  // Actions that affect relations
  relationChanges: {
    positive: [
      { action: "Help injured Native", change: 1 },
      { action: "Fair trade (overpay)", change: 1 },
      { action: "Return lost item", change: 1 },
      { action: "Defend village from bandits", change: 2 },
      { action: "Missionary converts tribe (peaceful)", change: 1 },
      { action: "Share medicine/supplies", change: 1 }
    ],
    negative: [
      { action: "Steal from village", change: -2 },
      { action: "Attack Native", change: -2 },
      { action: "Desecrate burial ground", change: -3 },
      { action: "Cheat in trade", change: -1 },
      { action: "Trespass on sacred land", change: -1 },
      { action: "Kill Native (even in combat)", change: -1 }
    ]
  }
};

// Native enemies for combat
export const NATIVE_ENEMIES = [
  { name: "Native Scout", hp: 3, damage: 1, abilities: ["Travel"], vp: 10 },
  { name: "Native Warrior", hp: 4, damage: 2, abilities: ["Bravery"], vp: 20 },
  { name: "Native Brave", hp: 5, damage: 2, abilities: ["Bravery", "Tough"], vp: 30 },
  { name: "War Chief", hp: 6, damage: 3, abilities: ["Bravery", "Tough", "Leadership"], vp: 50 }
];

// Victory Points
export const VP_REWARDS = {
  reachOregon: 0,  // No VP just for arriving
  daysGonePenalty: 1,  // -1 VP per day gone on journey
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
