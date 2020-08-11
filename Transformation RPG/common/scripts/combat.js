
Element('playerPortrait').style.backgroundImage = "url(common/images/player/playerimg.png)";
let shakeNum = 0;
let shaking = false;
let EnemyInCombat;
let selected = "skills";
let CurrentTurn = 'player';
let music = Element('audio');
let effect = Element('effect');
CopyEnemy(0);
Element('enemyNameText').textContent = EnemyInCombat.name;
Element('playerNameText').textContent = PlayerGeneral.name;
Element('skills').addEventListener('click', gotoskills);
Element('spells').addEventListener('click', gotospells);
Element('items').addEventListener('click', gotoitems);
Element('enemyPortrait').style.backgroundImage = `url(common/images/enemies/${EnemyInCombat.portrait}.png)`;
ManageMusic();
UpdateRound();
let EnemyStatuses = [];
let enemyCoolDowns = [];

function ManageMusic() {
    music.src = `common/audio/music/${EnemyInCombat.theme}.mp3`;
    music.volume = 0.01;
    music.play();
    music.loop = true;
}

function PlayHitSound() {
    effect.src = `common/audio/effects/hurt${Math.floor(Math.random() * (3 - 1) + 1)}.wav`;
    effect.volume = 0.95;
    effect.play();
}

function PlayDeathSound() {
    effect.src = `common/audio/effects/death.wav`;
    effect.volume = 0.95;
    effect.play();
    setTimeout(DeathSound, 1900);
    function DeathSound() {
        effect.src = `common/audio/effects/deathwave.wav`;
        effect.volume = 1;
        effect.play();
    }
}

function gotoskills() {
    selected = "skills";
    CombatMenu();
    Element('abilityIndicator').style.left = "81.5px"
}

function gotospells() {
    selected = "spells";
    CombatMenu();
    Element('abilityIndicator').style.left = "244.5px"
}

function gotoitems() {
    selected = "items";
    CombatMenu();
    Element('abilityIndicator').style.left = "407.5px"
}

function CopyEnemy(enemyID) {
    let temp = [];
    temp = deepCopy(Enemies);
    EnemyInCombat = temp[enemyID];
    EnemyInCombat.stats.maxhp = EnemyInCombat.stats.hp;
    EnemyInCombat.stats.maxmana = EnemyInCombat.stats.mana
}

function HarmEnemy(dmg, crit) {
    CurrentTurn = "enemy";
    if (!shaking && EnemyInCombat.stats.hp > 0) {
        EnemyInCombat.stats.hp -= dmg;
        CreateDamageText(dmg, crit);
        UpdateRound();
        shakeNum = Math.floor(Math.random() * 4) + 1;
        Element('enemyFrame').classList.add(`shake${shakeNum}`);
        PlayHitSound()
        shaking = true;
        setTimeout(removeShake, 200);
    }
}
function removeShake() {
    Element('enemyFrame').classList.remove(`shake${shakeNum}`);
    checkDeath();
    shaking = false;
    setTimeout(EnemyTurnStart, 100);
}

function AddPlayerBuff(buff, name) {
    PlayerStatuses.push(buff);
    CreatePlayerIcons();
    CreateEffectText("buff", name);
    if (selected == "skills") SkillMenu();
    else if (selected == "spells") SpellMenu();
    Element('playerframe').classList.add(`buffanim`);
    shaking = true;
    setTimeout(removeBuffPlayer, 1200);
}

function AddEnemyBuff(buff, name) {
    EnemyStatuses.push(buff);
    CreateEnemyIcons();
    CreateEffectTextEnemy("buff", name);
    Element('enemyFrame').classList.add(`buffanim`);
    shaking = true;
    setTimeout(removeBuffEnemy, 1200);
}

function AddPlayerDeBuff(debuff, name) {
    PlayerStatuses.push(debuff);
    CreatePlayerIcons();
    CreateEffectText("debuff", name);
    if (selected == "skills") SkillMenu();
    else if (selected == "spells") SpellMenu();
    Element('playerframe').classList.add(`debuffanim`);
    shaking = true;
    setTimeout(removeDeBuffPlayer, 1200);
}

function AddEnemyDeBuff(debuff, name) {
    EnemyStatuses.push(debuff);
    CreateEnemyIcons();
    CreateEffectTextEnemy("debuff", name);
    Element('enemyFrame').classList.add(`debuffanim`);
    shaking = true;
    UpdateRound();
    setTimeout(removeDeBuffEnemy, 1200);
}

function removeBuffPlayer() {
    Element('playerframe').classList.remove(`buffanim`);
    shaking = false;
    setTimeout(EnemyTurnStart, 100);
    UpdateRound();
}

function removeBuffEnemy() {
    Element('enemyFrame').classList.remove(`buffanim`);
    shaking = false;
    checkPlayerDeath();
    if (!shaking) CurrentTurn = "player";
    UpdateRound();
}

function removeDeBuffPlayer() {
    Element('playerframe').classList.remove(`debuffanim`);
    shaking = false;
    setTimeout(EnemyTurnStart, 100);
    UpdateRound();
}

function removeDeBuffEnemy() {
    Element('enemyFrame').classList.remove(`debuffanim`);
    shaking = false;
    checkPlayerDeath();
    if (!shaking) CurrentTurn = "player";
    UpdateRound();
}

function EnemyAttack(dmg, crit) {
    if (!shaking && PlayerCombatStats.hp > 0) {
        shaking = true;
        Element('enemyFrame').classList.add(`attack`);
        setTimeout(function () {
            shakeScreen(dmg, crit);
        }, 525)
    }
}

function shakeScreen(dmg, crit) {
    CreateDamageTextEnemy(dmg, crit);
    if (PlayerCombatStats.hp > 0) PlayerCombatStats.hp -= dmg;
    PlayHitSound()
    UpdateRound();
    shakeNum = Math.floor(Math.random() * 4) + 1;
    Element('combatframe').classList.add(`shake${shakeNum}`);
    setTimeout(removeShakeScreen, 200);
}
function removeShakeScreen() {
    Element('enemyFrame').classList.remove(`attack`);
    Element('combatframe').classList.remove(`shake${shakeNum}`);
    shaking = false;
    checkPlayerDeath();
    if (!shaking) CurrentTurn = "player";
}

function checkDeath() {
    if (EnemyInCombat.stats.hp <= 0) {
        shaking = true;
        Element('enemyFrame').classList.add(`death`);
        PlayDeathSound();
        setTimeout(killFoe, 2450);
    }
}

function checkPlayerDeath() {
    if (PlayerCombatStats.hp <= 0) {
        shaking = true;
        Element('combatframe').classList.add(`death`);
        PlayDeathSound();
        setTimeout(killPlayer, 2450);
    }
}

function CreateHealText(heal, who) {
    let text = Create('p');
    text.textContent = 'Healed ' + heal + ' HP';
    text.classList.add('RegularHeal');
    if (who == "player") {
        text.style.top = `${Math.floor(Math.random() * (700 - 400) + 400)}px`;
        text.style.left = `${Math.floor(Math.random() * (400 - 100) + 100)}px`
    } else if (who == "enemy") {
        text.style.top = `${Math.floor(Math.random() * (400 - 200) + 200)}px`;
        text.style.left = `${Math.floor(Math.random() * (1100 - 500) + 500)}px`
    }
    Element('body2').appendChild(text);
    setTimeout(DeleteDamage, 2950);
    function DeleteDamage() {
        Element('body2').removeChild(Element('body2').childNodes[0]);
    }
}

function CreateDamageText(dmg, crit) {
    let text = Create('p');
    if (crit == "no") {
        text.textContent = dmg;
        text.classList.add('RegularDamage');
        text.style.top = `${Math.floor(Math.random() * (400 - 200) + 200)}px`;
        text.style.left = `${Math.floor(Math.random() * (1100 - 500) + 500)}px`
        Element('body2').appendChild(text);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    } else {
        text.textContent = `CRIT ${dmg}!`;
        text.classList.add('CritDamage');
        text.style.top = `${Math.floor(Math.random() * (400 - 200) + 200)}px`;
        text.style.left = `${Math.floor(Math.random() * (1100 - 500) + 500)}px`
        Element('body2').appendChild(text);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    }
}

function CreateDamageTextEnemy(dmg, crit) {
    let text = Create('p');
    if (crit == "no") {
        text.textContent = dmg;
        text.classList.add('RegularDamage');
        text.style.top = `${Math.floor(Math.random() * (700 - 400) + 400)}px`;
        text.style.left = `${Math.floor(Math.random() * (400 - 100) + 100)}px`
        Element('body2').appendChild(text);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    } else {
        text.textContent = `CRIT ${dmg}!`;
        text.classList.add('CritDamage');
        text.style.top = `${Math.floor(Math.random() * (700 - 400) + 400)}px`;
        text.style.left = `${Math.floor(Math.random() * (400 - 100) + 100)}px`
        Element('body2').appendChild(text);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    }
}

function CreateEffectText(type, name) {
    if (type == "buff") {
        let up = Create('div');
        up.classList.add('Arrow');
        up.style.backgroundImage = "url(common/images/effects/upTemp.png)";
        up.style.top = `${Math.floor(Math.random() * (700 - 400) + 400)}px`;
        up.style.left = `${Math.floor(Math.random() * (400 - 100) + 100)}px`
        let effectName = Create('p');
        effectName.textContent = name;
        effectName.classList.add('buff');
        up.appendChild(effectName);
        Element('body2').appendChild(up);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    } else if (type == "debuff") {
        let down = Create('div');
        down.classList.add('Arrow');
        down.style.backgroundImage = "url(common/images/effects/downTemp.png)";
        down.style.top = `${Math.floor(Math.random() * (500 - 300) + 300)}px`;
        down.style.left = `${Math.floor(Math.random() * (900 - 400) + 400)}px`
        let effectName = Create('p');
        effectName.textContent = name;
        effectName.classList.add('debuff');
        down.appendChild(effectName);
        Element('body2').appendChild(down);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    }
}

function CreateEffectTextEnemy(type, name) {
    if (type == "buff") {
        let up = Create('div');
        up.classList.add('Arrow');
        up.style.backgroundImage = "url(common/images/effects/upTemp.png)";
        up.style.top = `${Math.floor(Math.random() * (500 - 300) + 300)}px`;
        up.style.left = `${Math.floor(Math.random() * (900 - 400) + 400)}px`
        let effectName = Create('p');
        effectName.textContent = name;
        effectName.classList.add('buff');
        up.appendChild(effectName);
        Element('body2').appendChild(up);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    } else if (type == "debuff") {
        let down = Create('div');
        down.classList.add('Arrow');
        down.style.backgroundImage = "url(common/images/effects/downTemp.png)";
        down.style.top = `${Math.floor(Math.random() * (700 - 400) + 400)}px`;
        down.style.left = `${Math.floor(Math.random() * (400 - 100) + 100)}px`
        let effectName = Create('p');
        effectName.textContent = name;
        effectName.classList.add('debuff');
        down.appendChild(effectName);
        Element('body2').appendChild(down);
        setTimeout(DeleteDamage, 2950);
        function DeleteDamage() {
            Element('body2').removeChild(Element('body2').childNodes[0]);
        }
    }
}

function CreateErrorText(text, level, x, y) {
    let errorText = Create('p');
    errorText.textContent = text;
    errorText.classList.add(level);
    errorText.style.left = `${x}px`
    errorText.style.top = `${y - 20}px`;
    Element('body2').appendChild(errorText);
    setTimeout(DeleteDamage, 2950);
    function DeleteDamage() {
        Element('body2').removeChild(Element('body2').childNodes[0]);
    }
}

function CreatePlayerIcons() {
    Element('playerstatusicons').textContent = '';
    for (let i = 0; i < PlayerStatuses.length; i++) {
        let ico = Create('div');
        ico.classList.add('StatusIcon');
        ico.style.backgroundImage = `url(common/images/effects/${PlayerStatuses[i].icon}.png)`;
        Element('playerstatusicons').appendChild(ico);
    }
}

function CreateEnemyIcons() {
    Element('enemystatusicons').textContent = '';
    for (let i = 0; i < EnemyStatuses.length; i++) {
        let ico = Create('div');
        ico.classList.add('StatusIcon');
        ico.style.backgroundImage = `url(common/images/effects/${EnemyStatuses[i].icon}.png)`;
        Element('enemystatusicons').appendChild(ico);
    }
}

function killFoe() {
    Element('enemyFrame').style.transform = "scale(0)";
    shaking = false;
}

function killPlayer() {
    Element('combatframe').style.transform = "scale(0)";
    shaking = false;
}

function EnemyTurnStart() {
    ReduceStatusEffects(EnemyStatuses);
    ReduceEnemyCoolDowns();
    EnemyAi();
}

function PlayerAttack(t) {
    let id = t.target.id.substring(5); // Targeted playerAbility in the table.
    if (CurrentTurn != 'player') {
        CreateErrorText('Enemy turn!', 'redError', t.x, t.y);
        return;
    }
    if (t.target.id.startsWith("itemN")) {
        if (combatInventory[id].use == "heal") {
            if (PlayerCombatStats.hp == PlayerCombatStats.maxhp) return;
            PlayerCombatStats.hp += combatInventory[id].power;
            CreateHealText(combatInventory[id].power, "player");
        }
        else if (combatInventory[id].use == "restoremp") {
            if (PlayerCombatStats.mana == PlayerCombatStats.maxmana) return;
            PlayerCombatStats.mana += combatInventory[id].power;
        }
        combatInventory[id].amount--;
        if (combatInventory[id].amount <= 0) combatInventory.splice(id, 1);
        ReduceStatusEffects(PlayerStatuses);
        ReduceCoolDowns(playerCoolDowns);
        CreatePlayerIcons();
        EnemyTurnStart();
        ItemMenu();
        UpdateRound();
        return;
    }
    if (playerAbilities[id].type == "heal") {
        if (!CheckCoolDown(playerCoolDowns, playerAbilities[id].name) && PlayerCombatStats.mana >= playerAbilities[id].mp_use) {
            ReduceCoolDowns(playerCoolDowns);
            if (playerAbilities[id].cost > 0) {
                let temp = [];
                temp = deepCopy(playerAbilities);
                playerCoolDowns.push({ name: temp[id].name, cd: temp[id].cost });
            }
            if (playerAbilities[id].mp_use > 0) {
                PlayerCombatStats.mana -= playerAbilities[id].mp_use;
            }
            PlayerCombatStats.hp += playerAbilities[id].power;
            CreateHealText(playerAbilities[id].power, "player");
            ReduceStatusEffects(PlayerStatuses);
            CreatePlayerIcons();
            EnemyTurnStart();
            if (selected == "skills") SkillMenu();
            else if (selected == "spells") SpellMenu();
            UpdateRound();
            return;
        }
        if (CheckCoolDown(playerCoolDowns, playerAbilities[id].name)) {
            CreateErrorText('Ability on cooldown!', 'orangeError', t.x, t.y);
            return;
        }
        if (PlayerCombatStats.mana < playerAbilities[id].mp_use) {
            CreateErrorText('Not enough mana!', 'orangeError', t.x, t.y);
            return;
        }
    }
    else if (playerAbilities[id].type == "atk") {
        if (NeedsWeaponNotHave(playerAbilities[id])) {
            CreateErrorText('No weapon equipped!', 'orangeError', t.x, t.y);
            return;
        }
        if (!CheckCoolDown(playerCoolDowns, playerAbilities[id].name) && PlayerCombatStats.mana >= playerAbilities[id].mp_use) {
            let critT = "no"
            ReduceCoolDowns(playerCoolDowns);
            let def = EnemyInCombat.defenses.phys;
            if (playerAbilities[id].cost > 0) {
                let temp = [];
                temp = deepCopy(playerAbilities);
                playerCoolDowns.push({ name: temp[id].name, cd: temp[id].cost });
            }
            if (playerAbilities[id].mp_use > 0) {
                PlayerCombatStats.mana -= playerAbilities[id].mp_use;
            }
            if (playerAbilities[id].magical) def = EnemyInCombat.defenses.mag;
            if (playerAbilities[id].status != "empty") {

            }
            if (playerAbilities[id].spell == false) {
                if (playerAbilities[id].needs_weapon) {
                    let wpnskill = FindWeaponSkill('weapon');
                    let dmg = Math.ceil(PhysicalWeaponDamage('weapon') * (1 + wpnskill));
                    let combatStr = PlayerCombatStats.str;
                    let combatDex = PlayerCombatStats.dex;
                    for (let i = 0; i < PlayerStatuses.length; i++) {
                        if (PlayerStatuses[i].buff_stat) {
                            if (PlayerStatuses[i].buff_stat == "str") {
                                combatStr = Math.ceil(combatStr * (1 + PlayerStatuses[i].buff_power));
                            } else if (PlayerStatuses[i].buff_stat == "dex"){
                                combatDex = Math.ceil(combatDex * (1 + PlayerStatuses[i].buff_power));
                            }
                        } else if (PlayerStatuses[i].debuff_stat) {
                            if (PlayerStatuses[i].debuff_stat == "str") {
                                combatStr = Math.ceil(combatStr * (1 - PlayerStatuses[i].buff_power));
                            } else if (PlayerStatuses[i].debuff_stat == "dex"){
                                combatDex = Math.ceil(combatDex * (1 - PlayerStatuses[i].buff_power));
                            }
                        }
                        if (PlayerStatuses[i].buff_dmg > 0 || PlayerStatuses[i].buff_dmg < 0) {
                            dmg += PlayerStatuses[i].buff_dmg;
                        }
                    }
                    dmg = Math.ceil(dmg * (1 + combatStr / 50 + combatDex / 100));
                    dmg = dmg * playerAbilities[id].power;
                    if (Math.random() * 100 > (95 - PlayerCombatStats.crt)) { dmg += dmg * 2; critT = "yes"; }
                    for (let i = 0; i < EnemyStatuses.length; i++) {
                        if (EnemyStatuses[i].debuff_stat == "physdef" && !playerAbilities[id].magical) def = Math.floor(def * (1 - EnemyStatuses[i].debuff_power));
                        else if (EnemyStatuses[i].buff_stat == "physdef" && !playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].buff_power));
                        else if (EnemyStatuses[i].debuff_stat == "magdef" && playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].debuff_power));
                        else if (EnemyStatuses[i].buff_stat == "magdef" && playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].buff_power));
                    }
                    dmg = Math.floor(dmg * (1 - def / 125));
                    let encombatVit = EnemyInCombat.stats.vit;
                    let encombatDex = EnemyInCombat.stats.dex;
                    for (let i = 0; i < EnemyStatuses.length; i++) {
                        if (EnemyStatuses[i].debuff_stat) {
                            if (EnemyStatuses[i].debuff_stat == "vit") {
                                encombatVit = Math.floor(encombatVit * (1 - EnemyStatuses[i].debuff_power));
                            } else if (EnemyStatuses[i].debuff_stat == "dex") {
                                encombatDex = Math.floor(encombatDex * (1 - EnemyStatuses[i].debuff_power));
                            }
                        } else if (EnemyStatuses[i].buff_stat) {
                            if (EnemyStatuses[i].buff_stat == "vit") {
                                encombatVit = Math.floor(encombatVit * (1 + EnemyStatuses[i].buff_power));
                            } else if (EnemyStatuses[i].buff_stat == "dex") {
                                encombatDex = Math.floor(encombatDex * (1 + EnemyStatuses[i].buff_power));
                            }
                        }
                    }
                    if (critT == "no") dmg = Math.floor(dmg * (1 - (encombatDex / 2 + encombatVit) / 475));
                    HarmEnemy(dmg, critT);
                }
                else {
                    let dmg = Math.ceil((PlayerCombatStats.fistdamage + PhysicalWeaponDamage('unarmed')) * (1 + PlayerSkills.fist / 100));
                    let combatStr = PlayerCombatStats.str;
                    let combatDex = PlayerCombatStats.dex;
                    for (let i = 0; i < PlayerStatuses.length; i++) {
                        if (PlayerStatuses[i].buff_stat) {
                            if (PlayerStatuses[i].buff_stat == "str") {
                                combatStr = Math.ceil(combatStr * (1 + PlayerStatuses[i].buff_power));
                            } else if (PlayerStatuses[i].buff_stat == "dex"){
                                combatDex = Math.ceil(combatDex * (1 + PlayerStatuses[i].buff_power));
                            }
                        } else if (PlayerStatuses[i].debuff_stat) {
                            if (PlayerStatuses[i].debuff_stat == "str") {
                                combatStr = Math.ceil(combatStr * (1 - PlayerStatuses[i].buff_power));
                            } else if (PlayerStatuses[i].debuff_stat == "dex"){
                                combatDex = Math.ceil(combatDex * (1 - PlayerStatuses[i].buff_power));
                            }
                        }
                        if (PlayerStatuses[i].buff_dmg > 0 || PlayerStatuses[i].buff_dmg < 0) {
                            dmg += PlayerStatuses[i].buff_dmg;
                        }
                    }
                    dmg = Math.ceil(dmg * (1 + combatStr / 50 + combatDex / 100));
                    dmg = dmg * playerAbilities[id].power;
                    if (Math.random() * 100 > (95 - PlayerCombatStats.crt)) { dmg += dmg * 2; critT = "yes"; }
                    for (let i = 0; i < EnemyStatuses.length; i++) {
                        if (EnemyStatuses[i].debuff_stat == "physdef" && !playerAbilities[id].magical) def = Math.floor(def * (1 - EnemyStatuses[i].debuff_power));
                        else if (EnemyStatuses[i].buff_stat == "physdef" && !playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].buff_power));
                        else if (EnemyStatuses[i].debuff_stat == "magdef" && playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].debuff_power));
                        else if (EnemyStatuses[i].buff_stat == "magdef" && playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].buff_power));
                    }
                    dmg = Math.floor(dmg * (1 - def / 125));
                    let encombatVit = EnemyInCombat.stats.vit;
                    let encombatDex = EnemyInCombat.stats.dex;
                    for (let i = 0; i < EnemyStatuses.length; i++) {
                        if (EnemyStatuses[i].debuff_stat) {
                            if (EnemyStatuses[i].debuff_stat == "vit") {
                                encombatVit = Math.floor(encombatVit * (1 - EnemyStatuses[i].debuff_power));
                            } else if (EnemyStatuses[i].debuff_stat == "dex") {
                                encombatDex = Math.floor(encombatDex * (1 - EnemyStatuses[i].debuff_power));
                            }
                        } else if (EnemyStatuses[i].buff_stat) {
                            if (EnemyStatuses[i].buff_stat == "vit") {
                                encombatVit = Math.floor(encombatVit * (1 + EnemyStatuses[i].buff_power));
                            } else if (EnemyStatuses[i].buff_stat == "dex") {
                                encombatDex = Math.floor(encombatDex * (1 + EnemyStatuses[i].buff_power));
                            }
                        }
                    }
                    if (critT == "no") dmg = Math.floor(dmg * (1 - (encombatDex / 2 + encombatVit) / 475));
                    HarmEnemy(dmg, critT);
                }
                ReduceStatusEffects(PlayerStatuses);
                CreatePlayerIcons();
                SkillMenu();
                UpdateRound();
                return;
            }
            else if (playerAbilities[id].spell) {
                let spellmulti = 0;
                if (playerAbilities[id].magic == "light") spellmulti = 1 + PlayerSkills.lightmagic / 100;
                else if (playerAbilities[id].magic == "dark") spellmulti = 1 + PlayerSkills.darkamgic / 100;
                let dmg = Math.ceil(playerAbilities[id].power * spellmulti);
                let combatSpi = PlayerCombatStats.spi;
                for (let i = 0; i < PlayerStatuses.length; i++) {
                    if (PlayerStatuses[i].buff_stat) {
                        if (PlayerStatuses[i].buff_stat == "spi") {
                            combatSpi = Math.ceil(combatSpi * (1 + PlayerStatuses[i].buff_power));
                        }
                    }
                    else if (PlayerStatuses[i].debuff_stat) {
                        if (PlayerStatuses[i].debuff_stat == "spi") {
                            combatSpi = Math.ceil(combatSpi * (1 - + PlayerStatuses[i].debuff_power));
                        }
                    }
                    if (PlayerStatuses[i].buff_dmg > 0 || PlayerStatuses[i].buff_dmg < 0) {
                        dmg += PlayerStatuses[i].buff_dmg;
                    }
                }
                dmg = Math.ceil(dmg * (1 + combatSpi / 50));
                if (Math.random() * 100 > (95 - PlayerCombatStats.crt)) { dmg += dmg * 2; critT = "yes"; }
                for (let i = 0; i < EnemyStatuses.length; i++) {
                    if (EnemyStatuses[i].debuff_stat == "physdef" && !playerAbilities[id].magical) def = Math.floor(def * (1 - EnemyStatuses[i].debuff_power));
                    else if (EnemyStatuses[i].buff_stat == "physdef" && !playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].buff_power));
                    else if (EnemyStatuses[i].debuff_stat == "magdef" && playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].debuff_power));
                    else if (EnemyStatuses[i].buff_stat == "magdef" && playerAbilities[id].magical) def = Math.ceil(def * (1 + EnemyStatuses[i].buff_power));
                }
                dmg = Math.floor(dmg * (1 - def / 125));
                let encombatVit = EnemyInCombat.stats.vit;
                let encombatDex = EnemyInCombat.stats.dex;
                for (let i = 0; i < EnemyStatuses.length; i++) {
                    if (EnemyStatuses[i].debuff_stat) {
                        if (EnemyStatuses[i].debuff_stat == "vit") {
                            encombatVit = Math.floor(encombatVit * (1 - EnemyStatuses[i].debuff_power));
                        } else if (EnemyStatuses[i].debuff_stat == "dex") {
                            encombatDex = Math.floor(encombatDex * (1 - EnemyStatuses[i].debuff_power));
                        }
                    } else if (EnemyStatuses[i].buff_stat) {
                        if (EnemyStatuses[i].buff_stat == "vit") {
                            encombatVit = Math.floor(encombatVit * (1 + EnemyStatuses[i].buff_power));
                        } else if (EnemyStatuses[i].buff_stat == "dex") {
                            encombatDex = Math.floor(encombatDex * (1 + EnemyStatuses[i].buff_power));
                        }
                    }
                }
                if (critT == "no") dmg = Math.floor(dmg * (1 - (encombatDex / 2 + encombatVit) / 475));
                HarmEnemy(dmg, critT);
                ReduceStatusEffects(PlayerStatuses);
                CreatePlayerIcons();
                SpellMenu();
                UpdateRound();
                return;
            }
        }
        if (CheckCoolDown(playerCoolDowns, playerAbilities[id].name)) {
            CreateErrorText('Ability on cooldown!', 'orangeError', t.x, t.y);
            return;
        }
        if (PlayerCombatStats.mana < playerAbilities[id].mp_use) {
            CreateErrorText('Not enough mana!', 'orangeError', t.x, t.y);
            return;
        }
    }
    else if (playerAbilities[id].type == "buff") {
        if (NeedsWeaponNotHave(playerAbilities[id])) {
            CreateErrorText('No weapon equipped!', 'orangeError', t.x, t.y);
            return;
        }
        if (!CheckCoolDown(playerCoolDowns, playerAbilities[id].name) && PlayerCombatStats.mana >= playerAbilities[id].mp_use) {
            ReduceCoolDowns(playerCoolDowns);
            ReduceStatusEffects(PlayerStatuses);
            if (playerAbilities[id].cost > 0) {
                let temp = [];
                temp = deepCopy(playerAbilities);
                playerCoolDowns.push({ name: temp[id].name, cd: temp[id].cost });
            }
            if (playerAbilities[id].mp_use > 0) {
                PlayerCombatStats.mana -= playerAbilities[id].mp_use;
            }
            let temp = [];
            temp = deepCopy(PossibleStatuses);
            AddPlayerBuff(temp[IntFor(temp, playerAbilities[id].status)], playerAbilities[id].name_long);
            return;
        }
        if (CheckCoolDown(playerCoolDowns, playerAbilities[id].name)) {
            CreateErrorText('Ability on cooldown!', 'orangeError', t.x, t.y);
            return;
        }
        if (PlayerCombatStats.mana < playerAbilities[id].mp_use) {
            CreateErrorText('Not enough mana!', 'orangeError', t.x, t.y);
            return;
        }
    }
    else if (playerAbilities[id].type == "debuff") {
        if (NeedsWeaponNotHave(playerAbilities[id])) {
            CreateErrorText('No weapon equipped!', 'orangeError', t.x, t.y);
            return;
        }
        if (!CheckCoolDown(playerCoolDowns, playerAbilities[id].name) && PlayerCombatStats.mana >= playerAbilities[id].mp_use) {
            ReduceCoolDowns(playerCoolDowns);
            ReduceStatusEffects(PlayerStatuses);
            if (playerAbilities[id].cost > 0) {
                let temp = [];
                temp = deepCopy(playerAbilities);
                playerCoolDowns.push({ name: temp[id].name, cd: temp[id].cost });
            }
            if (playerAbilities[id].mp_use > 0) {
                PlayerCombatStats.mana -= playerAbilities[id].mp_use;
            }
            let temp = [];
            temp = deepCopy(PossibleStatuses);
            AddEnemyDeBuff(temp[IntFor(temp, playerAbilities[id].status)], playerAbilities[id].name_long);
            return;
        }
        if (CheckCoolDown(playerCoolDowns, playerAbilities[id].name)) {
            CreateErrorText('Ability on cooldown!', 'orangeError', t.x, t.y);
            return;
        }
        if (PlayerCombatStats.mana < playerAbilities[id].mp_use) {
            CreateErrorText('Not enough mana!', 'orangeError', t.x, t.y);
            return;
        }
    }
}


function HasStatBuffs() {
    for (let i = 0; i < PlayerStatuses.length; i++) {
        if (PlayerStatuses[i].buff_stat != "no") return true;
    }
    return false;
}

function EnemyHasStatBuffs() {
    for (let i = 0; i < EnemyStatuses.length; i++) {
        if (EnemyStatuses[i].buff_stat != "no") return true;
    }
    return false;
}

function HasStatDeBuffs() {
    for (let i = 0; i < EnemyStatuses.length; i++) {
        if (EnemyStatuses[i].debuff_stat != "no") return true;
    }
    return false;
}

function PlayerHasStatDeBuffs() {
    for (let i = 0; i < PlayerStatuses.length; i++) {
        if (PlayerStatuses[i].debuff_stat != "no") return true;
    }
    return false;
}

function PhysicalWeaponDamage(type) {
    for (let i = 0; i < PlayerEquipment.length; i++) {
        if (PlayerEquipment[i].type == type) return PlayerEquipment[i].physatk;
    }
    return 0;
}

function FindWeaponSkill(wep) {
    let int = 0;
    for (let i = 0; i < PlayerEquipment.length; i++) {
        if (PlayerEquipment[i].type == wep) {
            int = i;
        }
    }
    let multi = 0;
    switch (PlayerEquipment[int].weptype) {
        case 'sword':
            multi = PlayerSkills.sword / 100;
            break;
        case 'axe':
            multi = PlayerSkills.axe / 100;
            break;
        case 'spear':
            multi = PlayerSkills.spear / 100;
            break;
    }
    return multi;
}

function NeedsWeaponNotHave(skill) {
    if (!skill.needs_weapon) return false;
    for (let i = 0; i < PlayerEquipment.length; i++) {
        if (PlayerEquipment[i].type == "weapon") return false;
    }
    return true;
}

function CheckCoolDown(table, skill) {
    for (let i = 0; i < table.length; i++) {
        if (table[i].name == skill) return true;
    }
    return false;
}

function ReduceCoolDowns(table) {
    for (let i = 0; i < table.length; i++) {
        table[i].cd--;
        if (table[i].cd <= 0) table.splice(i, 1);
    }
}

function ReduceEnemyCoolDowns() {
    for (let i = 0; i < enemyCoolDowns.length; i++) {
        enemyCoolDowns[i].cd--;
        if (enemyCoolDowns[i].cd <= 0) enemyCoolDowns.splice(i, 1);
    }
}

function ReduceStatusEffects(table) {
    for (let i = 0; i < table.length; i++) {
        table[i].last--;
        if (table[i].last <= 0) table.splice(i, 1);
    }
}

function UpdateRound() {
    if (PlayerCombatStats.hp > PlayerCombatStats.maxhp) PlayerCombatStats.hp = PlayerCombatStats.maxhp;
    if (PlayerCombatStats.mana > PlayerCombatStats.maxmana) PlayerCombatStats.mana = PlayerCombatStats.maxmana;
    if (PlayerCombatStats.hp < 0) PlayerCombatStats.hp = 0;
    if (PlayerCombatStats.mana < 0) PlayerCombatStats.mana = 0;
    Element('enemyHealthTaken').style.height = EnemyInCombat.stats.hp / EnemyInCombat.stats.maxhp * (Element('enemyHealthBG').offsetHeight - 0) + 'px';
    Element('enemyHealth').style.height = EnemyInCombat.stats.hp / EnemyInCombat.stats.maxhp * (Element('enemyHealthBG').offsetHeight - 0) + 'px';
    Element('enemyManaTaken').style.height = EnemyInCombat.stats.mana / EnemyInCombat.stats.maxmana * (Element('enemyManaBG').offsetHeight - 0) + 'px';
    Element('enemyMana').style.height = EnemyInCombat.stats.mana / EnemyInCombat.stats.maxmana * (Element('enemyManaBG').offsetHeight - 0) + 'px';
    Element('playerHealthTaken').style.height = PlayerCombatStats.hp / PlayerCombatStats.maxhp * (Element('playerHealthBG').offsetHeight - 0) + 'px';
    Element('playerHealth').style.height = PlayerCombatStats.hp / PlayerCombatStats.maxhp * (Element('playerHealthBG').offsetHeight - 0) + 'px';
    Element('playerManaTaken').style.height = PlayerCombatStats.mana / PlayerCombatStats.maxmana * (Element('playerManaBG').offsetHeight - 0) + 'px';
    Element('playerMana').style.height = PlayerCombatStats.mana / PlayerCombatStats.maxmana * (Element('playerManaBG').offsetHeight - 0) + 'px';
    Element('enemyHealthNum').textContent = `${EnemyInCombat.stats.hp}/${EnemyInCombat.stats.maxhp}`;
    Element('enemyManaNum').textContent = `${EnemyInCombat.stats.mana}/${EnemyInCombat.stats.maxmana}`;
    Element('playerHealthNum').textContent = `${PlayerCombatStats.hp}/${PlayerCombatStats.maxhp}`;
    Element('playerManaNum').textContent = `${PlayerCombatStats.mana}/${PlayerCombatStats.maxmana}`;
}