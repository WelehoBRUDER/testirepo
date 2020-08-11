PossibleStatuses = [
    {
        name: "strup", // ID for finding this
        buff_stat: "str", // Improves strength
        buff_power: 0.2, // Increases strength by 20%.
        buff_dmg: 5, // Adds 5 extra damage to all moves.
        last: 3, // Lasts 3 rounds.
        icon: "strengthup"
    },
    {
        name: "dexup",
        buff_stat: "dex",
        buff_power: 0.25,
        buff_dmg: 2,
        last: 3,
        icon: "dexterityup"
    },
    {
        name: "vitup",
        buff_stat: "vit",
        buff_power: 0.25,
        buff_dmg: 0,
        last: 3,
        icon: "vitalityup"
    },
    {
        name: "spiup",
        buff_stat: "spi",
        buff_power: 0.2,
        buff_dmg: 5,
        last: 3,
        icon: "spiritup"
    },
    {
        name: "vitdown",
        debuff_stat: "vit",
        debuff_power: 0.25,
        debuff_dmg: 0,
        last: 3,
        icon: "vitalitydown"
    },
    {
        name: "dexdown",
        debuff_stat: "dex",
        debuff_power: 0.2,
        debuff_dmg: 3,
        last: 3,
        icon: "dexteritydown"
    },
    {
        name: "defdown",
        debuff_stat: "physdef",
        debuff_power: 0.25,
        debuff_dmg: 0,
        last: 3,
        icon: "defensedown"
    },
]