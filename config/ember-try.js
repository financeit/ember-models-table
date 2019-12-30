'use strict';
let command = ['ember', 'exam', '--split', '4', '--parallel', '--random'];
const pr = process.env.TRAVIS_PULL_REQUEST;

if (pr) {
  command.push(pr);
}

const getChannelURL = require('ember-source-channel-url');

module.exports = async function() {
  return {
    command: command.join(' '),
    scenarios: [
      {
        name: 'ember-lts-2.16',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': true })
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1',
            'ember-source': '~2.16.0'
          }
        }
      },
      {
        name: 'ember-lts-2.18',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': true })
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1',
            'ember-source': '~2.18.0'
          }
        }
      },
      {
        name: 'ember-lts-3.4',
        npm: {
          devDependencies: {
            'ember-source': '~3.4.0'
          }
        }
      },
      {
        name: 'ember-lts-3.8',
        npm: {
          devDependencies: {
            'ember-source': '~3.8.0'
          }
        }
      },
      {
        name: 'ember-lts-3.12',
        npm: {
          devDependencies: {
            'ember-source': '~3.12.0'
          }
        }
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release')
          }
        }
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta')
          }
        }
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary')
          }
        }
      },
      // The default `.travis.yml` runs this scenario via `npm test`,
      // not via `ember try`. It's still included here so that running
      // `ember try:each` manually or from a customized CI config will run it
      // along with all the other scenarios.
      {
        name: 'ember-default',
        npm: {
          devDependencies: {}
        }
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true
          })
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^0.5.1'
          }
        }
      },
      {
        name: 'ember-default-with-ember-bootstrap-v3',
        env: {
          EMT_UI: 'bs3'
        },
        npm: {
          devDependencies: {
            'bootstrap': '3.4.0',
            'ember-bootstrap': '^2.3.0'
          }
        }
      },
      {
        name: 'ember-default-with-ember-bootstrap-v4',
        env: {
          EMT_UI: 'bs4'
        },
        npm: {
          devDependencies: {
            'bootstrap': '4.1.2',
            'ember-bootstrap': '^2.3.0'
          }
        }
      },
      {
        name: 'ember-default-with-semantic-ui-ember',
        env: {
          EMT_UI: 'semantic-ui'
        },
        npm: {
          devDependencies: {
            'semantic-ui-ember': '^3.0.0'
          }
        }
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false
          })
        },
        npm: {
          ember: {
            edition: 'classic'
          }
        }
      }
    ]
  };
};
