function getQueryString(param) {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(param)) {
        return searchParams.get(param);
    } else
        return "";

}

function loadHtml(id, file) {
    const request = new XMLHttpRequest();
    request.open('GET', '/skill-html/' + file, false);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const resp = request.responseText;
            document.getElementById(id).innerHTML = resp;

        }
    };
    request.send();
}

function Skill(name, min_points, spells, preReq, desc) {
    this.name = name
    this.min_points = min_points
    this.desc = desc
    this.spells = spells
    this.preReq = preReq
}

function Attribute(Hth, Egy, Str, Dex, Int) {
    this.str = Str
    this.dex = Dex
    this.health = Hth
    this.inte = Int
    this.energy = Egy
}


function SpellInfo(spellInfo) {
    this.spellInfo = spellInfo
}

window.loadHtml = loadHtml;
window.getQueryString = getQueryString;
