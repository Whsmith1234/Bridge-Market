const webpack = require('webpack')

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'ADAMANT Messenger',
        appId: 'im.adamant.msg',
        files: [
          '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme,test,__tests__,tests,powered-test,example,examples,*.d.ts}',
          '!**/._*',
          '!**/node_modules/.bin',
          '!**/{report.html,robots.txt,.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,__pycache__,thumbs.db,.gitignore,.gitattributes,.editorconfig,.flowconfig,.yarn-metadata.json,.idea,appveyor.yml,.travis.yml,circle.yml,npm-debug.log,.nyc_output,yarn.lock,.yarn-integrity}'
        ],
        protocols: {
          name: 'ADAMANT Messenger',
          schemes: ['adm']
        },
        win: {
          icon: './build/win/icon.ico'
        },
        mac: {
          category: 'public.app-category.social-networking',
          darkModeSupport: true,
          icon: './build/osx/icon.icns',
          gatekeeperAssess: false
        },
        linux: {
          category: 'Network',
          desktop: {
            Icon: './build/linux/icon.png',
            Name: 'ADAMANT Messenger',
            Terminal: false,
            Type: 'Application'
          },
          /* eslint-disable no-template-curly-in-string */
          artifactName: 'ADAMANT-Messenger-${version}.${ext}',
          icon: './build/linux/',
          target: ['AppImage']
        }
      }
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'i18n',
      enableInSFC: true
    },
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }

  },
  configureWebpack: {
    plugins: [
      // remove non english bip39 wordlists
      new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
      // replace `config.json` for different environments
      new webpack.NormalModuleReplacementPlugin(/(.*){ENV}(.*)/, (resource) => {
        const configName = process.env.ADM_CONFIG_FILE
          ? process.env.ADM_CONFIG_FILE
          : process.env.NODE_ENV

        resource.request = resource.request.replace('{ENV}', configName)
      })
    ]
  }
}
