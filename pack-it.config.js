const stages = {
  development: {
    defaultBranch: 'main',
  },
};
const stageName = process.env.STAGE || 'development';
const branch = process.env.BRANCH || stages[stageName].defaultBranch;

module.exports = {
  projectName: 'pack-it',
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
    branch,
  },
  includeDirs: ['lib', 'node_modules'],
};
