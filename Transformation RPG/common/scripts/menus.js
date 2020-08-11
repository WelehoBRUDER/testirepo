function CombatMenu() {
    Element('playerAbilities').textContent = '';
    if(selected == "skills") SkillMenu();
    else if(selected == 'spells') SpellMenu();
    else if(selected == 'items') ItemMenu();
}

function SkillMenu() {
    Element('playerAbilities').textContent = '';
    for(let i = 0; i<playerAbilities.length; i++) {
        if(playerAbilities[i].spell == false) {
            let button = Create('button');
            if(AbilityIsOnCooldown(playerAbilities, i, playerCoolDowns)) {
                let int = IntFor(playerCoolDowns, playerAbilities[i].name);
                button.textContent = `${playerCoolDowns[int].cd} turns`;
                button.classList.add('button_on_cooldown');
            }
            else {
                button.textContent = playerAbilities[i].name;
            }
            button.id = `skill${i}`;
            button.addEventListener('click', PlayerAttack);
            Element('playerAbilities').appendChild(button);
            button.addEventListener('mouseenter', CheckForInfo);
            button.addEventListener('mouseleave', RemoveInfoBox);
        }
    }
}

function SpellMenu() {
    Element('playerAbilities').textContent = '';
    for(let i = 0; i<playerAbilities.length; i++) {
        if(playerAbilities[i].spell == true) {
            let button = Create('button');
            if(AbilityIsOnCooldown(playerAbilities, i, playerCoolDowns)) {
                let int = IntFor(playerCoolDowns, playerAbilities[i].name);
                button.textContent = `${playerCoolDowns[int].cd} turns`;
                button.classList.add('button_on_cooldown');
            }
            else {
                button.textContent = playerAbilities[i].name;
            }
            button.id = `spell${i}`;
            button.addEventListener('click', PlayerAttack);
            Element('playerAbilities').appendChild(button);
            button.addEventListener('mouseenter', CheckForInfo);
            button.addEventListener('mouseleave', RemoveInfoBox);
        }
    }
}

function ItemMenu() {
    Element('playerAbilities').textContent = '';
    for(let i = 0; i<combatInventory.length; i++) {
        let button = Create('button');
        button.textContent = `${combatInventory[i].name} x${combatInventory[i].amount}`;
        button.id = `itemN${i}`;
        button.addEventListener('click', PlayerAttack);
        Element('playerAbilities').appendChild(button);
        button.addEventListener('mouseenter', CheckForInfo);
        button.addEventListener('mouseleave', RemoveInfoBox);
    }
}

function RemoveInfoBox() {
    Element('textForAbilitiesAndSpells').style.transform = 'scale(0)';
}
RemoveInfoBox();

document.addEventListener('mouseenter', RemoveInfoBox);

function AbilityIsOnCooldown(table, id, cooldowns) {
    for(let i = 0; i<cooldowns.length; i++) {
        if(cooldowns[i].name == table[id].name) return true;
    }
    return false;
}

function CheckForInfo(e) {
    if(e.target.id == "playerAbilities") return;
    let bg = Element('textForAbilitiesAndSpells');
    let id = e.target.id.substring(5);
    bg.style.transform = 'scale(1)';
    bg.textContent = '';
    bg.style.top = `${Element(e.target.id).getBoundingClientRect().top - 250}px`;
    bg.style.left = `${Element(e.target.id).getBoundingClientRect().left - 50}px`;
    if(e.target.id.startsWith("itemN")) {
        let name = Create('p');
        name.textContent = combatInventory[id].name_long;
        name.classList.add('emphasis');
        bg.appendChild(name);
        let hr = Create('hr');
        hr.classList.add('separate');
        bg.appendChild(hr);
        let desc = Create('p');
        if(FoundDescItem(id)) desc.textContent = ItemDescriptions[IntFor(ItemDescriptions, combatInventory[id].name)].desc;
        else { desc.textContent = 'Description is missing or malformed.'; desc.style.color = "yellow"; }
        bg.appendChild(desc);
    }
    else {
        let name = Create('p');
        name.textContent = playerAbilities[id].name_long;
        name.classList.add('emphasis');
        bg.appendChild(name);
        let hr = Create('hr');
        hr.classList.add('separate');
        bg.appendChild(hr);
        let desc = Create('p');
        if(FoundDesc(id)) desc.textContent = AbilityDescriptions[IntFor(AbilityDescriptions, playerAbilities[id].name)].desc;
        else { desc.textContent = 'Description is missing or malformed.'; desc.style.color = "yellow"; }
        bg.appendChild(desc);
    }
    let abiDesc = Create('p');
    if(playerAbilities[id].type == "atk") {
        if(playerAbilities[id].needs_weapon && !playerAbilities[id].spell) {
            if(!playerAbilities[id].magical) abiDesc.textContent = `Deal Weapon Damage x ${playerAbilities[id].power} physical damage to enemy.`;
            else if(playerAbilities[id].magical) abiDesc.textContent = `Deal Weapon Damage x ${playerAbilities[id].power} magical damage to enemy.`;
        } else if(!playerAbilities[id].needs_weapon && !playerAbilities[id].spell) {
            if(!playerAbilities[id].magical) abiDesc.textContent = `Deal Fist Damage x ${playerAbilities[id].power} physical damage to enemy.`;
            else if(playerAbilities[id].magical) abiDesc.textContent = `Deal Fist Damage x ${playerAbilities[id].power} magical damage to enemy.`;
        } else if(!playerAbilities[id].needs_weapon && playerAbilities[id].spell) {
            if(!playerAbilities[id].magical) abiDesc.textContent = `Deal ${playerAbilities[id].power} physical damage to enemy.`;
            else if(playerAbilities[id].magical) abiDesc.textContent = `Deal ${playerAbilities[id].power} magical damage to enemy.`;
        }
    }
    else if(playerAbilities[id].type == "heal") {
        abiDesc.textContent = `Heal ${playerAbilities[id].power} points of damage.`;
    }
    bg.appendChild(abiDesc);
    if(playerAbilities[id].cost > 0) {
        let cost = Create('p');
        cost.textContent = `Cooldown:  ${playerAbilities[id].cost} turns.`;
        bg.appendChild(cost);
    }
    function FoundDesc(ID) {
        for(let i = 0; i<AbilityDescriptions.length; i++) {
            if(AbilityDescriptions[i].name == playerAbilities[ID].name) return true;
        }
        return false;
    }
    function FoundDescItem(ID) {
        for(let i = 0; i<ItemDescriptions.length; i++) {
            if(ItemDescriptions[i].name == combatInventory[ID].name) return true;
        }
        return false;
    }
}

