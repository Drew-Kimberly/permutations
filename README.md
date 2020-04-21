# NodeJS Object Permutations
Function to generate all permutations of data given zero or more arrays associated with properties in an object

[![npm version](https://badge.fury.io/js/%40drewkimberly%2Fpermutations.svg)](https://badge.fury.io/js/%40drewkimberly%2Fpermutations)
[![Build Status](https://travis-ci.org/Drew-Kimberly/permutations.svg?branch=2.x)](https://travis-ci.org/Drew-Kimberly/permutations)
[![Coverage Status](https://coveralls.io/repos/github/Drew-Kimberly/permutations/badge.svg?branch=2.x)](https://coveralls.io/github/Drew-Kimberly/permutations?branch=2.x)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

## Warning
The _2.x_ branch uses an implementation that relies on the [`power-cartesian-product`](https://github.com/fisker/power-cartesian-product) library.
It's API is also slightly different. For a solution using vanilla JS, please check out the
 [1.x branch](https://github.com/Drew-Kimberly/permutations/tree/1.x).  

## Installation
```shell script
npm install @drewkimberly/permutations
```

## Objective
Given an object like the one below:
```json
{
    "pilot": ["Han Solo", "Lando Calrissian"],
    "copilot": ["Chewbacca", "Rey"],
    "ship": "Falcon",
    "speed": "1.5c"
}
```

Generate all permutations like so:
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
where object properties with empty array values can be ignored from the set of permutations.

## Usage

### `getPermutations`
The `getPermutations` function will return an array of all permutations for the given object.
```typescript
import {getPermutations} from "@drewkimbery/permutations";

const obj = {
    pilot: ["Han Solo", "Lando Calrissian"],
    copilot: ["Chewbacca", "Rey"],
    ship: "Falcon",
    speed: "1.5c"
};

const permutations = getPermutations(obj);
```

### `generatePermutations`
The `generatePermutations` function will return a generator that when iterated over will return
every permutation for the given object. This way, memory does not restrict the generation of permutations.
```typescript
import {generatePermutations} from "@drewkimbery/permutations";

const obj = {
    pilot: ["Han Solo", "Lando Calrissian"],
    copilot: ["Chewbacca", "Rey"],
    ship: "Falcon",
    speed: "1.5c"
};

for (const permutation of generatePermutations(obj)) {
  doSomething();
}
```

## Approach
Let's walkthrough how we calculate permutations for the following object:
```json
{
    "pilot": ["Han Solo", "Lando Calrissian"],
    "copilot": ["Chewbacca", "Rey"],
    "ship": "Falcon",
    "speed": "1.5c"
}
```

#### Step 1 - Convert object to array
```json
[
  ["pilot", ["Han Solo", "Lando Calrissian"]],
  ["copilot", ["Chewbacca", "Rey"]],
  ["ship", "Falcon"],
  ["speed", "1.5c"]
]
```

#### Step 2 - Find Cartesian Product of each subarray
```json
[
  [["pilot", "Han Solo"], ["pilot", "Lando Calrissian"]],
  [["copilot", "Chewbacca"], ["copilot", "Rey"]],
  [["ship", "Falcon"]],
  [["speed", "1.5c"]]
]
```

#### Step 3 - Find Cartesian Product of all subarrays
Here we have 4 sets of tuples. We can apply the cartesian product to these sets
to retrieve all permutations in array form.
```json
[
  [["pilot", "Han Solo"], ["copilot", "Chewbacca"], ["ship", "Falcon"], ["speed", "1.5c"]],
  [["pilot", "Han Solo"], ["copilot", "Rey"], ["ship", "Falcon"], ["speed", "1.5c"]],
  [["pilot", "Lando Calrissian"], ["copilot", "Chewbacca"], ["ship", "Falcon"], ["speed", "1.5c"]],
  [["pilot", "Lando Calrissian"], ["copilot", "Rey"], ["ship", "Falcon"], ["speed", "1.5c"]]
]
```

#### Step 4 - Reduce the array of permutations back into an array of objects
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
Performance starts to tail off as you go beyond ~1,000,000 permutations. After that
it's quite computationally expensive and you'll quickly run into heap memory issues.
You can of course mitigate the memory issues by using `generatePermutations` instead of `getPermutations`.
Check out the "[Performance Testing](./test/__tests__/index.spec.ts)" test suites (commented out by default)
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
