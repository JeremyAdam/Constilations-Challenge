let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;
// Event Listeners & Handlers
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("keydown", keydown);
// Star Array
let stars = [1];
// Ohter Elements
let mouseX, mouseY;
// Main Looping Function
requestAnimationFrame(main);
function main () {
    // Fill Canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height, "fill");
    for (let i = 0; i < stars.length - 1; i++) {
        line(stars[i].x, stars[i].y, stars[i + 1].x, stars[i + 1].y, "white");
        drawStar(stars[i]);
        drawStar(stars[i + 1]);
    }
    requestAnimationFrame(main);
}
function drawNewStar () {
    return {
        x: mouseX,
        y: mouseY,
        r: 6,
        color: "white"
    }
}
function drawStar (star) {
    circle(star.x, star.y, star.r, "fill", "white");
}
function keydown (event) {
    if (event.keyCode == 37) { // Left Arrow
        // Remove Star
        stars.pop();
    }
}
function mousedownHandler() {
    stars.push(drawNewStar());
}

// Event Listeners & Handlers
function mousemoveHandler(event) {
    // Get Rectangle Info About Canvas Location
    let cnvRect = cnv.getBoundingClientRect(); 
    // Calc Mouse Coordinates Using Mouse Event and Canvas Location Info
    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);
}
// Function For Drawing Circles
function circle(x, y, r , mode, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (mode === "fill") {
        ctx.fill();
        ctx.fillStyle = color;
    } else if (mode === "stroke") {
        ctx.stroke();
        ctx.strokeStyle = color;
    }
}
function line(x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Endpoint 1
    ctx.lineTo(x2, y2); // Endpoint 2
    ctx.stroke();
}