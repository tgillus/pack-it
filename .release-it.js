module.exports = {
  git: {
    commitMessage: 'Release v${version}',
    tagAnnotation: 'Release v${version}',
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
  },
};
