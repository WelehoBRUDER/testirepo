let PlayerCombatStats = {
    hp: 0,
    maxhp: 0,
    mana: 0,
    maxmana: 0,
    fistdamage: 0,
    str: 0,
    dex: 0,
    vit: 0,
    spi: 0,
    crt: 0,
    physdef: 0,
    magdef: 0,
    basemaxhp: 18,
    basemaxmana: 5,
    basefistdamage: 5,
    basestr: 0,
    basedex: 0,
    basevit: 0,
    basespi: 0,
    basephysdef: 0,
    basemagdef: 0
}

let PlayerSkills = {
    sword: 5,
    fist: 5,
    darkmagic: 0,
    lightmagic: 0
}

let PlayerStatuses = [

];

let PlayerEquipment = [
    {
        name: "Loincloth",
        slot: "groin",
        type: "armour",
        physarmour: 2,
        magarmour: 0,
        always: false
    },
    {
        name: "Fists",
        slot: "fists",
        type: "unarmed",
        physatk: 1,
        always: true
    },
    {
        name: "Sword",
        slot: "hands",
        type: "weapon",
        weptype: "sword",
        physatk: 8,
        always: false
    }
];

let combatInventory = [
    {
        name: "MH. Potion",
        name_long: "Minor Health Potion",
        use: "heal",
        power: 15,
        amount: 3
    },
    {
        name: "MM. Potion",
        name_long: "Minor Mana Potion",
        use: "restoremp",
        power: 10,
        amount: 2
    },
]

let playerBody = [
    {part: "head", type:"human"},
    {part: "chest", type: "human"},
    {part: "leftarm", type:"human"},
    {part: "lefthand", type: "human"},
    {part: "rightarm", type: "human"},
    {part: "righthand", type: "human"},
    {part: "midriff", type: "human"},
    {part: "leftleg", type: "human"},
    {part: "leftfoot", type: "human"},
    {part: "rightleg", type: "human"},
    {part: "rightfoot", type: "human"}
];

let PlayerGeneral = {
    name: "Lokir"
}

let playerCoolDowns = [];

playerAbilities = [];

function GrantBaseStats() {
    let temp = [];
    temp = deepCopy(Abilities);
    for(let i = 0; i<temp.length; i++) {
        if(temp[i].initial) {
            playerAbilities.push(temp[i]);
        }
    }
}

GrantBaseStats();

