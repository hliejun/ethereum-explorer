<!-- This README.md template is adapted from PurpleBooth's GitHub Gist https://gist.github.com/PurpleBooth/109311bb0361f32d87a2 -->

# Tx

Tx is a block explorer web application for Ethereum. This application lets users track their ETH balance and transactions.

## Getting Started

To access and use Tx, please visit [SET HOST URL HERE](https://hliejun.github.io).

To contribute to this project, please refer to the following sections to ready your development environment.

### Prerequisites

Before we begin, please ensure that you have [Git](https://git-scm.com/downloads) and [NodeJS](https://nodejs.org/en/download) installed. You can manually install them using packages from their download page. Alternatively, you can also use your favourite OS package manager to install them.

The `/.gitignore` file is included to leave out specific items from your commits.

This project also utilises [ESLint](https://eslint.org/docs/user-guide/getting-started), [SASSLint](https://github.com/sasstools/sass-lint) and [Prettier](https://prettier.io/docs/en/install.html) to enforce coding style and standards. You can optionally install these linters/formatters globally or locally and set up for use with your favourite editor using their respective editor plugins.

Linter configuration files are included to define linting rules:

- `/.eslintrc.json` is used for `.js` and `.jsx` files.
- `/.sass-lint.yml` is used for `.css` and `.scss` files.
- `/.prettierrc.json` is used for general code formatting and is especially handy when used with hackable code editors such as [Visual Studio Code](https://code.visualstudio.com) or [Atom](https://atom.io).

### Setup

1. First, we begin by cloning this repository using Git.

   Open Terminal and navigate to your preferred directory:

   ```bash
   # e.g. cd ~/developer/projects
   cd [your preferred directory]
   ```

   Clone this repository to your current directory:

   ```bash
   # e.g. git clone [SET REPO URL HERE]
   git clone [repository url]
   ```

   If you are still unsure of how to find your repository url, you can follow [Step 2 of the fork-a-repo guide](https://help.github.com/en/articles/fork-a-repo).

2. Next, we install all the required dependencies using a NodeJS package manager.

   Enter the local directory of the cloned repository:

   ```bash
   # e.g. cd tx
   cd [project name]
   ```

   Install NodeJS dependencies using [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/en/docs/install):

   ```bash
   # If you are using npm:
   npm i

   # If you are using Yarn:
   yarn
   ```

3. Link your editor workspace to utilise the linter and formatter files provided in the cloned repository.

   To make use of the linter files, you need to find and install the right plugins for your editor:

   ESLint - [VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | [Atom](https://atom.io/packages/linter-eslint) | [Sublime Text](https://github.com/SublimeLinter/SublimeLinter-eslint)

   SASSLint - [VSCode](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint) | [Atom](https://atom.io/packages/linter-sass-lint) | [Sublime Text](https://github.com/skovhus/SublimeLinter-contrib-sass-lint)

   Prettier - [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | [Atom](https://atom.io/packages/prettier-atom) | [Sublime Text](https://github.com/jonlabelle/SublimeJsPrettier)

## Usage

This project utilises npm scripts defined in `package.json`.

To start this application locally in development mode, you can run:

```bash
npm start
```

This is equivalent to running the `webpack-dev-server` module locally:

```bash
./node_modules/.bin/webpack-dev-server --mode development
```

Now with the application running, you can preview (with hot reload) by visiting `localhost:3000`.

What happened here is that the ReactJS project written in ES6 is transpiled by Babel to ES5, then bundled by Webpack and served by Webpack Dev Server. Note that Babel is configured using `/.babelrc` and Webpack is done so using `/webpack.config.js`.

## Architecture

Explain the architecture and design patterns of this project

## API Endpoint

API calls in this project are intercepted by a [SET SERVICE ENDPOINT URL HERE](https://hliejun.github.io) to protect API keys and transform data.

## Running Tests

Explain how to run the automated tests for this system

## Deployment

Explain how to build and deploy

## Built With

Links to dependencies and libraries used

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code of conduct, the process for submitting pull requests and other rules and regulations applied to contributors.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [SET TAGS URL HERE](https://hliejun.github.io).

## Authors

- **Huang Lie Jun** - _Initial development_ - [hliejun](https://hliejun.github.io)

See also the list of [SET CONTRIBUTORS URL HERE](https://hliejun.github.io) who participated in this project.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Include TenX, assets artists, reference guides, etc.
