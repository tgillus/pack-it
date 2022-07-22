import ora from 'ora';

export class Spinner {
  private readonly spinner = ora();

  start(text: string) {
    this.spinner.start(text);
  }

  succeed(text: string) {
    this.spinner.succeed(text);
  }
}

// const spinner = ora('Loading unicorns').start();

// setTimeout(() => {
//   spinner.succeed('Loading unicorn');
// }, 1000);

// setTimeout(() => {
//   spinner.color = 'yellow';
//   spinner.start('Loading rainbows');
// }, 2000);

// setTimeout(() => {
//   spinner.succeed('Loading rainbows');
// }, 3000);
