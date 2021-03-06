# Alt Coin Love [![CircleCI](https://circleci.com/gh/brentoneill/alt-coin-love.svg?style=svg)](https://circleci.com/gh/brentoneill/alt-coin-love)

## Get up and running
1. Install yarn: `npm install -g yarn`

2. Install deps using yarn: `yarn`

3. Run Webpack dev server for local dev: `yarn start`

4. Open up your browser and head to `http://localhost:3000`

Webpack will re-compile on file save and auto refresh the browser.

## Frameworks/Libriaries

Check the `package.json` for full details, but this repo uses `semantic-ui-react` (https://react.semantic-ui.com/elements/button) for basic UI components.

As the repo stats show, this app is built in majority TypeScript, but webpack is handling all that transpiling for us. Thankfully that we're on TypeScript `2.4.1`, typings are now installed via `npm` so there is no longer the need for a `typings install` step in the setup process.

## Testing

This repo runs React Component unit tests through Enzyme (https://github.com/airbnb/enzyme), with Karma as the runner.

To run tests, type `yarn test`.

This will fire up Karma, transpile our TypeScript (with ES6/7) files, and run our tests in single run mode.

To run tests on wathc mode, type `yarn test-watch`

Tests will re-run on file save (both component and test files).

## Deploys

This repo deploys to heroku (https://alt-coin-love.herokuapp.com/) any time there is a push to `master`. `server.js` is used in this case to serve up the static assets and `views/index.js`.

The deploy runs `webpack` which drops `bundle.js` inside a `dist` folder. The `dist` folder is in the `.gitignore`, so you will notice that we do not check in any build artifacts but instead build them on deployment.
