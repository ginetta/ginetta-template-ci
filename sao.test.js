const test = require(`ava`)
const { resolve } = require(`path`)
const sao = require(`sao`)
const template = {
  fromPath: resolve(`.`)
}

test(`Circleci has project infos`, t =>
  sao
    .mockPrompt(template, {
      client: `ginetta`,
      project: `website`,
      hostLive: false
    })
    .then(res => {
      const content = res.files['.circleci/config.yml'].contents.toString()
      const clientLine = content.match(/.*P_CLIENT_NAME:.*/g)[0]
      const projectLine = content.match(/.*P_PROJECT_NAME:.*/g)[0]
      const liveUrlLine = content.match(/.*P_LIVE_URL:.*/g)[0]

      t.is(clientLine.indexOf('#-'), -1)
      t.not(clientLine.indexOf(`ginetta`), -1)

      t.is(projectLine.indexOf('#-'), -1)
      t.not(projectLine.indexOf(`website`), -1)

      t.not(liveUrlLine.indexOf('#-'), -1)
    }))

test(`Stores info to lower case`, t =>
  sao
    .mockPrompt(template, {
      client: `Ginetta`,
      project: `Website`,
      hostLive: false
    })
    .then(res => {
      const content = res.files['.circleci/config.yml'].contents.toString()
      const clientLine = content.match(/.*P_CLIENT_NAME:.*/g)[0]
      const projectLine = content.match(/.*P_PROJECT_NAME:.*/g)[0]

      t.not(clientLine.indexOf(`ginetta`), -1)
      t.not(projectLine.indexOf(`website`), -1)
    }))



test(`Stores the live URL info`, t =>
  sao
    .mockPrompt(template, {
      client: `Ginetta`,
      project: `Website`,
      hostLive: true,
      liveURL: `http://www.ginetta.net`
    })
    .then(res => {
      const content = res.files['.circleci/config.yml'].contents.toString()
      const liveUrlLine = content.match(/.*P_LIVE_URL:.*/g)[0]

      t.is(liveUrlLine.indexOf('#-'), -1)
      t.not(liveUrlLine.indexOf(`http://www.ginetta.net`), -1)
    }))