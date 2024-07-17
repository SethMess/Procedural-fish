class Helper {
    // Constrain the vector to be at a certain range of the anchor
    static constrainDistance(pos, anchor, constraint) {
        return p5.Vector.add(anchor, p5.Vector.sub(pos, anchor).setMag(constraint));
    }

    // Constrain the angle to be within a certain range of the anchor
    static constrainAngle(angle, anchor, constraint) {
        if (abs(Helper.relativeAngleDiff(angle, anchor)) <= constraint) {
            return Helper.simplifyAngle(angle);
        }

        if (Helper.relativeAngleDiff(angle, anchor) > constraint) {
            return Helper.simplifyAngle(anchor - constraint);
        }

        return Helper.simplifyAngle(anchor + constraint);
    }

    // i.e. How many radians do you need to turn the angle to match the anchor?
    static relativeAngleDiff(angle, anchor) {
        // Since angles are represented by values in [0, 2pi), it's helpful to rotate
        // the coordinate space such that PI is at the anchor. That way we don't have
        // to worry about the "seam" between 0 and 2pi.
        angle = Helper.simplifyAngle(angle + PI - anchor);
        anchor = PI;

        return anchor - angle;
    }

    // Simplify the angle to be in the range [0, 2pi)
    static simplifyAngle(angle) {
        while (angle >= TWO_PI) {
            angle -= TWO_PI;
        }

        while (angle < 0) {
            angle += TWO_PI;
        }

        return angle;
    }
}
