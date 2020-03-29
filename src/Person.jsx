import canvas, {getDays} from './canvas.config';
import variables from './variables.config';

export default class Person {
    position = {
        x: 0,
        y: 0,
    };
    velocity = {
        x: 0,
        y: 0,
    };
    infected = false;
    immune = false;
    dead = false;
    daysInfected = 0;

    constructor(opts = {}) {
        this.position = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        };

        this.velocity = {
            x: Math.random() * (Math.random() > .5 ? -1 : 1) * variables.velocityModifier,
            y: Math.random() * (Math.random() > .5 ? -1 : 1) * variables.velocityModifier,
        };

        if (typeof opts.infected !== 'undefined') {
            this.infected = opts.infected;
        }
        if (typeof opts.immune !== 'undefined') {
            this.immune = opts.immune;
        }
        if (typeof opts.dead !== 'undefined') {
            this.dead = opts.dead;
        }
    }

    updateVirus = () => {
        if (!this.infected) {
            return;
        }
        this.daysInfected = this.daysInfected + 1;
        if (getDays(this.daysInfected) > variables.infectionLength) {
            this.infected = false;
            this.immune = true;
        }
    };

    updatePosition = () => {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };

    move = () => {
        this.updatePosition();
        if (this.position.x >= canvas.width || this.position.x <= 0) {
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.position.y >= canvas.height || this.position.y <= 0) {
            this.velocity.y = this.velocity.y * -1;
        }
    };

    draw = (p) => {
        let color = canvas.foregroundColor;
        if (this.infected) {
            color = canvas.infectedColor;
        } else if (this.immune) {
            color = canvas.immuneColor;
        } else if (this.dead) {
            color = canvas.deadColor;
        }

        p.stroke(color);
        p.strokeWeight(canvas.personSize);
        p.point(this.position.x, this.position.y);
    }
}
