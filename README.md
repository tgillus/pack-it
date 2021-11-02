# Pack It!

Pack It! is a packager that bundles source code within a standard Node.js project into a zip file.

[![Build Status](https://app.travis-ci.com/tgillus/pack-it.svg?branch=main)](https://app.travis-ci.com/tgillus/pack-it)
[![Coverage Status](https://coveralls.io/repos/github/tgillus/pack-it/badge.svg?branch=main)](https://coveralls.io/github/tgillus/pack-it?branch=main)
[![GitHub version](https://img.shields.io/github/package-json/v/tgillus/pack-it)](https://github.com/tgillus/pack-it#readme)
[![NPM version](https://img.shields.io/npm/v/@triviumsoftware/pack-it)](https://www.npmjs.com/package/@triviumsoftware/pack-it)
[![License](https://img.shields.io/npm/l/@triviumsoftware/pack-it)](https://github.com/tgillus/pack-it/blob/main/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Installation

Via NPM:

```bash
npm install --save-dev @triviumsoftware/pack-it
```

Via Yarn:

```bash
yarn add --dev @triviumsoftware/pack-it
```

## Prerequisites

Ensure the following requirements are met prior to usage:

- Node.js 12 or 14 installed
- Git installed

## Usage

### Configuration File

Pack It! looks for a config file named `pack-it.config.js` in the project's root directory. The following is an example with all of the configurable settings:

```javascript
module.exports = {
  projectName: 'pack-it',
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
    branch: 'main',
  },
  tmpDir: '.tmp',
  artifactDir: 'deploy',
  includeDirs: ['lib', 'node_modules'],
};
```

### Configuration Settings

| Setting       | Description                                            | Required | Default                   |
| ------------- | ------------------------------------------------------ | -------- | ------------------------- |
| `projectName` | Name of the project. Used in the zip file name.        | true     |                           |
| `git.url`     | Repo whose source code is cloned and zipped.           | true     |                           |
| `git.branch`  | Branch of the repo that is checked out when cloned.    | true     |                           |
| `tmpDir`      | Directory where the repo is cloned.                    | false    | `'.tmp'`                  |
| `artifactDir` | Directory where this produced zip file is stored.      | false    | `'deploy'`                |
| `includeDirs` | Array of directorys that are included in the zip file. | false    | `['src', 'node_modules']` |

### Commands

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npx pack-it`       | Bundle the project as a zip file.  |
| `npx pack-it pack`  | Bundle the project as a zip file.  |
| `npx pack-it clean` | Delete `tmpDir` and `artifactDir`. |

Pack It! expects an NPM script `build` to be defined in `package.json`. In other words, Pack It! executes the following command to build the project:

```bash
npm run build
```

Pack It! installs an executable named `pack-it`. Run the following in the root of the project to bundle it as a zip file:

```bash
npx pack-it
```

or

```bash
npx pack-it pack
```

> NOTE: Pack It! clones a fresh copy of the project's repository prior to building and bundling the project. It installs all of the project's dependencies after it's cloned in order to build the project. However, only production dependencies are bundled with the zip file.

### Clean Up Pack It! Artifacts

Run the following in the root of the project to remove `tmpDir` and `artifactDir`:

```bash
npx pack-it clean
```

## Author

[Tramaine Gillus](https://tramaine.me)

## License

Pack It! is distributed under the MIT License. See the LICENSE file for more information.
