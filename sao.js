module.exports = (options) => {
  const prompts = {
    client: {
      message: 'What is the client of this project?',
    },
    project: {
      message: 'What is the project name',
    },
  };

  const data = {};

  // Remove prompts if we already have some data for them
  if (options.client) {
    delete prompts.client;
    data.client = options.client;
  }
  if (options.project) {
    delete prompts.project;
    data.project = options.project;
  }

  return {
    prompts,
    data,
    showTip: true,
    gitInit: false,
    installDependencies: false,
  };
}
