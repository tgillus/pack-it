module.exports = {
  name: 'feast',
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
  },
  zip: {
    destination: 'dist',
    include: ['lib/**/*', 'node_modules/**/*', 'package.json'],
  },
};
