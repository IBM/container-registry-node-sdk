module.exports = {
  branches: ['main'],
  // Verify conditions - removed @semantic-release/git to prevent pushing files back
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/github',
  ],
  // Prepare steps - removed @semantic-release/git to prevent pushing files back
  prepare: [
    '@semantic-release/changelog',
    { path: '@semantic-release/npm', pkgRoot: 'dist' },
  ],
  // Publish steps
  publish: [
    {
      path: '@semantic-release/npm',
      pkgRoot: 'dist',
      npmPublish: true,
      provenance: true,
    },
    '@semantic-release/github',
  ],
};
