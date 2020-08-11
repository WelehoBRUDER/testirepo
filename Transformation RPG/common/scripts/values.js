function Element(elem) {
    return document.getElementById(elem);
}

function Create(elem) {
    return document.createElement(elem);
}

function IntFor(table, key) {
    for(let i = 0; i<table.length; i++) {
        if(table[i].name == key) return i;
    }
}