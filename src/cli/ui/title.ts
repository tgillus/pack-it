import figlet from 'figlet';

export const title = () => {
  // eslint-disable-next-line no-console
  console.log(
    figlet.textSync('Pack It!', {
      font: 'Standard',
      horizontalLayout: 'full',
    })
  );
};
