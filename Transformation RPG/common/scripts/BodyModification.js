const BodyPartBank = [
    {
        head: [
           { type: "human", name: "Human", str: 0, dex: 0, vit: 0, spi: 0, mana: 50, physdef: 0, magdef: 0, hp: 1 },
           { type: "ehuman", name: "Enhanced Human", str: 0, dex: 1, vit: 1, spi: 3, mana: 10, physdef: 0, magdef: 2, hp: 5 },
        ],
        chest: [
            { type: "human", name: "Human", str: 0, dex: 0, vit: 2, spi: 0, mana: 0, physdef: 3, magdef: 1, hp: 5 },
            { type: "ehuman", name: "Enhanced Human", str: 1, dex: 1, vit: 4, spi: 0, mana: 0, physdef: 7, magdef: 3, hp: 8 },
        ],
        arm: [
            { type: "human", name: "Human", str: 1, dex: 0, vit: 0, spi: 0, mana: 0, physdef: 1, magdef: 0, hp: 2 },
            { type: "ehuman", name: "Enhanced Human", str: 2, dex: 1, vit: 0, spi: 0, mana: 0, physdef: 2, magdef: 0, hp: 5 },
        ],
        hand: [
            { type: "human", name: "Human", str: 0, dex: 1, vit: 0, spi: 0, mana: 0, physdef: 0, magdef: 0, fistdmg: 0, hp: 1 },
            { type: "ehuman", name: "Enhanced Human", str: 1, dex: 2, vit: 0, spi: 0, mana: 0, physdef: 0, magdef: 0, fistdmg: 3, hp: 3 },
        ],
        midriff: [
            { type: "human", name: "Human", str: 1, dex: 0, vit: 5, spi: 0, mana: 0, physdef: 5, magdef: 2, hp: 10 },
            { type: "ehuman", name: "Enhanced Human", str: 2, dex: 0, vit: 8, spi: 0, mana: 0, physdef: 9, magdef: 5, hp: 18 },
        ],
        leg: [
            { type: "human", name: "Human", str: 2, dex: 0, vit: 0, spi: 0, mana: 0, physdef: 1, magdef: 0, hp: 3 },
            { type: "ehuman", name: "Enhanced Human", str: 4, dex: 0, vit: 0, spi: 0, mana: 0, physdef: 2, magdef: 0, hp: 5 },
        ],
        foot: [
            { type: "human", name: "Human", str: 0, dex: 1, vit: 0, spi: 0, mana: 0, physdef: 0, magdef: 0, hp: 2 },
            { type: "ehuman", name: "Enhanced Human", str: 1, dex: 2, vit: 0, spi: 0, mana: 0, physdef: 1, magdef: 1, hp: 4 },
        ]
    }
]

// let playerBody = {
//     head: "human",
//     chest: "human",
//     leftarm: "human",
//     lefthand: "human",
//     rightarm: "human",
//     righthand: "human",
//     midriff: "human",
//     leftleg: "human",
//     leftfoot: "human",
//     rightleg: "human",
//     rightfoot: "human"
// }

BodyStatAllocation();

function BodyStatAllocation() {
    ResetBodyStats();
    for(let i = 0; i<playerBody.length; i++) {
        if(playerBody[i].part == "head") {
            PlayerCombatStats.str += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].str;
            PlayerCombatStats.dex += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].magdef;
            if(BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].head[FindBodyPart(playerBody[i].type, BodyPartBank[0].head)].fistdmg;
        }
        else if(playerBody[i].part == "chest") {
            PlayerCombatStats.str += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].str;
            PlayerCombatStats.dex += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].magdef;
            if(BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].chest[FindBodyPart(playerBody[i].type, BodyPartBank[0].chest)].fistdmg;
        }
        else if(playerBody[i].part == "leftarm" || playerBody[i].part == "rightarm") {
            PlayerCombatStats.str += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].str;
            PlayerCombatStats.dex += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].magdef;
            if(BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].arm[FindBodyPart(playerBody[i].type, BodyPartBank[0].arm)].fistdmg;
        }
        else if(playerBody[i].part == "lefthand" || playerBody[i].part == "righthand") {
            PlayerCombatStats.str += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].str;
            PlayerCombatStats.dex += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].magdef;
            if(BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].hand[FindBodyPart(playerBody[i].type, BodyPartBank[0].hand)].fistdmg;
        }
        else if(playerBody[i].part == "midriff") {
            PlayerCombatStats.str += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].str;
            PlayerCombatStats.dex += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].magdef;
            if(BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].midriff[FindBodyPart(playerBody[i].type, BodyPartBank[0].midriff)].fistdmg;
        }
        else if(playerBody[i].part == "leftleg" || playerBody[i].part == "rightleg") {
            PlayerCombatStats.str += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].str;
            PlayerCombatStats.dex += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].magdef;
            if(BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].leg[FindBodyPart(playerBody[i].type, BodyPartBank[0].leg)].fistdmg;
        }
        else if(playerBody[i].part == "leftfoot" || playerBody[i].part == "rightfoot") {
            PlayerCombatStats.str += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].str;
            PlayerCombatStats.dex += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].dex;
            PlayerCombatStats.vit += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].vit;
            PlayerCombatStats.spi += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].spi;
            PlayerCombatStats.maxmana += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].mana;
            PlayerCombatStats.maxhp += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].hp;
            PlayerCombatStats.physdef += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].physdef;
            PlayerCombatStats.magdef += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].magdef;
            if(BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].fistdamage) PlayerCombatStats.fistdamage += BodyPartBank[0].foot[FindBodyPart(playerBody[i].type, BodyPartBank[0].foot)].fistdmg;
        }
    }
    PlayerCombatStats.hp = PlayerCombatStats.maxhp;
    PlayerCombatStats.mana = PlayerCombatStats.maxmana;
}

function FindBodyPart(type, part) {
    for(let i = 0; i<part.length; i++) {
        if(part[i].type == type) return i;
    }
    return 0;
}

function ResetBodyStats() {
   PlayerCombatStats.maxhp =  PlayerCombatStats.basemaxhp
   PlayerCombatStats.maxmana = PlayerCombatStats.basemaxmana
   PlayerCombatStats.fistdamage =  PlayerCombatStats.basefistdamage
   PlayerCombatStats.str = PlayerCombatStats.basestr
   PlayerCombatStats.dex =  PlayerCombatStats.basedex
   PlayerCombatStats.vit = PlayerCombatStats.basevit
   PlayerCombatStats.spi = PlayerCombatStats.basespi
   PlayerCombatStats.physdef =  PlayerCombatStats.basephysdef
   PlayerCombatStats.magdef = PlayerCombatStats.basemagdef
}