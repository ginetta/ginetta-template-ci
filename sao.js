module.exports = (options) => {
  const prompts = {
    client: {
      message: 'What is the client of this project?',
      default: ':ginetta:'
    },
    project: {
      message: 'What is the project name',
      default: ':website:'
    },
    hostLive: {
      type: 'confirm',
      message: 'Do you want to host it\'s live/production instance?',
      default: false
    },
    liveUrl: {
      type: 'input',
      message: 'Do you want to host it\'s live/production instance?',
      default: ':http://project.client.net/:',
      when({ hostLive }) {
        return hostLive
      }
    }
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

  if (options.liveUrl) {
    delete prompts.hostLive;
    delete prompts.liveUrl;
    data.hostLive = options.hostLive;
    data.liveUrl = options.liveUrl;
  }

  return {
    prompts,
    data,
    showTip: true,
    gitInit: false,
    installDependencies: false,
  };
}
