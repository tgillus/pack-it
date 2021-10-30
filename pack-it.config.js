const stages = {
  development: {
    defaultBranch: 'develop',
  },
};

const stageName = process.env.STAGE || 'development';
const branch = process.env.BRANCH || stages[stageName].defaultBranch;

module.exports = {
  stage: {
    name: stageName,
  },
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
    branch,
  },
};
