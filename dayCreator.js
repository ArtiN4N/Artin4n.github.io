const key = {0x0: "CAS", 0x1: "English", 0x2: "Chemistry", 0x3: "Spanish", 0x4: "French", 0x5: "Art", 0x6: "Math", 0x7: "Economics", 0x8: "Physics", 0x9: "Biology", 0xA: "History", 0xB: "Lunch", 0xC: "Homeroom", 0xD: "Spare", 0xE: "TOK", 0xF: "WC"}
const rooms = {0x0: 232, 0x1: 233, 0x2: 137, 0x3: [204, null, 232, 238, 137, null, 238, null], 0x6: [137, 137, 133, 120, 238, 120, null, 120], 0x7: 232, 0x8: 120, 0xB: 133, 0xC: "HR", 0xD: "Commons", 0xE: [116, null, null, null, 232, null, 232, null], 0xF: [null, 233, 233, null, null, null, null, 137]};

function getHexDigit(hex, n) {
    let number = hex.toString(16);
    let digit = number[n];
    return parseInt(digit, 16);
}

function createDay(schedule, rooms, day, checkWednesday) {
    let periods = 8;
    if (wed) {
        periods = 7;
    }
    
    $("section#thisDay").empty();
    $("section#nextDay").empty();

    let nextDay = day + 1;
    if (nextDay === 9) {
        nextDay = 1;
    }

    let wedShift = 0;
    let nWedShift = 0;

    let leftIndentWed = 0;

    let appended = false;
    let nextAppended = false;
    for (let i = 0; i < 8; i++) {
        let subject = getHexDigit(schedule[day], i + wedShift);
        let nextSubject = getHexDigit(schedule[nextDay], i + nWedShift);

        if (checkWednesday === "w") {
            $("div#tt7").remove();
            leftIndentWed = 76;
            if (subject === 0xC) {
                wedShift = 1;
                subject = getHexDigit(schedule[day], i + wedShift);
            } 
        } else if (checkWednesday === "t") {
            $("div#tt7").css("visibility", "visible");
            leftIndentWed = 0;
            if (nextSubject === 0xC) {
                nWedShift = 1;
                nextSubject = getHexDigit(schedule[nextDay], i + nWedShift);
            } 
        } else {
            leftIndentWed = 0;
            $("div#tt7").css("visibility", "visible");
        }

        let injectionTD = "";
        let injectionND = "";

        if (!appended) {
            let room = rooms[subject];
            let toInject = "";
    
            injectionTD += "<div id='d" + String(i + wedShift) + "' class='subject thisDay'><div id='dt" + String(i + wedShift) + "' class='dText'><h2>" + String(key[subject]) + "</h2>";

            if (typeof room !== typeof []) {
                toInject = "<h2>@ " + String(room) + "</h2></div></div>";
            } else {
                toInject = "<h2>@ " + String(room[day - 1]) + "</h2></div></div>";
            }
            injectionTD += toInject;   
        }
        
        if (!nextAppended) {
            let room = rooms[nextSubject];
            let toInject = "";
            injectionND += "<div id='nd" + String(i + nWedShift) + "' class='subject nextDay'><div id='ndt" + String(i + nWedShift) + "' class='dText'><h3>" + String(key[nextSubject]) + "</h3>";
    
            if (typeof room !== typeof []) {
                toInject = "<h3>@ " + String(room) + "</h3></div></div>";
            } else {
                toInject = "<h3>@ " + String(room[nextDay - 1]) + "</h3></div></div>";
            }
            injectionND += toInject;
        }
        if (!(wedShift === 1 && i === 7)) {
            $("section#thisDay").append(injectionTD);
            $("div#tt" + String(i)).css("left", String(160 * (i) + leftIndentWed) + "px");
            $("div#d" + String(i + wedShift)).css("left", String(160 * (i) + leftIndentWed) + "px");

            $("div#dt" + String((i + wedShift))).css("top", String(($("div#d" + String((i + wedShift))).height() / 2) - ($("div#dt" + String((i + wedShift))).height() / 2)) + "px");
        
        }
        if (!(nWedShift === 1 && i === 7)) {
            $("section#nextDay").append(injectionND);
            $("div#ndt" + String((i + nWedShift))).css("top", String(($("div#nd" + String((i + nWedShift))).height() / 2) - ($("div#ndt" + String((i + nWedShift))).height() / 2)) + "px");

        }

        if (i === 6) {
            if (getHexDigit(schedule[day], 6) == getHexDigit(schedule[day], 7)) {
                $("div#d6").css("width", "310px");
                if (checkWednesday !== "w") {
                    $("div#tt6").remove();
                    $("div#tt7").remove();
                    $("section#times").append('<div id="tt6" class="timeText"><h4>2:05 - 3:30</h4></div>');
                    $("div#tt6").css("left", String(160 * (i + wedShift) + 75 + 2) + "px");
                } else {
                    $("div#d7").remove();
                    $("div#tt5").remove();
                    $("div#tt6").remove();
                    $("section#times").append('<div id="tt5" class="timeText"><h4>2:05 - 3:30</h4></div>');
                    $("div#tt5").css("left", String(160 * (i + wedShift) - 150 - 12) + "px");
                }
                
                appended = true;
            }

            if (getHexDigit(schedule[nextDay], 6) == getHexDigit(schedule[nextDay], 7)) {
                $("div#nd6").css("height", "110px");
                $("div#nd7").remove();
                nextAppended = true;
            }
        }

    }
    return appended;
}

function currentPeriod(schedule, n) {
    let subject = null;
    if (checkWednesday() !== "w") {
        subject = getHexDigit(schedule[day], n);
    } else {
        if (n > 0) {
            subject = getHexDigit(schedule[day], n + 1);
        }
    }
    return String(key[subject]);
}
