# scrum-poker

## Installation

Make sure you have the following installed:

- Node
- NPM or yarn

Clone the repo and install the packages for the server with `yarn` or `npm install`. Next, install the packages for the React app by going into the `client` folder with `cd client` and running `yarn` or `npm install`. 

### Google Analytics

Add your tracking ID in the `client/ga.ts` if you'd like to use Google Analytics.

## Usage

If you'd like to develop locally, open a terminal and run `yarn start:dev` in the root of the project. Next, open a new terminal and navigate to the `client` folder and run `yarn start`.

Go to `localhost:3000` in the browser the view the React app. Changes made in the server and React app will automatically reload both.

If you'd like to run this in production, create a `build` directory in the root of the project. Run `yarn build` in the `client` folder to build the React app. Next, run `yarn build` in the root of the project to build the server. Finally, run `yarn start` in the root of the project to start the server. Make sure that the environment is set to `production`.

## Deploy on Heroku

You can deploy your own instance on heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## License

[MIT](./LICENSE)