let fish;
let snake;
let chain;
let animal;
let driftPoint;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // let origin = createVector(width / 2, height / 2);
    fish = new Fish(createVector(width / 2, height / 2), 12, 64, PI / 8);
    // snake = new Snake(createVector(width / 2, height / 2), 12, 64, PI / 8);
    chain = new Chain(createVector(width / 2, height / 2), 12, 64, PI / 8);
    driftPoint = createVector(random(width), random(height));

    animal = 0;
    setInterval(triggerFunction, 4000);
}

function triggerFunction() {
    driftPoint.x = random(0, width); // Adjust these values as needed
    driftPoint.y = random(0, height);
    // driftPoint.x = constrain(driftPoint.x, 0, width); // Keep the point within canvas
    // driftPoint.y = constrain(driftPoint.y, 0, height);
}

function draw() {
    background(200);
    mouseVector = createVector(mouseX, mouseY);
    // driftPoint.x += random(-25, 25); // Adjust these values as needed
    // driftPoint.y += random(-25, 25);
    // driftPoint.x = constrain(driftPoint.x, 0, width); // Keep the point within canvas
    // driftPoint.y = constrain(driftPoint.y, 0, height);
    switch (animal) {
        case 0:
            fish.resolve(mouseVector);
            fish.display();
            break;
        case 1:
            chain.resolve(mouseVector);
            chain.display();
            break;
        case 2:
            fish.resolve(driftPoint);
            fish.display();
            // snake.resolve(mouseVector);
            // snake.display();
            break;
        default:
            break;
    }

    // snake.resolve();
    // snake.display();

}


function mouseClicked() {
    updateAnimal();
}

function updateAnimal() {
    animal = (animal + 1) % 3;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}