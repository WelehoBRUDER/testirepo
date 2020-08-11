// Difficulties: simple, erratic, boss.

const Enemies = [
    {
        name: "Demon Lord",
        portrait: "sexylord",
        difficulty: "erratic",
        theme: "DemonLord",
        horde: false, // Determines if this enemy should take more damage from sweeping moves and aoe.
        weaponskill: 'sword',
        abilities: [
            Abilities[15], // Demonic Swing
            Abilities[14], // Grand Heal
            Abilities[3], // Demonic Blow
            Abilities[8],  // Test enfeeble
        ],
        weapon: "1hsword", // One handed sword, can use swing.
        stats: {
            hp: 1000,
            mana: 800,
            str: 75,
            dex: 75,
            vit: 75,
            spi: 100,
            dmg: 1.8
        },
        skills: {
            sword: 40,
            fist: 80,
            darkmagic: 100,
            lightmagic: 0
        },
        defenses: {
            phys: 50,
            mag: 70,
            stat: 90
        }
    }
];