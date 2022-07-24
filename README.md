# Feast!

Feast! is a packager that bundles source code within a standard Node.js project into a zip file.

![Build Status](https://github.com/tgillus/pack-it/actions/workflows/main.yml/badge.svg)
[![GitHub version](https://img.shields.io/github/package-json/v/tgillus/pack-it)](https://github.com/tgillus/pack-it#readme)
[![NPM version](https://img.shields.io/npm/v/@triviumsoftware/pack-it)](https://www.npmjs.com/package/@triviumsoftware/pack-it)
[![License](https://img.shields.io/npm/l/@triviumsoftware/pack-it)](https://github.com/tgillus/pack-it/blob/main/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Prerequisites

Ensure the following requirements are met prior to usage:

- Node.js 14 or higher
- Git installed

## Installation

Via NPM:

```bash
npm install --save-dev @triviumsoftware/pack-it
```

Via Yarn:

```bash
yarn add --dev @triviumsoftware/pack-it
```

## Usage

### Configuration File

Feast! looks for a config file named `feast.config.cjs` in the project's root directory. The following is an example with all of the configurable settings:

```javascript
module.exports = {
  name: 'feast',
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
  },
  zip: {
    destination: 'dist',
    include: ['lib', 'node_modules'],
  },
};
```

### Configuration Settings

| Setting           | Description                                     |
| ----------------- | ----------------------------------------------- |
| `name`            | Name of the project. Used in the zip file name. |
| `git.url`         | Repo whose source code is cloned and zipped.    |
| `zip.destination` | Directory where the zip file is saved.          |
| `zip.include`     | Directories included in the zip file.           |

### Commands

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npx feast`         | Bundle the project as a zip file.                |
| `npx feast prepare` | Bundle the project as a zip file.                |
| `npx feast clean`   | Delete .feast and `zip.destination` directories. |

### Prepare

Feast! expects an NPM script named `build` to be defined in `package.json`. In other words, Feast! executes the following command to build the project:

```bash
npm run build
```

Feast! installs an executable named `feast`. Run the following in the root of the project to bundle it as a zip file:

```bash
npx feast
```

or

```bash
npx feast prepare
```

> NOTE: Feast! clones a fresh copy of the project's repository prior to building and bundling the project. It installs all of the project's dependencies after it's cloned in order to build the project. However, only production dependencies are bundled with the zip file.

### Clean Up

Run the following in the root of the project to remove the .feast and `zip.destination` directories:

```bash
npx feast clean
```

## Author

[Tramaine Gillus](https://tramaine.me)

## License

Feast! is distributed under the MIT License. See the LICENSE file for more information.
