class Fish {
    constructor(origin) {
        // 12 segments, first 10 for body, last 2 for caudal fin
        this.spine = new Chain(origin, 12, 64, PI / 8);
        this.bodyColor = color(58, 124, 165);
        this.finColor = color(129, 195, 215);
        this.bodyWidth = [68, 81, 84, 83, 77, 64, 51, 38, 32, 19];
    }

    resolve(pos) {
        let headPos = this.spine.joints[0];
        // let mousePos = createVector(mouseX, mouseY);
        let targetPos;
        if (headPos.dist(pos) < 16) {
            targetPos = pos;
        } else {
            targetPos = p5.Vector.add(headPos, p5.Vector.sub(pos, headPos).setMag(16));
        }
        this.spine.resolve(targetPos);
    }

    display() {
        strokeWeight(4);
        stroke(255);
        fill(this.finColor);

        let j = this.spine.joints;
        let a = this.spine.angles;

        let headToMid1 = this.relativeAngleDiff(a[0], a[6]);
        let headToMid2 = this.relativeAngleDiff(a[0], a[7]);
        let headToTail = headToMid1 + this.relativeAngleDiff(a[6], a[11]);

        // === START PECTORAL FINS ===
        push();
        translate(this.getPosX(3, PI / 3, 0), this.getPosY(3, PI / 3, 0));
        rotate(a[2] - PI / 4);
        ellipse(0, 0, 160, 64); // Right
        pop();
        push();
        translate(this.getPosX(3, -PI / 3, 0), this.getPosY(3, -PI / 3, 0));
        rotate(a[2] + PI / 4);
        ellipse(0, 0, 160, 64); // Left
        pop();
        // === END PECTORAL FINS ===

        // === START VENTRAL FINS ===
        push();
        translate(this.getPosX(7, PI / 2, 0), this.getPosY(7, PI / 2, 0));
        rotate(a[6] - PI / 4);
        ellipse(0, 0, 96, 32); // Right
        pop();
        push();
        translate(this.getPosX(7, -PI / 2, 0), this.getPosY(7, -PI / 2, 0));
        rotate(a[6] + PI / 4);
        ellipse(0, 0, 96, 32); // Left
        pop();
        // === END VENTRAL FINS ===

        // === START CAUDAL FINS ===
        beginShape();
        for (let i = 8; i < 12; i++) {
            let tailWidth = 1.5 * headToTail * (i - 8) * (i - 8);
            curveVertex(j[i].x + cos(a[i] - PI / 2) * tailWidth, j[i].y + sin(a[i] - PI / 2) * tailWidth);
        }
        for (let i = 11; i >= 8; i--) {
            let tailWidth = max(-13, min(13, headToTail * 6));
            curveVertex(j[i].x + cos(a[i] + PI / 2) * tailWidth, j[i].y + sin(a[i] + PI / 2) * tailWidth);
        }
        endShape(CLOSE);
        // === END CAUDAL FINS ===

        fill(this.bodyColor);
        beginShape();
        for (let i = 0; i < 10; i++) {
            curveVertex(this.getPosX(i, PI / 2, 0), this.getPosY(i, PI / 2, 0));
        }
        curveVertex(this.getPosX(9, PI, 0), this.getPosY(9, PI, 0));
        for (let i = 9; i >= 0; i--) {
            curveVertex(this.getPosX(i, -PI / 2, 0), this.getPosY(i, -PI / 2, 0));
        }
        curveVertex(this.getPosX(0, -PI / 6, 0), this.getPosY(0, -PI / 6, 0));
        curveVertex(this.getPosX(0, 0, 4), this.getPosY(0, 0, 4));
        curveVertex(this.getPosX(0, PI / 6, 0), this.getPosY(0, PI / 6, 0));
        // curveVertex(this.getPosX(0, PI / 2, 0), this.getPosY(0, PI / 2, 0));
        // curveVertex(this.getPosX(1, PI / 2, 0), this.getPosY(1, PI / 2, 0));
        // curveVertex(this.getPosX(2, PI / 2, 0), this.getPosY(2, PI / 2, 0));
        endShape(CLOSE);
        // === END BODY ===

        fill(this.finColor);
        beginShape();
        vertex(j[4].x, j[4].y);
        bezierVertex(j[5].x, j[5].y, j[6].x, j[6].y, j[7].x, j[7].y);
        bezierVertex(
            j[6].x + cos(a[6] + PI / 2) * headToMid2 * 16,
            j[6].y + sin(a[6] + PI / 2) * headToMid2 * 16,
            j[5].x + cos(a[5] + PI / 2) * headToMid1 * 16,
            j[5].y + sin(a[5] + PI / 2) * headToMid1 * 16,
            j[4].x, j[4].y
        );
        endShape();
        // === END DORSAL FIN ===

        fill(255);
        ellipse(this.getPosX(0, PI / 2, -18), this.getPosY(0, PI / 2, -18), 24, 24);
        ellipse(this.getPosX(0, -PI / 2, -18), this.getPosY(0, -PI / 2, -18), 24, 24);
        // === END EYES ===
    }

    debugDisplay() {
        this.spine.display();
    }

    getPosX(i, angleOffset, lengthOffset) {
        return this.spine.joints[i].x + cos(this.spine.angles[i] + angleOffset) * (this.bodyWidth[i] + lengthOffset);
    }

    getPosY(i, angleOffset, lengthOffset) {
        return this.spine.joints[i].y + sin(this.spine.angles[i] + angleOffset) * (this.bodyWidth[i] + lengthOffset);
    }

    relativeAngleDiff(angle1, angle2) {
        let diff = angle2 - angle1;
        while (diff < -PI) diff += TWO_PI;
        while (diff > PI) diff -= TWO_PI;
        return diff;
    }
}
