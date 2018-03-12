import util from './util.js';

class DNA {
    constructor(num){

        // The genetic sequence
        this.genes = {
            width: 0,
            heigh: 0,
            posit: '',
            anima: '',
            backg: [],
            trans: 0,
            fsize: 0,
            fcolo: [],
            cleng: 0,
            ctawi: 0,
            ctahe: 0,
            ctabg: [],
            ctafc: []
        };

        this.weights = {
            width: 1,
            heigh: 1,
            posit: 1,
            dirwe: {
                left: 0.2,
                top: 0.6,
                right: 0.5,
                bottom: 0.9
            },
            anima: 1,
            backg: 1,
            trans: 1,
            fsize: 1,
            fcolo: 1,
            cleng: 1,
            ctawi: 1,
            ctahe: 1,
            ctabg: 1,
            ctafc: 1
        };

        this.scores = {
            width: 0,
            heigh: 0,
            posit: 0,
            anima: 0,
            backg: 0,
            trans: 0,
            fsize: 0,
            fcolo: 0,
            cleng: 0,
            ctawi: 0,
            ctahe: 0,
            ctabg: 0,
            ctafc: 0
        };

        this.fitness = 0;

        this.directions = ['top', 'right', 'bottom', 'left'];
        
        // Random DNA generated from characters
        this.genes = this.getRandomGene();

    }

    getRandomGene() {
        const getColor = () => Math.floor(Math.random() * 360);
        const getPercentage = () => Math.floor(Math.random() * 100);

        return {
            width: Math.random() * 100,
            heigh: Math.random() * 100,
            posit: this.directions[Math.floor(Math.random() * 4)],
            anima: 'none',
            backg: [getColor(), getPercentage(), getPercentage()],
            trans: Math.random(),
            fsize: Math.floor(Math.random() * 100),
            fcolo: [getColor(), getPercentage(), getPercentage()],
            cleng: Math.floor(Math.random() * 100),
            ctawi: Math.random() * 100,
            ctahe: Math.random() * 100,
            ctabg: [getColor(), getPercentage(), getPercentage()],
            ctafc: [getColor(), getPercentage(), getPercentage()]
        };
    }

    // Converts character array to a String
    getPhrase() {
        return this.genes;
    }

    // Fitness function (returns floating point % of "correct" characters)
    calcFitness() {
        const getFontScore = (size, max) => {
            if (size > max) {
                const score = 100 - (size - max) * (100 / max);
                return score > 0 ? score : 0;
            } else {
                return size * (100 / max);
            }
        };

        this.scores = {
            width: (this.genes.width * this.weights.width),
            heigh: (this.genes.heigh * this.weights.heigh),
            posit: (100 * this.weights.posit * this.weights.dirwe[this.genes.posit]),
            anima: (this.genes.anima === 'flicker' ? 100 * this.weights.anima : 50 * this.weights.anima),
            backg: (100 - (Math.abs(this.genes.backg[2] - 50) + (50 - (this.genes.backg[1] / 2)))),
            trans: ((1 - this.genes.trans) * 100),
            fsize: (getFontScore(this.genes.fsize, 30)),
            fcolo: (Math.abs(this.genes.backg[2] - this.genes.fcolo[2])),
            cleng: (100 - this.genes.cleng < 0 ? 0 : 100 - this.genes.cleng),
            ctawi: (this.genes.ctawi* this.weights.ctawi),
            ctahe: (this.genes.ctahe* this.weights.ctahe),
            ctabg: (100 - (Math.abs(this.genes.ctabg[2] - 50) + (50 - (this.genes.ctabg[1] / 2)))),
            ctafc: (Math.abs(this.genes.ctabg[2] - this.genes.ctafc[2]))
        };

        for (var score in this.scores) {
            this.fitness = this.fitness + this.scores[score];
        }
    }

    // Cross DNA with partner to produce child
    crossover(partner) {
        
        // Initialise new child
        const child = new DNA();

        if (this.fitness > partner.fitness) {
            child.genes = Object.assign({}, this.genes);
        } else {
            child.genes = Object.assign({}, partner.genes);
        }

        child.calcFitness();
        
        return child;
    }

    // picks a new random character based on a mutation probability
    mutate(mutationRate) {
        const prevCleng = this.genes.backg;

        for (var gene in this.genes) {
            const mutationScale = (Math.random() - 0.5) / 10;

            switch (gene) {
                case 'width':
                    if (Math.random() < mutationRate) this.genes.width = this.genes.width + (this.genes.width * mutationScale);
                    break;
                case 'heigh':
                    if (Math.random() < mutationRate) this.genes.heigh = this.genes.heigh + (this.genes.heigh * mutationScale);
                    break;
                case 'posit':
                    if (Math.random() < mutationRate) this.directions[Math.floor(Math.random() * 4)];
                    break;
                case 'backg':
                    if (Math.random() < mutationRate) this.genes.backg = [this.genes.backg[0] + (this.genes.backg[0] * mutationScale), this.genes.backg[1] + (this.genes.backg[1] * mutationScale), this.genes.backg[2] + (this.genes.backg[2] * mutationScale)];
                    break;
                case 'trans':
                    if (Math.random() < mutationRate) this.trans = Math.random()
                    break;
                case 'fsize':
                    if (Math.random() < mutationRate) this.genes.fsize = this.genes.fsize + (this.genes.fsize * mutationScale);
                    break;
                case 'fcolo':
                    if (Math.random() < mutationRate) this.genes.fcolo = [this.genes.fcolo[0] + (this.genes.fcolo[0] * mutationScale), this.genes.fcolo[1] + (this.genes.fcolo[1] * mutationScale), this.genes.fcolo[2] + (this.genes.fcolo[2] * mutationScale)];
                    break;
                case 'cleng':
                    if (Math.random() < mutationRate) this.genes.cleng = this.genes.cleng + (this.genes.cleng * mutationScale);
                    break;
                case 'ctawi':
                    if (Math.random() < mutationRate) this.genes.ctawi = this.genes.ctawi + (this.genes.ctawi * mutationScale);
                    break;
                case 'ctahe':
                    if (Math.random() < mutationRate) this.genes.ctahe = this.genes.ctahe + (this.genes.ctahe * mutationScale);
                    break;
                case 'ctabg':
                    if (Math.random() < mutationRate)  this.genes.ctabg = [this.genes.ctabg[0] + (this.genes.ctabg[0] * mutationScale), this.genes.ctabg[1] + (this.genes.ctabg[1] * mutationScale), this.genes.ctabg[2] + (this.genes.ctabg[2] * mutationScale)];
                    break;
                case 'ctafc':
                    if (Math.random() < mutationRate)  this.genes.ctafc = [this.genes.ctafc[0] + (this.genes.ctafc[0] * mutationScale), this.genes.ctafc[1] + (this.genes.ctafc[1] * mutationScale), this.genes.ctafc[2] + (this.genes.ctafc[2] * mutationScale)];
                    break;
            }
        }

    }
}

export default DNA;