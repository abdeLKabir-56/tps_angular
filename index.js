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

/*
//Part 3
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fetch = require('node-fetch');
const { program } = require('commander');

program.action(() => {
    console.log(
        chalk.yellow(figlet.textSync("Pokemon", { horizontalLayout: "full" }))
    );

    inquirer
        .prompt([
            {
                type: "list",
                name: "Pokemon",
                message: "Choose Your Pokemon ?",
                choices: ['1', '2', '3']  // Utilisation de chaînes pour correspondre à l'API
            },
        ])
        .then(async (answer) => {
            console.log(`Pokemon chosen: ${answer.Pokemon}!`);
            
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${answer.Pokemon}`);
                
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                const poke = await response.json();
                console.log(poke);
                
            } catch (error) {
                console.log(error);
            }
        });
});

program.parse(process.argv);
*/