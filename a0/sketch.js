function setup() {
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function drawTimeText() {
    let tSize = 40;
    let tColor = 'rgba(0, 0, 0, .05)';
    let timeText = [hour(), minute(), second()]
        .map(n => String(n).padStart(2, '0'))
        .join(":");
    let tWidth = (windowWidth - textWidth(timeText)) / 2;
    let tHeight = windowHeight / 2 + tSize / 4;
    textSize(tSize);
    fill(tColor);
    text(timeText, tWidth, tHeight);
}

function drawfunnySecond() {
    let pSize = 80;
    let sSize = pSize * 1.5;
    let pColor = 'rgba(0,0,0, .8)';
    let sColor = 'rgba(255,255,255, .8)';
    let mx = mouseX;
    let my = mouseY;
    if (mx <= 0 || mx >= windowWidth) {
        mx = windowWidth / 2;
    }
    if (my <= 0 || my >= windowHeight) {
        my = windowHeight / 2;
    }

    noStroke();
    fill(pColor);
    ellipse(mx, my, pSize);
    fill(sColor);
    let arcStart = -HALF_PI + (my + mx) / 100;
    let sStop = map(second(), 0, 60, arcStart, PI * 2 + arcStart)
    arc(mx, my, sSize, sSize, arcStart, sStop, PIE);
}

function drawBg() {
    let itv = 5;
    let cs = ['#AAF', '#AFA', '#AFF', '#FAA', '#FAF', '#FFA', '#FFF'];
    let ci = Math.round(second() / itv) % cs.length;
    let cc = cs[ci];
    background(cc);
}

function draw() {
    drawBg();
    drawTimeText();
    drawfunnySecond();
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