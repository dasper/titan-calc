// 1. Earth, 2. Spirit, 3. Warfare, 4. Nature, 5. Defense, 6. Rogue, 7. Hunting, 8. Storm

const _SkillLevel = [] //0
const UserSkills = [];
let _TotalPoints = 222;
Mastery = [] // stores mastery data for this page
AttributesBase = Attribute(300, 300, 50, 50, 50) // stores base attributes for characters

function SetUserSkills() {
    this.SkillLevel = new Array(19)
}

function SetPage(masteryId, bolReset) {
    if (bolReset) { // if we already have an array defined, we are resetting
        if (!confirm('Are you sure you want to reset the ' + Mastery[masteryId].masteryName + ' mastery?')) {
            return false;
        }
        _TotalPoints = parseInt(_TotalPoints) + parseInt(_SkillLevel[masteryId])
        let TotalPoints = 0
        for (let y = 0; y < UserSkills[masteryId].SkillLevel.length; y++) {
            if (UserSkills[masteryId].SkillLevel[y]) {
                TotalPoints = TotalPoints + UserSkills[masteryId].SkillLevel[y]
            }
        }
        _TotalPoints = parseInt(_TotalPoints) + TotalPoints
    }

    UserSkills[masteryId] = new SetUserSkills()
    _SkillLevel[masteryId] = 0;


    if (masteryId > 0)
        for (let x = 0; x < (Mastery[masteryId].Skills.length); x++) {
            if (document.getElementById("spell_" + masteryId + '_' + (x + 1))) {
                document.getElementById("spell_" + masteryId + '_' + (x + 1)).innerHTML = "0 of " + ((Mastery[masteryId].Skills[x].spells.length) - 1)
            }
        }

    UpdateSkillStats(masteryId)
    UpdateLinkBack()
    UpdatePlayerBaseAttributes()
    UpdateSkillBar(masteryId)
    if (bolReset) {
        DrawSpellList()
    } // redraw spells on resets


    if (!bolReset) {
        if (_PreSet1.length > 0 && UserSkills[_Mastery1] && masteryId == _Mastery1) {
            SetFormFromReturn(_PreSet1, _Mastery1)
        }
        if (_PreSet2.length > 0 && UserSkills[_Mastery2] && masteryId == _Mastery2) {
            SetFormFromReturn(_PreSet2, _Mastery2)
        }
    }

}

function AddSkillLevel(masteryId, button, skillLevel) {
    if (button !== 2 && !skillLevel) {
        if ((parseInt(_SkillLevel[masteryId]) + 1) <= 32) {
            _SkillLevel[masteryId]++
            _TotalPoints = _TotalPoints - 1
        }
    } else if (skillLevel) { // we are directly setting the skill level by clicking the bar
        for (let x = 0; x < (Mastery[masteryId].Skills.length); x++) {
            if (Mastery[masteryId].Skills[x].min_points >= skillLevel && UserSkills[masteryId].SkillLevel[x] > 0) {
                return false;
            }
        }
        _TotalPoints = _TotalPoints + _SkillLevel[masteryId] - skillLevel
        _SkillLevel[masteryId] = skillLevel; // set this to the defined skill level
    } else {
        // check to make sure there's no spells in use higher than the current skill level
        for (let x = 0; x < (Mastery[masteryId].Skills.length); x++) {
            if (Mastery[masteryId].Skills[x].min_points >= _SkillLevel[masteryId] && UserSkills[masteryId].SkillLevel[x] > 0) {
                return false;
            }
        }

        if (_SkillLevel[masteryId] - 1 >= 0) {
            _SkillLevel[masteryId]--
            _TotalPoints = _TotalPoints + 1
        }
    }
    UpdateSkillStats(masteryId)
    UpdateSkillBar(masteryId)
    if (!skillLevel) DrawSkill(masteryId)
}

function UpdateSkillStats(masteryId) {
    for (let x = 0; x < Mastery.length; x++) {
        if (document.getElementById("pointsRemaining_" + x)) {
            const value = parseInt(_TotalPoints) + parseInt(GetDropDownValue('skillAdjustment'))
            let UpdateText = "Points Left = " + value.toString();
            let CharLevel = Math.floor((222 - parseInt(GetDropDownValue('skillAdjustment')) - _TotalPoints) / 3) + 1
            if (CharLevel < 0) CharLevel = 0;
            if (CharLevel > 75) CharLevel = 75;
            UpdateText = UpdateText + " - Estimated Character Level: " + CharLevel
            document.getElementById("pointsRemaining_" + x).innerHTML = UpdateText;
        }

        let TotalPoints = 0
        if (UserSkills[x]) {
            for (let y = 0; y < UserSkills[x].SkillLevel.length; y++) {
                if (UserSkills[x].SkillLevel[y]) {
                    TotalPoints = TotalPoints + UserSkills[x].SkillLevel[y]
                }
            }
        }
        if (document.getElementById("masteryPoints_" + x)) {
            let UpdateText = "Skill Points = " + _SkillLevel[x]
            UpdateText = UpdateText + " - Mastery Points Spent = " + TotalPoints.toString();
            UpdateText = UpdateText + " - Total in this Mastery = " + (parseInt(_SkillLevel[x]) + TotalPoints).toString()
            document.getElementById("masteryPoints_" + x).innerHTML = UpdateText;
        }

    }
    UpdateLinkBack()
}

function UpdateSkillBar(masteryId) {

    if (document.getElementById("b1pt_" + masteryId) === null) {
        return;
    }

    if (_SkillLevel[masteryId] >= 1) {
        document.getElementById("b1pt_" + masteryId).style.background = "yellow"
    } else {
        document.getElementById("b1pt_" + masteryId).style.background = "black"
    }
    if (_SkillLevel[masteryId] >= 4) {
        document.getElementById("b4pt_" + masteryId).style.background = "yellow"
    } else {
        document.getElementById("b4pt_" + masteryId).style.background = "black"
    }
    if (_SkillLevel[masteryId] >= 10) {
        document.getElementById("b10pt_" + masteryId).style.background = "yellow"
    } else {
        document.getElementById("b10pt_" + masteryId).style.background = "black"
    }
    if (_SkillLevel[masteryId] >= 16) {
        document.getElementById("b16pt_" + masteryId).style.background = "yellow"
    } else {
        document.getElementById("b16pt_" + masteryId).style.background = "black"
    }
    if (_SkillLevel[masteryId] >= 24) {
        document.getElementById("b24pt_" + masteryId).style.background = "yellow"
    } else {
        document.getElementById("b24pt_" + masteryId).style.background = "black"
    }
    if (_SkillLevel[masteryId] >= 32) {
        document.getElementById("b32pt_" + masteryId).style.background = "yellow"
    } else {
        document.getElementById("b32pt_" + masteryId).style.background = "black"
    }

    UpdatePlayerBaseAttributes(masteryId)
}

function UpdatePlayerBaseAttributes(masteryId) {
    if (AttributesBase[0]) {
        document.getElementById("health").innerHTML = AttributesBase[0].health //+ Attributes[_SkillLevel[masteryId]].health;
        document.getElementById("energy").innerHTML = AttributesBase[0].energy //+ Attributes[_SkillLevel[masteryId]].energy;
        document.getElementById("str").innerHTML = AttributesBase[0].str //+ Attributes[_SkillLevel[masteryId]].str;
        document.getElementById("dex").innerHTML = AttributesBase[0].dex //+ Attributes[_SkillLevel[masteryId]].dex;
        document.getElementById("int").innerHTML = AttributesBase[0].inte //+ Attributes[_SkillLevel[masteryId]].int;

        AppendMasteryAttributes(_Mastery1)
        AppendMasteryAttributes(_Mastery2)
    }
}

function AppendMasteryAttributes(masteryId) {
    if (_SkillLevel[masteryId] > 0) {
        document.getElementById("health").innerHTML = parseInt(document.getElementById("health").innerHTML) + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].health;
        document.getElementById("energy").innerHTML = parseInt(document.getElementById("energy").innerHTML) + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].energy;
        document.getElementById("str").innerHTML = parseInt(document.getElementById("str").innerHTML) + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].str;
        document.getElementById("dex").innerHTML = parseInt(document.getElementById("dex").innerHTML) + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].dex;
        document.getElementById("int").innerHTML = parseInt(document.getElementById("int").innerHTML) + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].inte;
    }
}

function GetSpellText(masteryId, skillId) {
    let rankId = 0
    if (UserSkills[masteryId]) {
        if (isNaN(UserSkills[masteryId].SkillLevel[skillId])) {
            UserSkills[masteryId].SkillLevel[skillId] = 0
        }
        rankId = UserSkills[masteryId].SkillLevel[skillId] // get users current skillrank
    }
    let strHTML = "<div id='spellName'>" + Mastery[masteryId].Skills[skillId].name + "</div></B>"
    strHTML = strHTML + "<div id='spellDesc'>" + Mastery[masteryId].Skills[skillId].desc + "</div><br>"

    // show current rank
    if (rankId > 0) {
        strHTML = strHTML + "<div id='currentRankLevel'>Current Level: " + (rankId) + "</div>"
        strHTML = strHTML + "<div id='currentSpell'>" + Mastery[masteryId].Skills[skillId].spells[rankId].spellInfo.replace(/,/g, "<br>") + "</div><br>"
    }

    // show next rank
    if (Mastery[masteryId].Skills[skillId].spells[rankId + 1]) {
        strHTML = strHTML + "<div id='nextRankLevel'>Next Level: " + (rankId + 1) + "</div>"
        strHTML = strHTML + "<div id='nextSpell'>" + Mastery[masteryId].Skills[skillId].spells[rankId + 1].spellInfo.replace(/,/g, "<br>") + "</div>"
    }


    // check for preReq
    if (Mastery[masteryId].Skills[skillId].preReq >= 0) {
        if (UserSkills[masteryId].SkillLevel[Mastery[masteryId].Skills[skillId].preReq] > 0) {
            strHTML = strHTML + "<br><div id='preReq'>preReq: " + Mastery[masteryId].Skills[Mastery[masteryId].Skills[skillId].preReq].name + "</div>"
        } else {
            strHTML = strHTML + "<br><div id='preReq'><font color=red>preReq: " + Mastery[masteryId].Skills[Mastery[masteryId].Skills[skillId].preReq].name + "</div>"
        }
    }

    return strHTML
}

function DrawSkill(masteryId) {
    const img = document.getElementById("button" + masteryId)

    // create div for text
    if (!document.getElementById("tip")) {
        const divTip = document.createElement("div")
        divTip.setAttribute('id', "tip")
        document.body.appendChild(divTip)
    }
    document.getElementById("tip").style.position = "absolute";
    const divTip = document.getElementById("tip")

    divTip.innerHTML = GetSkillLevelText(masteryId)
    img.style.position = "relative"
    divTip.style.top = (img.offsetTop - divTip.offsetHeight - 20) + "px";
    divTip.style.left = img.height;
}

function GetSkillLevelText(masteryId) {
    let strHTML = "<div id='spellName'>" + Mastery[masteryId].masteryName + " Mastery</div>"

    if (_SkillLevel[masteryId] > 0) {
        strHTML = strHTML + "<div id='currentRankLevel'><br>Current Level: " + _SkillLevel[masteryId] + "</div>"
        strHTML = strHTML + "<div id='currentSpell'>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId]].str > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].str + " Strengh" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId]].inte > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].inte + " Intellect" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId]].dex > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].dex + " Dexterity" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId]].health > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].health + " Health" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId]].energy > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId]].energy + " Energy" + "<br>"
        strHTML = strHTML + "</div>"
    }

    if (_SkillLevel[masteryId] + 1 <= 32) {
        strHTML = strHTML + "<div id='currentRankLevel'><br>Next Level: " + (_SkillLevel[masteryId] + 1) + "</div>"
        strHTML = strHTML + "<div id='nextSpell'>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].str > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].str + " Strengh" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].inte > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].inte + " Intellect" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].dex > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].dex + " Dexterity" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].health > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].health + " Health" + "<br>"
        if (Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].energy > 0) strHTML = strHTML + "+" + Mastery[masteryId].Attributes[_SkillLevel[masteryId] + 1].energy + " Energy" + "<br>"
        strHTML = strHTML + "</div>"

        strHTML = strHTML + "<div id='pressAdd'><br>Left click to add unused skill points. Right click to remove.</div>"

    }

    return strHTML
}

function DrawSpell(masteryId, skillId) {
    const SpellText = GetSpellText(masteryId, skillId)

    // create div for text
    if (!document.getElementById("tip")) {
        const divTip = document.createElement("div")
        divTip.setAttribute('id', "tip")
        document.body.appendChild(divTip)
    }
    document.getElementById("tip").style.position = "absolute";

    let divWidth = document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).offsetWidth / 2
    document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).style.position = "absolute";
    const LeftDiv = document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).offsetLeft + divWidth;
    const TopDiv = document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).offsetTop;
    document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).style.position = "relative";

    const divTip = document.getElementById("tip")

    divTip.innerHTML = SpellText
    divTip.style.left = LeftDiv - 100 //- (divTip.offsetWidth / 2)

    if (TopDiv - (divTip.offsetHeight + 50) <= 0) {
        divTip.style.top = TopDiv + 25
    } else {
        divTip.style.top = TopDiv - (divTip.offsetHeight + 50) +"px"
    }

}

function DrawTip(){
    DrawSpell(this.dataset.mastery*1, this.dataset.spell*1)
}

function KillTip() {
    if (document.getElementById("tip")) {
        const elm = document.getElementById("tip")
        document.body.removeChild(elm)
    }
}

function AddPointNew(event){
    const masteryId = this.dataset.mastery*1
    const skillId = this.dataset.spell*1
    AddPoint(false, event.shiftKey, masteryId, event.button, skillId)
}

function AddPoint(bolCtrl, bolShft, masteryId, button, skillId) {
    let Points = 1;
    if (bolShft) {
        Points = (Mastery[masteryId].Skills[skillId].spells.length - UserSkills[masteryId].SkillLevel[skillId] - 1)
    }

    if (button == 2) {
        RemovePoint(bolCtrl, bolShft, masteryId, skillId)
        return false;
    }

    if (isNaN(UserSkills[masteryId].SkillLevel[skillId])) {
        UserSkills[masteryId].SkillLevel[skillId] = 0
    }

    if (UserSkills[masteryId].SkillLevel[skillId] + Points < Mastery[masteryId].Skills[skillId].spells.length) { // is there another rank?

        if (Mastery[masteryId].Skills[skillId].min_points <= _SkillLevel[masteryId]) { // has the user spent enough points on skill level for this spell?
            const preReq = Mastery[masteryId].Skills[skillId].preReq

            if ((preReq >= 0 && UserSkills[masteryId].SkillLevel[preReq] > 0) || preReq < 0) { // does the user have points in the preReq skill?
                _TotalPoints = _TotalPoints - Points
                UserSkills[masteryId].SkillLevel[skillId] = UserSkills[masteryId].SkillLevel[skillId] + Points
                document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).innerHTML = UserSkills[masteryId].SkillLevel[skillId] + " of " + ((Mastery[masteryId].Skills[skillId].spells.length) - 1)
                UpdateSkillStats(masteryId)
                DrawSpell(masteryId, skillId)
                DrawSpellList()
            }
        }
    }
}

function RemovePoint(bolCtrl, bolShft, masteryId, skillId) {
    if (isNaN(UserSkills[masteryId].SkillLevel[skillId])) {
        UserSkills[masteryId].SkillLevel[skillId] = 0
    }

    let Points = 1;
    if (bolShft) {
        Points = UserSkills[masteryId].SkillLevel[skillId];
    }

    // check to make sure that nothing is using this as a required skill
    for (let x = 0; x < (Mastery[masteryId].Skills.length); x++) {
        if (Mastery[masteryId].Skills[x].preReq == skillId && UserSkills[masteryId].SkillLevel[x] > 0) {
            if (UserSkills[masteryId].SkillLevel[skillId] - Points == 0) { // make sure at least one points is left in this spell
                return false;
            }
        }
    }


    if (UserSkills[masteryId].SkillLevel[skillId] - 1 >= 0) { // is there another rank?
        _TotalPoints = _TotalPoints + Points
        UserSkills[masteryId].SkillLevel[skillId] = UserSkills[masteryId].SkillLevel[skillId] - Points
        document.getElementById("spell_" + masteryId + '_' + (skillId + 1)).innerHTML = UserSkills[masteryId].SkillLevel[skillId] + " of " + ((Mastery[masteryId].Skills[skillId].spells.length) - 1)
        UpdateSkillStats(masteryId)
        DrawSpell(masteryId, skillId)
        DrawSpellList()
    }
}

function DrawSpellList() {
    let SpellList = ""
    let SpellFound = false;

    for (let y = 0; y < Mastery.length; y++) {
        if (Mastery[y]) {
            SpellList = SpellList + "<div id='masteryName'>" + Mastery[y].masteryName + "</div>"
            for (let x = 0; x < (Mastery[y].Skills.length); x++) {
                let spellRank = 0;

                if (UserSkills[y]) {
                    spellRank = UserSkills[y].SkillLevel[x];
                }

                if (Mastery[y].Skills[x].spells[spellRank]) {
                    SpellFound = true;
                    if (document.getElementById("verbose").checked) {
                        SpellList = SpellList + "<hr noshade size=1>"
                    }
                    SpellList = SpellList + "<B>" + Mastery[y].Skills[x].name + "</B>: (Rank: " + UserSkills[y].SkillLevel[x] + " of " + (Mastery[y].Skills[x].spells.length - 1) + ")<br>"
                    if (document.getElementById("verbose").checked) {
                        SpellList = SpellList + Mastery[y].Skills[x].desc + "<br>"
                        SpellList = SpellList + Mastery[y].Skills[x].spells[spellRank].spellInfo + "<br>"
                    }
                }
            }
            SpellList = SpellList + "<br>"
        }
    }


    if (!SpellFound) {
        SpellList = 'None selected'
    }
    document.getElementById("spells").innerHTML = SpellList;

    UpdateLinkBack()

}

function UpdateLinkBack() {
    let HTML = 'https://www.titancalc.com/TitanCalc.html?mastery=' + _MasteryName + '&master1=' + _Mastery1 + '&master2=' + _Mastery2

    let TempM1 = ""
    let SkillLevel1 = 0
    let SkillLevel2 = 0
    if (UserSkills[_Mastery1]) {
        // loop through both masteries and build the vars to return with
        SkillLevel1 = _SkillLevel[_Mastery1]

        for (let x = 0; x <= UserSkills[_Mastery1].SkillLevel.length; x++) {
            //alert(x + '-' + UserSkills[_Mastery1].SkillLevel[x])
            if (UserSkills[_Mastery1].SkillLevel[x]) {
                TempM1 = TempM1 + UserSkills[_Mastery1].SkillLevel[x] + "-"
            } else {
                TempM1 = TempM1 + "0-"
            }
        }
    }

    let TempM2 = ""
    if (UserSkills[_Mastery2]) {
        SkillLevel2 = _SkillLevel[_Mastery2]
        // loop through both masteries and build the vars to return with
        for (let x = 0; x <= UserSkills[_Mastery2].SkillLevel.length; x++) {
            if (UserSkills[_Mastery2].SkillLevel[x])
                TempM2 = TempM2 + UserSkills[_Mastery2].SkillLevel[x] + "-"
            else
                TempM2 = TempM2 + "0-"
        }
    }

    TempM1 = SkillLevel1 + "-" + TempM1
    TempM2 = SkillLevel2 + "-" + TempM2

    TempM1 = TempM1.substring(0, TempM1.length - 1)
    TempM2 = TempM2.substring(0, TempM2.length - 1)

    const RewardPoints = parseInt(GetDropDownValue('skillAdjustment'))

    document.getElementById("linkBack").value = HTML + '&sa=' + RewardPoints + '&m1=' + TempM1 + "&m2=" + TempM2

}

function SetFormFromReturn(string, masteryId) {
    // set the Skill Adjustment drop down
    if (_SA.length > 0) {
        SetDropDownByValue('skillAdjustment', _SA);
    }

    const Elms = string.split("-")
    _TotalPoints = _TotalPoints - Elms[0];
    _SkillLevel[masteryId] = Elms[0];
    UpdateSkillBar(masteryId)

    for (let x = 1; x < Elms.length; x++) {
        UserSkills[masteryId].SkillLevel[x - 1] = parseInt(Elms[x])
        //   _TotalPoints = _TotalPoints - parseInt(Elms[x])
    }

    // set the form
    for (let x = 0; x < (Mastery[masteryId].Skills.length); x++) {

        if (document.getElementById("spell_" + masteryId + '_' + (x + 1))) {
            if (UserSkills[masteryId].SkillLevel[x]) { // fixed bug with links missing last skill
                if (UserSkills[masteryId].SkillLevel[x] <= ((Mastery[masteryId].Skills[x].spells.length) - 1)) {  // we changed mastery data, if there's less spells set it to the max
                    document.getElementById("spell_" + masteryId + '_' + (x + 1)).innerHTML = UserSkills[masteryId].SkillLevel[x] + " of " + ((Mastery[masteryId].Skills[x].spells.length) - 1)
                    _TotalPoints = _TotalPoints - UserSkills[masteryId].SkillLevel[x]
                } else {
                    document.getElementById("spell_" + masteryId + '_' + (x + 1)).innerHTML = ((Mastery[masteryId].Skills[x].spells.length) - 1) + " of " + ((Mastery[masteryId].Skills[x].spells.length) - 1)
                    UserSkills[masteryId].SkillLevel[x] = ((Mastery[masteryId].Skills[x].spells.length) - 1)
                    _TotalPoints = _TotalPoints - ((Mastery[masteryId].Skills[x].spells.length) - 1)
                }
            } else {
                document.getElementById("spell_" + masteryId + '_' + (x + 1)).innerHTML = "0 of " + ((Mastery[masteryId].Skills[x].spells.length) - 1)
            }
        }
    }
    UpdateSkillStats(masteryId)
    DrawSpellList()
}


// disable right click menus
document.oncontextmenu =
    function () {
        return false
    }

function GetDropDownValue(element) {
    // returns the value of the selected dropdown
    const elm = document.getElementById(element)
    return elm.options[elm.selectedIndex].value
}

function SetDropDownByValue(t, value) {
    const elm = document.getElementById(t)
    for (let i = 0; i < elm.options.length; i++) {
        if (elm.options[i].value == value) {
            elm.selectedIndex = i;
        }
    }
}

window.SetUserSkills = SetUserSkills;
window.AddSkillLevel = AddSkillLevel;
window.UpdateSkillStats = UpdateSkillStats;
window.UpdateSkillBar = UpdateSkillBar;
window.UpdatePlayerBaseAttributes = UpdatePlayerBaseAttributes;
window.AppendMasteryAttributes = AppendMasteryAttributes;
window.GetSpellText = GetSpellText;
window.DrawSkill = DrawSkill;
window.GetSkillLevelText = GetSkillLevelText;
window.DrawSpell = DrawSpell;
window.KillTip = KillTip;
window.AddPoint = AddPoint;
window.RemovePoint = RemovePoint;
window.DrawSpellList = DrawSpellList;
window.UpdateLinkBack = UpdateLinkBack;
window.SetFormFromReturn = SetFormFromReturn;
window.GetDropDownValue = GetDropDownValue;
window.SetDropDownByValue = SetDropDownByValue;
window.SetPage = SetPage;
