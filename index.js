//cas =0, eng = 1, chem = 2, esp = 3, frn = 4, art = 5, mth = 6, ecn = 7, phy = 8, bio = 9, his = A, lun = B, asm = C, spr = D, tok = E, wrc = F
let rooms = {0x0: 232, 0x1: 233, 0x2: 137, 0x3: [204, null, 232, 238, 137, null, 238, null], 0x6: [137, 137, 133, 120, 238, 120, null, 120], 0x7: 232, 0x8: 120, 0xB: 133, 0xC: "HR", 0xD: "Commons", 0xE: [116, null, null, null, 232, null, 232, null], 0xF: [null, 233, 233, null, null, null, null, 137]};
let schedule = {1: 0x7CE2B3D6, 2: 0x6C81BD2F, 3: 0x2C76B3FF, 4: 0x8C3DB166, 5: 0xDC63B72E, 6: 0xDCD8B611, 7: 0xEC07B238, 8: 0x1CF6B8D7};
let times = [495, 570, 595, 635, 715, 765, 840, 885, 930];
let combinedTimes = [495, 570, 595, 635, 715, 765, 840, 930];
let WedTimes = [560, 620, 665, 730, 780, 840, 885, 930];
let CombinedWedTimes = [560, 620, 665, 730, 780, 840, 930];
let date = new Date();
let day = 1;
let combinedPeriod = false;
let wed = false;
let tue = false;

let killme = "";

function save() {
    killme = $("#sInput").val();
    killmeagain = killme.split("🡑");

    let killmeshed = String(killmeagain[0]);
    let killmerooms = String(killmeagain[1])

    document.cookie = killmeshed;
    document.cookie = killmerooms;



    schedule = JSON.parse(killmeshed.substring(9, 66));
    rooms = JSON.parse(killmerooms.slice(0, -22).slice(6));
}

function init() {
    

    let AHHAHAHAHAHAHA = document.cookie;
    let HAHAhwehhaeh = AHHAHAHAHAHAHA.split(";");

    let heahshsahSHED = String(HAHAhwehhaeh[0]).substring(9, 66);
    let hehehehRoms = String(HAHAhwehhaeh[1]).slice(7);

    let tryToAdd = JSON.parse(heahshsahSHED)

    if (tryToAdd !== "") {
        schedule = JSON.parse(heahshsahSHED);

        console.log(hehehehRoms)

        rooms = JSON.parse(hehehehRoms);
    } else {
        schedule = {1: 0x7CE2B3D6, 2: 0x6C81BD2F, 3: 0x2C76B3FF, 4: 0x8C3DB166, 5: 0xDC63B72E, 6: 0xDCD8B611, 7: 0xEC07B238, 8: 0x1CF6B8D7};
        rooms = {0x0: 232, 0x1: 233, 0x2: 137, 0x3: [204, null, 232, 238, 137, null, 238, null], 0x6: [137, 137, 133, 120, 238, 120, null, 120], 0x7: 232, 0x8: 120, 0xB: 133, 0xC: "HR", 0xD: "Commons", 0xE: [116, null, null, null, 232, null, 232, null], 0xF: [null, 233, 233, null, null, null, null, 137]};
    }

    combinedPeriod = createDay(schedule, rooms, day, checkWednesday());

    updateTime();
    setInterval(updateTime, 60000);
}

function changeDay(increment) {
    clearInterval();
    day += increment;

    switch (day) {
        case 9:
            day = 1;
            break;
        case 0:
            day = 8;
            break;
        default:
            day = day; 
    }
    
    $("h1#dateText").text("Today is: Day " + String(day));
    $("div#tt6").remove();
    if (checkWednesday() !== "w") {
        $("section#times").append('<div id="tt6" class="timeText"><h4>2:05 - 2:45</h4></div>');
        $("section#times").append('<div id="tt7" class="timeText"><h4>2:50 - 3:30</h4></div>');
    } else {
        $("section#times").append('<div id="tt6" class="timeText"><h4 id="ttt6">2:05 - 2:45</h4></div>');
    }
    
    combinedPeriod = createDay(schedule, rooms, day, checkWednesday());

    updateTime();
    setInterval(updateTime, 60000);
}

let vw = $(window).width();
let arrowPositions = [-571.2, -411.2, -251.2, -91.2, 68.2, 228.2, 388.2, 548.2]; //471.2
let index = null;
function updateTime() {
    let wPlace = wed;
    let tPlace = tue;
    let cW = checkWednesday();
    if (cW === "w" && wPlace !== wed) {
        combinedPeriod = createDay(schedule, rooms, day, cW);
    } else if (cW === "t" && tPlace !== tue) {
        combinedPeriod = createDay(schedule, rooms, day, cW);
    }
    if (cW === "" || cW === "t") {
        arrowPositions = [-571.2, -411.2, -251.2, -91.2, 68.2, 228.2, 388.2, 548.2]; //471.2
    } else {
        arrowPositions = [-495.2, -335.2, -175.2, -15.2, 144.2, 304.2, 464.2]; //384.2
    }
    
    let timeText = "";

    let theDate = String(new Date());
    let hourTime = theDate.substring(16, 18);
    let minuteTime = theDate.substring(19, 21);
    let currentTime = Number(hourTime) * 60 + Number(minuteTime);

    let afterSchool = true;
    if (checkWednesday() !== "w") {
        if (!combinedPeriod) {
            for (let i = 0; i < times.length; i++) {
                if (currentTime < times[i]) {
                    if (i !== 0) {
                        timeText = String(times[i] - currentTime) + " minutes left in " + currentPeriod(schedule, i - 1);
                        afterSchool = false;
                        index = i - 1;
                        break;
                    } else {
                        timeText = String(times[0] - currentTime) + " minutes until school";
                        afterSchool = false;
                        break;
                    }
                }
            }
        } else {
            for (let i = 0; i < combinedTimes.length; i++) {
                if (currentTime < combinedTimes[i]) {
                    if (i !== 0) {
                        timeText = String(combinedTimes[i] - currentTime) + " minutes left in " + currentPeriod(schedule, i - 1);
                        afterSchool = false;
                        index = i - 1;
                        break;
                    } else {
                        timeText = String(combinedTimes[0] - currentTime) + " minutes until school";
                        afterSchool = false;
                        break;
                    }
                }
            }
        }
        
    } else {
        if (!combinedPeriod) {
            for (let i = 0; i < WedTimes.length; i++) {
                if (currentTime < WedTimes[i]) {
                    if (i !== 0) {
                        timeText = String(WedTimes[i] - currentTime) + " minutes left in " + currentPeriod(schedule, i - 1);
                        afterSchool = false;
                        index = i - 1;
                        break;
                    } else {
                        timeText = String(WedTimes[0] - currentTime) + " minutes until school";
                        afterSchool = false;
                        break;
                    }
                }
            }
        } else {
            for (let i = 0; i < CombinedWedTimes.length; i++) {
                if (currentTime < CombinedWedTimes[i]) {
                    if (i !== 0) {
                        timeText = String(CombinedWedTimes[i] - currentTime) + " minutes left in " + currentPeriod(schedule, i - 1);
                        afterSchool = false;
                        index = i - 1;
                        break;
                    } else {
                        timeText = String(CombinedWedTimes[0] - currentTime) + " minutes until school";
                        afterSchool = false;
                        break;
                    }
                }
            }
        }
        
    }
    
    if (afterSchool) {
        timeText = "School is over!";
    }

    if (combinedPeriod) {
        if (checkWednesday() !== "w") {
            arrowPositions[6] = 471.2;
            arrowPositions[7] = 471.2;
        } else {
            arrowPositions[5] = 384.2;
            arrowPositions[6] = 384.2;
        }
        
    }

    if (index !== null) {
        $("div#currentPeriod").css("visibility", "visible");
        $("div#currentPeriod").css("left", String((vw / 2) + arrowPositions[index]) + "px");
    } else {
        $("div#currentPeriod").css("visibility", "hidden");
    }
    arrowPositions = [-571.2, -411.2, -251.2, -91.2, 68.2, 228.2, 388.2, 548.2];

    $("h6#timeLeft").html(timeText);
}

function checkWednesday() {
    let checkWed = String(new Date());
    let returnVal = "";
    if (checkWed.substring(0, 3) === "Wed") {
        returnVal = "w";
        wed = true;
        tue = false;
    } else if (checkWed.substring(0, 3) === "Tue") {
        returnVal = "t";
        wed = false;
        tue = true;
    }

    if (wed) {
        newTimes = ["9:20-10:20", "10:25-11:05", "11:10-12:10", "12:10-1:00", "1:00-2:00", "2:05-2:45", "2:50-3:30"];
        for (let i = 0; i < 7; i++) {
            $("h4#ttt" + String(i)).html(newTimes[i]);
        }
    }

    return returnVal
}
