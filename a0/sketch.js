function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawTimeText() {
    let tSize = 60;
    let tColor = 'rgba(0, 0, 0, .05)';
    let timeText = [hour(), minute(), second()]
        .map(n => String(n).padStart(2, '0'))
        .join(':');
    let tWidth = (windowWidth - textWidth(timeText)) / 2;
    let tHeight = windowHeight / 2 + tSize / 4;
    textSize(tSize);
    fill(tColor);
    text(timeText, tWidth, tHeight);
}

function getSsColor(second) {
    let itv = 2;
    let cs = ['#AAF', '#AFA', '#AFF', '#FAA', '#FAF', '#FFA'];
    let ci = Math.round(second / itv) % cs.length;
    return cs[ci];
}

function drawfunnyClock() {
    let pSize = 60;
    let sSize = pSize * 1.5;
    let mSize = sSize * 1.5;
    let hSize = mSize * 1.5;
    let pColor = 'rgba(0,0,0, .6)';
    let sColor = 'rgba(255,255,255, .7)';
    let mx = mouseX;
    let my = mouseY;
    if (mx <= 0 || mx >= windowWidth) {
        mx = windowWidth / 2;
    }
    if (my <= 0 || my >= windowHeight) {
        my = windowHeight / 2;
    }

    noStroke();

    stroke(pColor);
    strokeWeight(4);
    fill(getSsColor(second() + 4));
    let hStart = -HALF_PI + (my + mx) / 100;
    let hStop = map(hour(), 0, 24, hStart, PI * 2 + hStart);
    arc(mx, my, hSize, hSize, hStart, hStop, PIE);

    stroke(pColor);
    strokeWeight(4);
    fill(getSsColor(second() + 3));
    let mStart = -HALF_PI + (my) / 100;
    let mStop = map(minute(), 0, 60, mStart, PI * 2 + mStart);
    arc(mx, my, mSize, mSize, mStart, mStop, PIE);

    strokeWeight(4);
    stroke(pColor);
    fill(getSsColor(second() + 2));
    let sStart = -HALF_PI + (mx) / 100;
    let sStop = map(second(), 0, 60, sStart, PI * 2 + sStart);
    arc(mx, my, sSize, sSize, sStart, sStop, PIE);
    noStroke();

    strokeWeight(4);
    stroke(pColor);
    fill(getSsColor(second() + 1));
    ellipse(mx, my, pSize);
    noStroke();
}

function drawBg() {
    let cc = getSsColor(second());
    background(cc);
}

function draw() {
    drawBg();
    drawTimeText();
    drawfunnyClock();
}

/*
text center maths 😵‍💫😵‍💫😵‍💫
otl = object top left
ow  = object width
sw  = screen width
otl + ow/2 = sw/2
otl = (sw-ow)/2
-----------
   -----   
*/