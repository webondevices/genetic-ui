import React from 'react';
import Population from './Population.js';

import Element from './Element.jsx';

class World extends React.Component {

    constructor() {
        super();

        this.state = {
            result: {
                width: 0,
                heigh: 0,
                posit: 'left',
                anima: 'none',
                backg: [0,0,0],
                trans: 0,
                fsize: 0,
                fcolo: [0,0,0],
                cleng: 0,
                ctawi: 0,
                ctahe: 0,
                ctabg: [0,0,0],
                ctafc: [0,0,0]
            }
        };

        // Simulation settings
        this.mutationRate = 0.01;
        this.populationSize = 1000;

        this.maxGeneration = 1000;
        this.currentGeneration = 0;

        this.running = true;

        // Initialise population
        this.population = new Population(this.mutationRate, this.populationSize);

        this.draw = this.draw.bind(this);
    }

    componentDidMount(){

        // Start simulation
        this.draw();
    }

    draw() {

        // console.log('Gen: ', this.currentGeneration);
        // console.log('Worst fitness: ', this.population.getLowestFitness(), 'Length: ', this.population.population.length);

        // console.log('Natural selection');
        // Generate weighed mating pool with the fittest members
        this.population.naturalSelection();

        // console.log('Generate pool');
        // Generate new population of children from parents in the mating pool
        this.population.generate();

        // Calculate fitness score of the new population
        this.population.calcPopulationFitness();

        // Find the fittest member of the population and see if target is reached
        this.population.evaluate();

        // If max reached, stop
        if (this.currentGeneration + 1 > this.maxGeneration - 2) this.running = false;

        // Display best result so far
        this.setState({result: this.population.getLowest()});

        this.currentGeneration++;

        // Loop and start new generation
        if (this.running) window.requestAnimationFrame(this.draw);
        // if (this.running) setTimeout(this.draw, 10);
    }

    render() {
        const myStyle = this.running ? {backgroundColor: 'red'} : {backgroundColor: 'green'};

        return (
            <div>
                <div className="generation">No. iterations: <span>{this.currentGeneration}</span></div>
                <div className="population">Variations left: <span>{this.population.population.length}</span></div>
                <div className="score">Lowest fitness score: <span>{Math.floor(this.population.getLowestFitness())}</span></div>
                <Element dna={this.state.result} />
            </div>
        );
    }
}

export default World;