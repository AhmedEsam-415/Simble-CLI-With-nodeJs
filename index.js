import { Command } from 'commander';
import inquirer from 'inquirer';
import * as fs from 'node:fs';

const program = new Command();
const questions = [
  {
    type: 'input',
    name: 'Course Name:',
    message: 'Please enter course title',
  },
  {
    type: 'number',
    name: 'Course price:',
    message: 'Please enter course Price',
  },
];
const filePath = './course.json';

program
  .name('Ahmed Esam Daily Manger')
  .description('CLI to Help My Self')
  .version('1.0.0');

program
  .command('add')
  .alias('a')
  .description('add Course')
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf-8', (err, fileContent) => {
          if (err) {
            console.log('Error', err);
            process.exit();
          }
          console.log('fileContent =>', fileContent);
          const fileContentAnswer = JSON.parse(fileContent);
          fileContentAnswer.push(answers);
          fs.writeFile(
            filePath,
            JSON.stringify(fileContentAnswer),
            'utf-8',
            () => {
              console.log('add courses Done');
            }
          );
        });
      } else {
        fs.writeFile(filePath, JSON.stringify([answers]), 'utf-8', () => {
          console.log('add courses Done');
        });
      }
    });
  });

program
  .command('list')
  .description('list all course')
  .action(() => {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
      if (err) {
        console.log('Error', err);
        process.exit();
      }
      console.table(JSON.parse(fileData));
    });
  });

program.parse(process.argv);
