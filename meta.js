const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    version: {
      type: 'string',
      require: false,
      message: 'Project version',
      default: '1.0.0'
    },
    description: {
      when: 'isNotTest',
      type: 'type',
      require: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
    },
    lint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use ESLint to lint your code?',
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
    lodash: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install lodash?\n(Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。)',
    },
    axios: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install axios?'
    },
    config: {
      when: 'isNotTest',
      type: 'string',
      require: true,
      message: '输入配置config的路径',
      // default: 'projectname_config'
      default: this.options
    },
  },
  filters: {
    '.eslintrc.js': 'lint',
    '.eslintignore': 'lint'
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
