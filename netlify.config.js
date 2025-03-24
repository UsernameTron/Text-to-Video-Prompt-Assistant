module.exports = {
  onBuild: async ({ utils }) => {
    utils.status.show({
      title: 'Installing dependencies',
      summary: 'Ensuring Next.js is installed'
    });
  }
};