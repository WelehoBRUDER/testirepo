function EnemyAi() {
    if (EnemyInCombat.difficulty == "simple") {
        let aiWants = 0;
        let aiChosen = 0;
        for (let i = 0; i < EnemyInCombat.abilities.length; i++) {
            let ability = EnemyInCombat.abilities[i];
            if (NotOnCoolDown(ability.name)) {
                if (ability.type == "heal" && NotOnCoolDown(ability.name) && EnemyInCombat.stats.mana >= ability.mp_use) {
                    if (EnemyInCombat.stats.hp >= EnemyInCombat.stats.maxhp / 2) {
                        if (ability.ai_will_do - 1 > aiWants) { aiWants = ability.ai_will_do - 1; aiChosen = i };
                    } else if (EnemyInCombat.stats.hp < EnemyInCombat.stats.maxhp / 2 && EnemyInCombat.stats.hp > EnemyInCombat.stats.maxhp / 4) {
                        if (ability.ai_will_do + 1 > aiWants) { aiWants = ability.ai_will_do + 1; aiChosen = i };
                    } else if (EnemyInCombat.stats.hp <= EnemyInCombat.stats.maxhp / 4) {
                        if (ability.ai_will_do + 3 > aiWants) { aiWants = ability.ai_will_do + 3; aiChosen = i; };
                    }
                } else if (NotOnCoolDown(ability.name) && EnemyInCombat.stats.mana >= ability.mp_use && ability.type != "heal") {
                    if (ability.ai_will_do > aiWants) { aiWants = ability.ai_will_do; aiChosen = i; };
                }
            }
        }
        EnemyUseAbility(aiChosen);
    } else if (EnemyInCombat.difficulty == "erratic") {
        let aiChosen = 0;
        while(!EnemyHasChosen(aiChosen)) aiChosen = Math.floor(Math.random() * EnemyInCombat.abilities.length);
        EnemyUseAbility(aiChosen);
    } else if (EnemyInCombat.difficulty == "boss") {
        CurrentTurn = "player";
    }
}

function EnemyHasChosen(chosen) {
    let ability = EnemyInCombat.abilities[chosen];
    if(!NotOnCoolDown(ability.name)) return false;
    if(ability.type == "heal") {
        if(EnemyInCombat.stats.hp <= EnemyInCombat.stats.maxhp/3) return true;
        else return false;
    } else return true;
}

function NotOnCoolDown(abi) {
    for (let i = 0; i < enemyCoolDowns.length; i++) {
        if (enemyCoolDowns[i].name == abi) return false;
    }
    return true;
}

function CaseWeaponSkill(skill) {
    switch (skill) {
        case 'sword':
            return EnemyInCombat.skills.sword;
        case 'fist':
            return EnemyInCombat.skills.fist;
    }
}

function EnemyUseAbility(num) {
    let ability = EnemyInCombat.abilities[num];
    CreateAbilityText(ability);
    if (ability.type == "heal") {
        if (ability.cost > 0) {
            let temp = [];
            temp = deepCopy(EnemyInCombat.abilities);
            enemyCoolDowns.push({ name: temp[num].name, cd: temp[num].cost });
        }
        if (ability.mp_use > 0) {
            EnemyInCombat.stats.mana -= ability.mp_use;
        }
        EnemyInCombat.stats.hp += ability.power;
        CreateHealText(ability.power, "enemy");
        UpdateRound();
        CurrentTurn = "player";
        return;
    }
    else if (ability.type == "atk") {
        let critT = 'no';
        let def = PlayerCombatStats.physdef;
        if (ability.cost > 0) {
            let temp = [];
            temp = deepCopy(EnemyInCombat.abilities);
            enemyCoolDowns.push({ name: temp[num].name, cd: temp[num].cost });
        }
        if (ability.mp_use > 0) {
            EnemyInCombat.stats.mana -= ability.mp_use;
        }
        if (ability.magical) def = PlayerCombatStats.magdef;
        if (ability.status != "empty") {

        }
        let wpnskill = CaseWeaponSkill(EnemyInCombat.weaponskill) / 100;
        let dmg = Math.ceil(EnemyInCombat.stats.dmg * (1 + wpnskill));
        let combatStr = EnemyInCombat.stats.str;
        let combatDex = EnemyInCombat.stats.dex;
        for (let i = 0; i < EnemyStatuses.length; i++) {
            if (EnemyStatuses[i].buff_stat) {
                if (EnemyStatuses[i].buff_stat == "str") {
                    combatStr = Math.ceil(combatStr * (1 + EnemyStatuses[i].buff_power));
                } else if (EnemyStatuses[i].buff_stat == "dex") {
                    combatDex = Math.ceil(combatDex * (1 + EnemyStatuses[i].buff_power));
                }
            } else if (EnemyStatuses[i].debuff_stat) {
                if (EnemyStatuses[i].debuff_stat == "str") {
                    combatStr = Math.ceil(combatStr * (1 - EnemyStatuses[i].buff_power));
                } else if (EnemyStatuses[i].debuff_stat == "dex") {
                    combatDex = Math.ceil(combatDex * (1 - EnemyStatuses[i].buff_power));
                }
            }
            if (EnemyStatuses[i].buff_dmg > 0 || EnemyStatuses[i].buff_dmg < 0) {
                dmg += EnemyStatuses[i].buff_dmg;
            }
        }
        dmg = Math.ceil(dmg * (1 + combatStr / 50 + combatDex / 100));
        dmg = dmg * ability.power;
        if (Math.random() * 100 > 95) { dmg += dmg * 2; critT = "yes"; }
        for (let i = 0; i < PlayerStatuses.length; i++) {
            if (PlayerStatuses[i].debuff_stat == "physdef" && !ability.magical) def = Math.floor(def * (1 - PlayerStatuses[i].debuff_power));
            else if (PlayerStatuses[i].buff_stat == "physdef" && !ability.magical) def = Math.ceil(def * (1 + PlayerStatuses[i].buff_power));
            else if (PlayerStatuses[i].debuff_stat == "magdef" && ability.magical) def = Math.ceil(def * (1 + PlayerStatuses[i].debuff_power));
            else if (PlayerStatuses[i].buff_stat == "magdef" && ability.magical) def = Math.ceil(def * (1 + PlayerStatuses[i].buff_power));
        }
        let defcombatDex = PlayerCombatStats.dex;
        let combatVit = PlayerCombatStats.vit;
        dmg = Math.floor(dmg * (1 - def / 125));
        for (let i = 0; i < PlayerStatuses.length; i++) {
            if (PlayerStatuses[i].debuff_stat) {
                if (PlayerStatuses[i].debuff_stat == "vit") {
                    combatVit = Math.floor(combatVit * (1 - PlayerStatuses[i].debuff_power));
                } else if (PlayerStatuses[i].debuff_stat == "dex") {
                    defcombatDex = Math.floor(defcombatDex * (1 - PlayerStatuses[i].debuff_power));
                }
            } else if (PlayerStatuses[i].buff_stat) {
                if (PlayerStatuses[i].buff_stat == "vit") {
                    combatVit = Math.floor(combatVit * (1 + PlayerStatuses[i].buff_power));
                } else if (PlayerStatuses[i].buff_stat == "dex") {
                    defcombatDex = Math.floor(defcombatDex * (1 + PlayerStatuses[i].buff_power));
                }
            }
        }
        if (critT == "no") dmg = Math.floor(dmg * (1 - (defcombatDex / 2 + combatVit) / 475));
        EnemyAttack(dmg, critT);
    } else if (ability.type == "buff") {
        if (ability.cost > 0) {
            let temp = [];
            temp = deepCopy(EnemyInCombat.abilities);
            enemyCoolDowns.push({ name: temp[num].name, cd: temp[num].cost });
        }
        if (ability.mp_use > 0) {
            EnemyInCombat.stats.mana -= ability.mp_use;
        }
        let temp = [];
        temp = deepCopy(PossibleStatuses);
        AddEnemyBuff(temp[IntFor(temp, ability.status)], ability.name_long);
        return;
    } else if (ability.type == "debuff") {
        if (ability.cost > 0) {
            let temp = [];
            temp = deepCopy(EnemyInCombat.abilities);
            enemyCoolDowns.push({ name: temp[num].name, cd: temp[num].cost });
        }
        if (ability.mp_use > 0) {
            EnemyInCombat.stats.mana -= ability.mp_use;
        }
        let temp = [];
        temp = deepCopy(PossibleStatuses);
        PlayerStatuses.push(temp[IntFor(temp, ability.status)]);
        CreatePlayerIcons();
        CreateEffectTextEnemy("debuff", ability.name_long);
        UpdateRound();
        CurrentTurn = "player";
        return;
    }
}

function CreateAbilityText(ability) {
    let text = Create('p');
    text.textContent = 'Used ability ' + ability.name_long;
    text.classList.add('RegularDamage');
    text.style.color = 'yellow';
    text.style.top = `${Math.floor(Math.random() * (400 - 200) + 200)}px`;
    text.style.left = `${Math.floor(Math.random() * (1100 - 500) + 500)}px`
    Element('body2').appendChild(text);
    setTimeout(DeleteDamage, 2950);
    function DeleteDamage() {
        Element('body2').removeChild(Element('body2').childNodes[0]);
    }
}