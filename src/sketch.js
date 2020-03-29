import Person from './Person.jsx';
import canvas, { getDays } from './canvas.config';
import variables from './variables.config';

const data = [];

export default function sketch(p) {
    const people = [];
    let render = 0;
    let maxInfected = 0;
    let downloaded = false;
    for (let i = 0; i < variables.numPeople - 1; i++) {
        people.push(new Person());
    }
    people.push(new Person({
        infected: true,
    }));

    p.setup = () => {
        p.createCanvas(canvas.width, canvas.height);
        p.frameRate(canvas.frameRate);
        p.textSize(20);
    };

    p.draw = () => {
        let numInfected = 0;
        let numImmune = 0;
        let numDead = 0;
        let numNotInfected = 0;
        p.background(canvas.backgroundColor);
        for (let i = 0; i < people.length; i++) {
            if (people[i].infected) {
                numInfected++;
                for (let j = 0; j < people.length; j++) {
                    if (i === j) {
                        continue;
                    }
                    if (Math.abs(people[i].position.x - people[j].position.x) < variables.spreadRadius
                        && Math.abs(people[i].position.y - people[j].position.y) < variables.spreadRadius
                        && Math.random() < variables.infectionRate
                    ) {
                        people[j].infected = true;
                    }
                }
            } else if (people[i].immune) {
                numImmune++;
            } else if (people[i].dead) {
                numDead++;
            } else {
                numNotInfected++;
            }
            people[i].move();
            people[i].updateVirus();
            people[i].draw(p);
        }
        if (numInfected > maxInfected) {
            maxInfected = numInfected;
        }
        const day = getDays(render);
        if (render++ % 10 === 0) {
            data.push({
                day,
                render,
                max: maxInfected,
                infected: numInfected,
                immune: numImmune,
                dead: numDead,
                notInfected: numNotInfected,
            });
        }
        p.strokeWeight(0);
        p.text(`${numInfected}/${people.length}`, 5, 20);
        p.text(`Not Infected: ${numNotInfected}\t`, 5, 50);
        p.text(`Maximum: ${maxInfected}`, 5, 80);
        p.text(`Immune: ${numImmune}`, 5, 110);
        p.text(`Dead: ${numDead}`, 5, 140);
        p.text(`Day ${getDays(render)}`, 5, 170);
        p.fill(255);
        if (numInfected === 0 && !downloaded) {
            data.push({
                day,
                render,
                max: maxInfected,
                infected: numInfected,
                immune: numImmune,
                dead: numDead,
                notInfected: numNotInfected,
            });
            const element = document.createElement('a');
            element.style.display = 'none';
            element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify({
                metadata: {
                    variables,
                    canvas,
                },
                data,
            }))}`);
            element.setAttribute('download', 'pandemic_at_the_disco.json');
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            downloaded = true;
        }
    };
}
