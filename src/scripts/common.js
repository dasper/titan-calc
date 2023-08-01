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
            document.getElementById(id).innerHTML = request.responseText;
        }
    };
    request.send();
}

function buildListeners(){
    const hover = document.getElementsByClassName("draw-spell");
    Array.from(hover).forEach(function(element) {
        element.addEventListener('mouseenter', DrawTip);
        element.addEventListener('mouseleave', KillTip);
    });

    const pointAdder = document.getElementsByClassName("add-point");
    Array.from(pointAdder).forEach(function(element) {
        element.addEventListener('mousedown', AddPointNew);
    });
}

function Skill(name, min_points, spells, preReq, desc) {
    return {
        name: name,
        min_points:min_points,
        desc:desc,
        spells:spells,
        preReq:preReq
    }
}

function Attribute(Hth, Egy, Str, Dex, Int) {
    return {
        str:Str,
        dex:Dex,
        health:Hth,
        inte:Int,
        energy:Egy
    }
}


function SpellInfo(spellInfo) {
    return {spellInfo:spellInfo}
}

window.loadHtml = loadHtml;
window.getQueryString = getQueryString;
