module.exports = {
  prompts: {
    client: {
      message: 'What is the client of this project?',
      default: 'Ginetta'
    },
    project: {
      message: 'What is the project name',
      default: 'Portfolio'
    },
    hostLive: {
      type: 'confirm',
      message: 'Do you want to host it\'s live/production instance?',
      default: false
    },
    liveURL: {
      type: 'input',
      message: 'Do you want to host it\'s live/production instance?',
      default: 'http://project.client.net',
      when({hostLive}) {
        return hostLive
      }
    }
  },
  showTip: true,
  gitInit: false,
  installDependencies: false,
}
