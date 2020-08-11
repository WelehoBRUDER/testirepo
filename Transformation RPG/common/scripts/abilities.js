/* 
    ABILITY TEMPLATE:
    {
        name: "name" # Ability name
        shared: true/false # Whether or not player can use this.
        ai_will_do: 0 # Int,  how likely ai is to use this ability. Will take other things to mind too.
        type: "heal/buff/debuff/atk" # What kind of ability this is.
        cost: 0 # How long this ability stays on cooldown, 0 means no cd.
        mp_use: 0 # How much mana is needed to use this, 0 is default for non-spells.
        power: 3 # Base power of the ability, damage or heal etc. For buffs/debuffs make it -1. Multiplies attacks by its value.
        magical: true/false # Whether or not this ability causes magical damage.
        chance: 20 # The chance of inflicting a status effect. For regular attacks, make this 100.
        ultimate: true/false # Whether this ability should be classed as ultimate. Ai will use ultimates only once in battle.
        status: "statusName" # If this inflicts a status effect, it must be mentioned here. Regular attacks can not inflict buffs/debuffs! If no status, set "empty".
        needs_weapon: true/false # If true, this ability can not be used without a weapon.
        weapon: "weaponType" # If needed, you can make this ability require a specific weapon. If not, set "all".
        initial: true/false # Whether or not the player starts with this ability.
        aoe: true/false # Whether or not this move deals AOE damage.
        spell: true/false # Whether or not this move is a spell.
        magic: "light/dark" # Only needed if spell, whether uses dark or light skill.
    }
*/

Abilities = [
    {
        // 0
        name: "Punch",
        name_long: "Unarmed Punch",
        shared: true,
        ai_will_do: 1,
        type: "atk",
        cost: 0,
        mp_use: 0,
        power: 1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 1
        name: "Swing",
        name_long: "Swing Weapon",
        shared: true,
        ai_will_do: 1,
        type: "atk",
        cost: 0,
        mp_use: 0,
        power: 3,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: true,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 2
        name: "Heal",
        name_long: "Combat Heal",
        shared: true,
        ai_will_do: 1,
        type: "heal",
        cost: 4,
        mp_use: 0,
        power: 10,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 3
        name: "D. Slice",
        name_long: "Demonic Slice",
        shared: false,
        ai_will_do: 1,
        type: "atk",
        cost: 0,
        mp_use: 25,
        power: 1.1,
        magical: true,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: true,
        weapon: "all",
        initial: false,
        aoe: false,
        spell: false
    },
    {
        // 4
        name: "Herculean",
        name_long: "Herculean Strength",
        shared: true,
        ai_will_do: 8,
        type: "buff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "strup",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 5
        name: "Swift",
        name_long: "Swift Moves",
        shared: true,
        ai_will_do: 2,
        type: "buff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "dexup",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 6
        name: "Hardening",
        name_long: "Body of Steel",
        shared: true,
        ai_will_do: 2,
        type: "buff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "vitup",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 7
        name: "Blessing",
        name_long: "Divine Blessing",
        shared: true,
        ai_will_do: 2,
        type: "buff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "spiup",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 8
        name: "Enfeeble",
        name_long: "Enfeebled",
        shared: true,
        ai_will_do: 15,
        type: "debuff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "vitdown",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 9
        name: "Slow",
        name_long: "Slowness",
        shared: true,
        ai_will_do: 2,
        type: "debuff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "dexdown",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 10
        name: "Expose",
        name_long: "Expose Weakpoint",
        shared: true,
        ai_will_do: 2,
        type: "debuff",
        cost: 5,
        mp_use: 5,
        power: -1,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "defdown",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: false
    },
    {
        // 11
        name: "Blast",
        name_long: "Magical Blast",
        shared: true,
        ai_will_do: 2,
        type: "atk",
        cost: 0,
        mp_use: 20,
        power: 47,
        magical: true,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: true,
        magic: "light"
    },
    {
        // 12
        name: "Strengthen",
        name_long: "Strengthen Body",
        shared: true,
        ai_will_do: 2,
        type: "buff",
        cost: 0,
        mp_use: 15,
        power: -1,
        magical: true,
        chance: 100,
        ultimate: false,
        status: "strup",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: true,
        magic: "light"
    },
    {
        // 13
        name: "Crack",
        name_long: "Crack Defense",
        shared: true,
        ai_will_do: 2,
        type: "debuff",
        cost: 0,
        mp_use: 15,
        power: -1,
        magical: true,
        chance: 100,
        ultimate: false,
        status: "defdown",
        needs_weapon: false,
        weapon: "all",
        initial: true,
        aoe: false,
        spell: true,
        magic: "light"
    },
    {
        // 14
        name: "G. Heal",
        name_long: "Grand Heal",
        shared: true,
        ai_will_do: 1,
        type: "heal",
        cost: 7,
        mp_use: 25,
        power: 50,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: false,
        weapon: "all",
        initial: false,
        aoe: false,
        spell: false
    },
    {
        // 15
        name: "D. Swing",
        name_long: "Demonic Swing",
        shared: true,
        ai_will_do: 1,
        type: "atk",
        cost: 2,
        mp_use: 0,
        power: 1.55,
        magical: false,
        chance: 100,
        ultimate: false,
        status: "empty",
        needs_weapon: true,
        weapon: "all",
        initial: false,
        aoe: false,
        spell: false
    },
];