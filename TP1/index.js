#!/usr/bin/env node
//Part 1
/*import { program } from "commander";

program
  .version("1.0.0")
  .description("My Node CLI")
  .option("-t, --test <type>", "Add your test")
  .action((options) => {
    console.log(`my test is : ${options.test}`);
  });

program.parse(process.argv);

*/

// part2
/*
import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const options = {
 
  test: {
    describe: 'Test option',
    type: 'number',
    message: 'What is your test number?',
    name: 'test',
    demandOption: true,
    default: 1,  
  },
};

const prompt = inquirer.createPromptModule();

const run = async () => {
  const answers = await prompt(Object.values(options).filter(opt => opt.test !== 'test')); 
  Object.entries(answers).forEach(([key, value]) => {
    value && process.argv.push(`--${key}`, value);
  });
  
  const argv = yargs(hideBin(process.argv)).options(options).parse();
  
  console.log(`Hello, ${argv.test}!`);
  if (argv.test === "1") {
    console.log('Test option is set to 1');
  } else {
    console.log('Test option is not set to 1');
  }
};

run();
*/

//Part 3
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import fetch from 'node-fetch';
import { program } from 'commander';

const { textSync } = figlet;

const MAX_HP = 300;

class Player {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.moves = [];
    }

    isAlive() {
        return this.hp > 0;
    }
}

async function fetchPokemonMoves(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        if (!response.ok) {
            throw new Error(`Could not fetch Pokémon with ID ${pokemonId}: ${response.statusText}`);
        }
        
        const poke = await response.json();
        const moves = poke.moves;

        const filteredMoves = await Promise.all(moves.map(async (moveEntry) => {
            const moveResponse = await fetch(moveEntry.move.url);
            
            if (!moveResponse.ok) {
                throw new Error(`Could not fetch move data from ${moveEntry.move.url}: ${moveResponse.statusText}`);
            }

            const moveData = await moveResponse.json();

            if (moveData.power && moveData.pp > 0) {
                return {
                    name: moveData.name,
                    power: moveData.power,
                    accuracy: moveData.accuracy,
                    pp: moveData.pp,
                };
            }
            return null;
        }));

        return filteredMoves.filter(move => move !== null);

    } catch (error) {
        console.error("Error fetching Pokémon moves:", error.message);
        return [];
    }
}

function calculateDamage(power) {
    return power;
}

async function takeTurn(attacker, defender) {
    if (attacker.moves.length === 0) {
        console.log(`${attacker.name} has no moves available!`);
        return;
    }

    const moveIndex = Math.floor(Math.random() * attacker.moves.length);
    const move = attacker.moves[moveIndex];

    if (move.pp <= 0) {
        console.log(`${attacker.name}'s ${move.name} has no PP left!`);
        return;
    }

    const hitChance = Math.random() * 100;
    if (hitChance <= move.accuracy) {
        console.log(`${attacker.name} used ${move.name}!`);
        const damage = calculateDamage(move.power);
        defender.hp = Math.max(0, defender.hp - damage);
        console.log(`${defender.name} takes ${damage} damage! Remaining HP: ${defender.hp}`);
        move.pp--;
    } else {
        console.log(`${attacker.name}'s ${move.name} missed!`);
    }
}

program
    .name('pokemon-battle')
    .description('A simple Pokémon battle game')
    .action(async () => {
        console.log(chalk.yellow(textSync("Pokemon Battle", { horizontalLayout: "full" })));

        const pokemonChoices = [
            { name: 'Bulbasaur', id: 1 },
            { name: 'Charmander', id: 4 },
            { name: 'Squirtle', id: 7 },
        ];

        const { Pokemon } = await inquirer.prompt([
            {
                type: "list",
                name: "Pokemon",
                message: "Choose Your Pokemon:",
                choices: pokemonChoices.map(pokemon => pokemon.name)
            },
        ]);

        const chosenPokemon = pokemonChoices.find(p => p.name === Pokemon);
        const player = new Player('Player', MAX_HP);
        const bot = new Player('Bot', MAX_HP);

        player.moves = await fetchPokemonMoves(chosenPokemon.id);
        const botPokemonId = pokemonChoices[Math.floor(Math.random() * pokemonChoices.length)].id;
        bot.moves = await fetchPokemonMoves(botPokemonId);

        console.log(`You chose: ${chosenPokemon.name}`);
        console.log(`Bot chose: ${pokemonChoices.find(p => p.id === botPokemonId).name}`);

        while (player.isAlive() && bot.isAlive()) {
            await takeTurn(player, bot);
            if (!bot.isAlive()) {
                console.log(chalk.green("You win!"));
                break;
            }

            await takeTurn(bot, player);
            if (!player.isAlive()) {
                console.log(chalk.red("You lose!"));
                break;
            }
        }
    });

program.parse(process.argv);
