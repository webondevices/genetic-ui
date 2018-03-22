import DNA from './DNA.js';
import util from './util.js';

class Population {
    constructor(m, populationSize) {
        this.mutationRate = m;
        this.generations = 0;
        this.matingPool = [];
        this.best = {};
        this.lowestFitness = 0;

        // Fill population with DNA instances
        this.population = Array(populationSize).fill(null);
        this.population = this.population.map(() => new DNA());

        this.calcPopulationFitness();
    }

    // Calculate fitness value for every member of the population
    calcPopulationFitness() {
        this.population.forEach(member => {
            member.calcFitness();
            // console.log(member.fitness);
        });
    }

    // Generate a weighed mating pool
    naturalSelection() {
        // let maxFitness = 0;
        this.matingPool = [];

        // Find the highest fitness value in the population
        // this.population.forEach(member => {
        //     maxFitness = member.fitness > maxFitness ? member.fitness : maxFitness;
        // });

        // Based on fitness, each member is added to the mating pool a weighed number of times
        // higher fitness = more instance in pool = more likely to be picked as a parent
        // lower fitness = less instance in pool = less likely to be picked as a parent
        // this.population.forEach(member => {
        //     const fitness = util.map(member.fitness, 0, maxFitness, 0, 1);
            
        //     // Arbitrary multiplier
        //     // let n = Math.floor(fitness * 50);
        //     let n = Math.floor(fitness / 100);

        //     for ( ; n >= 0; n--) {
        //         // console.log('member.fitness ', member.fitness, ' > cutoff ', maxFitness * 0.75);
        //         if (member.fitness > this.lowestFitness * 1.25) {
        //             // console.log('IN')
        //             this.matingPool.push(member);
        //         }
        //     }
        // });

        this.matingPool = this.population;
        this.removeLowestFitnessFromPool();
    }

    // Create a new generation
    generate() {

        // this.population.forEach((member, i) => {

        //     // Random index for the pool
        //     const a = util.randomInt(0, this.matingPool.length - 1);
        //     const b = util.randomInt(0, this.matingPool.length - 1);

        //     // Picking a random item from the pool
        //     const partnerA = this.matingPool[a];
        //     const partnerB = this.matingPool[b];

        //     // Generating a child with DNA crossover
        //     const child = partnerA.crossover(partnerB);

        //     // Mutate DNA for diversity
        //     // child.mutate(this.mutationRate);

        //     // Add child to the population
        //     this.population[i] = child;

        //     // console.log('New child: ', child.fitness, ' from A: ', partnerA.fitness, ' and B: ', partnerB.fitness);

        // });

        this.generations += 1;
    }


    getBest() {
        return this.best;
    }

    getLowest() {
        let lowest = Number.POSITIVE_INFINITY;
        let index = 0;

        this.population.forEach((member, i) => {
            if (member.fitness < lowest) {
                index = i;
                lowest = member.fitness;
            }
        });

        this.lowest = lowest;

        return this.population[index].getPhrase();
    }

    getLowestFitness() {
        let lowest = Number.POSITIVE_INFINITY;
        let index = 0;

        this.population.forEach((member, i) => {
            if (member.fitness < lowest) {
                index = i;
                lowest = member.fitness;
            }
        });

        this.lowestFitness = lowest;

        return this.population[index].fitness;
    }

    removeLowestFitnessFromPool() {
        let lowest = Number.POSITIVE_INFINITY;
        let index = 0;

        this.matingPool.forEach((member, i) => {
            if (member.fitness < lowest) {
                index = i;
                lowest = member.fitness;
            }
        });

        this.matingPool.splice(index, 1);
    }

    getRandom() {
        return this.population[Math.floor(Math.random() * this.population.length)].getPhrase();
    }

    evaluate() {
        let worldrecord = 0;
        let index = 0;

        // Find the fittest member of the population
        this.population.forEach((member, i) => {
            if (member.fitness > worldrecord) {
                index = i;
                worldrecord = member.fitness;
            }
        });

        // Get best result so far
        this.best = this.population[index].getPhrase();

    }

    getGenerations() {
        return this.generations;
    }

    // Get average fitness for the population
    getAverageFitness() {
        let total = 0;

        this.population.forEach(member => {
            total += member.fitness;
        });

        return total / this.population.length;
    }
}

export default Population;