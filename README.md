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

## Approach
The provided permutable object is first split into 2 objects; a _simple_ permutation and a _complex_ permutable.
A _simple_ permutation consists of all key-value pairs that exist in all permutations, i.e:
    - Non-array value
    - Array w/ length of 1
    - Empty array (removed and non-existent in any permutation)
    
A _complex_ permutable consists of all key-value pairs whose value is an array with length > 1.

In `generatePermutations` we do this via:
```typescript
const splitPermutable = splitPermutableObject(obj);
```

We can then calculate the total number of permutations:

>Given an object with `n` non-empty array values, the total number of permutations `P` can be denoted as:
>```
>P = length(A_1) * length(A_2) *...* length(A_n)
>```

In `generatePermutations` this is calculated using:
```typescript
const numPermutations = getTotalPermutationCount(splitPermutable.permutable);
```

We use this to create an array of all simple permutations which we use as the starting point for what's
fed into the reducer function in `generatePermutations`, i.e.:
```typescript
Array(numPermutations).fill(splitPermutable.permutation)
```

The reducer function is applied to every key-value pair of the _complex_ permutable derived above.
It returns a new iteration of the array of total permutations, where each permutation is correctly
updated (or skipped) based on the given key-value pair of the _complex_ permutable.

`permutationFn` is responsible for deriving the new permutations array for a given key-value pair of
the _complex_ permutable. We can calculate the value for the given key of each permutation through
the length of the original value (array) and the current sequence. We keep track of the
current sequence using the sequence length and the current index of the permutations array we're mapping through.

The sequence length for the _nth_ key-value pair is calculated using the following equation:
>```
>L_seq = TotalPermutations / (length(A_1) * length(A_2) *...* length(A_n))
>```

Since _TotalPermutations_ is a product of `length(A_1) *...* length(A_n)` (see above), we are guaranteed
that our last key-value pair in the complex permutable will have a sequence length of 1 
(every permutation receives a different value from its array in round-robin fashion).

This is implemented in `permutationFn` using some modulus arithmetic:
```typescript
  let currentSequence = 0;
  return currentPermutations.map((permutation, idx) => {
    const newPermutation = {
      ...permutation,
      [key]: value[currentSequence % value.length],
    };

    if ((idx + 1) % sequenceLength === 0) {
      currentSequence++;
    }

    return newPermutation;
  });
```

Let's clarify by looking at an example. Suppose our function is passed the following permutable object:
```typescript
const obj = {
    pilot: ["Han Solo", "Lando Calrissian"],
    copilot: ["Chewbacca", "Rey"],
    ship: "Falcon",
    speed: "1.5c"
};
```

The splitting process will result in:
```typescript
const splitObj = {
  permutable: {
    pilot: ["Han Solo", "Lando Calrissian"],
    copilot: ["Chewbacca", "Rey"],
  },
  permutation: {
    ship: "Falcon",
    speed: "1.5c"
  },
};
```

Since the total # of permutations will be _4_ (2*2), the reducer is fed the following
permutations array to start things off:
```typescript
currentPermutations = [
  {
      ship: "Falcon",
      speed: "1.5c"
  },
  {
    ship: "Falcon",
    speed: "1.5c"
  },
  {
    ship: "Falcon",
    speed: "1.5c"
  },
  {
    ship: "Falcon",
    speed: "1.5c"
  },
];
```

We then call `permutationFn` like so:
```typescript
permutationFn("pilot", ["Han Solo", "Lando Calrissian"], currentPermutations, 2);
```
where the `sequenceLength` (_2_) is calculated using:
```
total_permutations / obj["pilot"].length 
    = 4 / 2 
    = 2
```

This results in the next iteration of permutations which looks like:
```typescript
currentPermutations = [
  {
      pilot: "Han Solo",
      ship: "Falcon",
      speed: "1.5c"
  },
  {
    pilot: "Han Solo",
    ship: "Falcon",
    speed: "1.5c"
  },
  {
    pilot: "Lando Calrissian",
    ship: "Falcon",
    speed: "1.5c"
  },
  {
    pilot: "Lando Calrissian",
    ship: "Falcon",
    speed: "1.5c"
  },
];
```

We then call `permutationFn` with next (and last) key-value pair like so:
```typescript
permutationFn("copilot", ["Chewbacca", "Rey"], currentPermutations, 1);
```
where the `sequenceLength` (_1_) is calculated using:
```
previous_seq_length / obj["copilot"].length 
    = 2 / 2 
    = 1
```

which gives us our final result of:
```typescript
currentPermutations = [
  {
      pilot: "Han Solo",
      copilot: "Chewbacca",
      ship: "Falcon",
      speed: "1.5c"
  },
  {
    pilot: "Han Solo",
    copilot: "Rey",
    ship: "Falcon",
    speed: "1.5c"
  },
  {
    pilot: "Lando Calrissian",
    copilot: "Chewbacca",
    ship: "Falcon",
    speed: "1.5c"
  },
  {
    pilot: "Lando Calrissian",
    copilot: "Rey",
    ship: "Falcon",
    speed: "1.5c"
  },
];
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

## Future Improvements
This implementation is _not_ the absolute optimal solution. 
In the future I'd like to implement more of a traditional "[Cartesian Product](https://en.wikipedia.org/wiki/Cartesian_product)"
approach. Ideally, this solution will be w/o recursion so the module can also export a
generator function to calculate all permutations w/o having to worry about memory restrictions. 
