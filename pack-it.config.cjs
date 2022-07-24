module.exports = {
  name: 'pack-it',
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
  },
  zip: {
    destination: 'dist',
    include: ['lib/**/*', 'node_modules/**/*', 'package.json'],
  },
};
