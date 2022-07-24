import figlet from 'figlet';

export const title = () => {
  // eslint-disable-next-line no-console
  console.log(
    figlet.textSync('Feast!', {
      font: 'Standard',
      horizontalLayout: 'full',
    })
  );
};
