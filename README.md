# Pack It!

Pack It! is a packager that bundles source code within a standard Node.js project into a zip file.

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

Pack It! looks for a config file named `pack-it.config.cjs` in the project's root directory. The following is an example with all of the configurable settings:

```javascript
module.exports = {
  name: 'pack-it',
  git: {
    url: 'git@github.com:tgillus/pack-it.git',
  },
  zip: {
    destination: 'dist',
    include: ['lib/**/*', 'node_modules/**/*', 'package.json'],
  },
};
```

### Configuration Settings

| Setting           | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `name`            | Name of the project. Used in the zip file name.                                 |
| `git.url`         | Repo whose source code is cloned and zipped.                                    |
| `zip.destination` | Directory where the zip file is saved.                                          |
| `zip.include`     | Directories/files included in the zip file. (NOTE: Values valid glob patterns.) |

### Commands

| Command               | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npx pack-it`         | Bundle the project as a zip file.                  |
| `npx pack-it prepare` | Bundle the project as a zip file.                  |
| `npx pack-it clean`   | Delete .pack-it and `zip.destination` directories. |

### Prepare

Pack It! expects an NPM script named `build` to be defined in `package.json`. In other words, Pack It! executes the following command to build the project:

```bash
npm run build
```

Pack It! installs an executable named `pack-it`. Run the following in the root of the project to bundle it as a zip file:

```bash
npx pack-it
```

or

```bash
npx pack-it prepare
```

> NOTE: Pack It! clones a fresh copy of the project's repository prior to building and bundling the project. It installs all of the project's dependencies after it's cloned in order to build the project. However, only production dependencies are bundled with the zip file.

### Clean Up

Run the following in the root of the project to remove the .pack-it and `zip.destination` directories:

```bash
npx pack-it clean
```

## Author

[Tramaine Gillus](https://tramaine.me)

## License

Pack It! is distributed under the MIT License. See the LICENSE file for more information.
