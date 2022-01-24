function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawTimeText() {
    let tSize = windowWidth / 5;
    let tColor = 'rgba(0, 0, 0, .05)';
    let timeText = [hour(), minute(), second()]
        .map(n => String(n).padStart(2, '0'))
        .join(':');
    let tWidth = (windowWidth - textWidth(timeText)) / 2;
    let tHeight = windowHeight / 2 + tSize / 4;
    // let tHeight = windowHeight - tSize / 2;
    textSize(tSize);
    fill(tColor);
    text(timeText, tWidth, tHeight);
}

function getSsColor(second) {
    let itv = 1;
    let cs = ['#AAF', '#AFA', '#AFF', '#FAA', '#FAF', '#FFA'];
    let ci = Math.round(second / itv) % cs.length;
    return color(cs[ci]);
}

function drawPie(mx, my, pSize, v, maxV, color, start) {
    fill(color);
    let stop = map(v, 0, maxV, start, PI * 2 + start);
    arc(mx, my, pSize, pSize, start, stop, PIE);
}

function drawfunnyClock() {
    let pSize = Math.min(...[windowHeight, windowWidth]) / 8;
    let sSize = pSize * 1.5;
    let mSize = sSize * 1.5;
    let hSize = mSize * 1.5;
    let pColor = 'rgba(0,0,0, .6)';
    let mx = mouseX;
    let my = mouseY;

    let skColor = 'rgba(0,0,0, .6)';
    let skWeight = 4;

    let maxDiameter = hSize + skWeight;
    if (mx < maxDiameter / 2) {
        mx = maxDiameter / 2;
    }

    if (my < maxDiameter / 2) {
        my = maxDiameter / 2;
    }

    if (mx >= windowWidth - maxDiameter / 2) {
        mx = windowWidth - maxDiameter / 2;
    }
    if (my >= windowHeight - maxDiameter / 2) {
        my = windowHeight - maxDiameter / 2;
    }


    stroke(skColor);
    strokeWeight(skWeight);

    let hStart = -HALF_PI + (my + mx) / 100;
    let hColor = getSsColor(second() + 1);
    hColor.setAlpha(200);
    drawPie(mx, my, hSize, hour(), 24, hColor, hStart);

    let mStart = -HALF_PI + (my) / 100;
    let mColor = getSsColor(second() + 2);
    mColor.setAlpha(200);
    drawPie(mx, my, mSize, minute(), 60, mColor, mStart);

    let sStart = -HALF_PI + (mx) / 100;
    let sColor = getSsColor(second() + 3);
    sColor.setAlpha(200);
    drawPie(mx, my, sSize, second(), 60, sColor, sStart);

    strokeWeight(4);
    stroke(pColor);
    let midColor = getSsColor(second() + 4);
    fill(midColor);
    ellipse(mx, my, pSize);
    noStroke();
}

function drawBg() {
    let cc = getSsColor(second());
    background(cc);

    let tbColor = 'rgba(0,0,0, .2)';
    let tfColor = 'rgba(255,255,255, .6)';
    let tStart = -HALF_PI;

    let bsSize = Math.min(...[
        windowHeight / 13 / 1.1,
        windowWidth / 3 / 6 / 1.1
    ]);
    let bGap = bsSize * 1.1;

    let xPad = (windowWidth - bGap * 18) / 2;

    for (let si = 0; si < second(); si++) {
        let px = xPad + bGap * (si % 5 + 1 + 12);
        let py = bGap * (1 + Math.floor(si / 5));
        drawPie(px, py, bsSize, 60, 60, tbColor, tStart);
        drawPie(px, py, bsSize, si + 1, 60, tfColor, tStart);
    }

    for (let mi = 0; mi < minute(); mi++) {
        let px = xPad + bGap * (mi % 5 + 1 + 6);
        let py = bGap * (1 + Math.floor(mi / 5));
        drawPie(px, py, bsSize, 60, 60, tbColor, tStart);
        drawPie(px, py, bsSize, mi + 1, 60, tfColor, tStart);
    }

    for (let hi = 0; hi < hour(); hi++) {
        let px = xPad + bGap * (hi % 5 + 1);
        let py = bGap * (1 + Math.floor(hi / 5));
        drawPie(px, py, bsSize, 60, 60, tbColor, tStart);
        drawPie(px, py, bsSize, hi + 1, 60, tfColor, tStart);
    }
}

let showTimeTxt = false;

function mouseClicked() {
    showTimeTxt = !showTimeTxt;
}

function draw() {
    drawBg();
    drawfunnyClock();
    if (showTimeTxt) drawTimeText();
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