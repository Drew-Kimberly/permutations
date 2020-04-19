# NodeJS Object Permutations
Function to generate all permutations of data given zero or more arrays associated with properties in an object

[![npm version](https://badge.fury.io/js/%40drewkimberly%2Fpermutations.svg)](https://badge.fury.io/js/%40drewkimberly%2Fpermutations)
[![Build Status](https://travis-ci.org/Drew-Kimberly/permutations.svg?branch=master)](https://travis-ci.org/Drew-Kimberly/permutations)
[![Coverage Status](https://coveralls.io/repos/github/Drew-Kimberly/permutations/badge.svg?branch=master)](https://coveralls.io/github/Drew-Kimberly/permutations?branch=master)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

## Installation
```shell script
npm install @drewkimberly/permutations
```

## Usage
```typescript
import {generatePermutations} from "@drewkimbery/permutations";

const obj = {
  pilot: ["Han Solo", "Lando Calrissian"],
    copilot: ["Chewbacca", "Rey"],
    ship: "Falcon",
    speed: "1.5c"
};

console.log(generatePermutations(obj));
```

The above will output:

```json
[
  {
    "pilot": "Han Solo",
    "copilot": "Chewbacca",
    "ship": "Falcon",
    "speed": "1.5c"
  },
  {
    "pilot": "Han Solo",
    "copilot": "Rey",
    "ship": "Falcon",
    "speed": "1.5c"
  },
  {
    "pilot": "Lando Calrissian",
    "copilot": "Chewbacca",
    "ship": "Falcon",
    "speed": "1.5c"
  },
  {
    "pilot": "Lando Calrissian",
    "copilot": "Rey",
    "ship": "Falcon",
    "speed": "1.5c"
  }
]
```

## Performance
Performance starts to tail off as 1,000,000 permutations is closed in on. After that
it's quite computationally expensive and you'll quickly run into heap memory issues.
Check out the "[Performance Testing](./src/__tests__/index.spec.ts)" test suite (commented out by default)
to play around.

## Development

### Requirements
- NodeJS

### Installing Dependencies
```shell script
npm i
```

### Running Code Lint
```shell script
npm run check
```

### Running Tests
```shell script
npm run test
```

### Running the Build process
```shell script
npm run build
```

## CI/CD
CI/CD is performed with TravisCI. When a tag is pushed Travis will publish the
tag to NPM. See [travis.yml](./.travis.yml) for details.
