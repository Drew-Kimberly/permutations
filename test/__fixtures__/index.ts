import {Permutable, Permutation} from '../../src/interfaces';

export const invalidArgTestCases = [
  'Foo',
  123,
  true,
  false,
  undefined,
  null,
  [1, 2, 3],
  [{test: '123'}],
  new Date(),
];

export const permutables: {
  description: string;
  permutable: Permutable;
  expected: Permutation[];
}[] = [
  {
    description:
      'An empty object argument generates an empty array with no permutations',
    permutable: {},
    expected: [{}],
  },
  {
    description:
      'An object with no array parameters generates a single permutation of itself',
    permutable: {
      first: 'foo',
      second: 'bar',
      third: 'baz',
    },
    expected: [
      {
        first: 'foo',
        second: 'bar',
        third: 'baz',
      },
    ],
  },
  {
    description:
      'Empty array parameters are not included in the generated permutations list',
    permutable: {
      first: 'foo',
      second: [],
      third: 'baz',
    },
    expected: [
      {
        first: 'foo',
        third: 'baz',
      },
    ],
  },
  {
    description:
      'An object with all empty array parameters returns an empty array with no permutations',
    permutable: {
      first: [],
      second: [],
      third: [],
    },
    expected: [{}],
  },
  {
    description: 'Permutations for a basic "3x1" permutable object',
    permutable: {
      foo: [1, 2, 3],
      name: 'Drew',
    },
    expected: [
      {
        foo: 1,
        name: 'Drew',
      },
      {
        foo: 2,
        name: 'Drew',
      },
      {
        foo: 3,
        name: 'Drew',
      },
    ],
  },
  {
    description:
      'Permutations for a basic "2x2" permutable object are correctly calculated',
    permutable: {
      pilot: ['Han Solo', 'Lando Calrissian'],
      copilot: ['Chewbacca', 'Rey'],
      ship: 'Falcon',
      speed: '1.5c',
    },
    expected: [
      {
        pilot: 'Han Solo',
        copilot: 'Chewbacca',
        ship: 'Falcon',
        speed: '1.5c',
      },
      {
        pilot: 'Han Solo',
        copilot: 'Rey',
        ship: 'Falcon',
        speed: '1.5c',
      },
      {
        pilot: 'Lando Calrissian',
        copilot: 'Chewbacca',
        ship: 'Falcon',
        speed: '1.5c',
      },
      {
        pilot: 'Lando Calrissian',
        copilot: 'Rey',
        ship: 'Falcon',
        speed: '1.5c',
      },
    ],
  },
  {
    description: 'Permutations for a basic "3x2" permutable object',
    permutable: {
      foo: [1, 2, 3],
      name: ['Drew', 'Sam'],
    },
    expected: [
      {
        foo: 1,
        name: 'Drew',
      },
      {
        foo: 1,
        name: 'Sam',
      },
      {
        foo: 2,
        name: 'Drew',
      },
      {
        foo: 2,
        name: 'Sam',
      },
      {
        foo: 3,
        name: 'Drew',
      },
      {
        foo: 3,
        name: 'Sam',
      },
    ],
  },
  {
    description:
      'Permutations for a complex "2x0x2x2x1" permutable object are correctly calculated',
    permutable: {
      coords: [
        [1, 2],
        [3, 4],
      ],
      empty: [],
      people: [
        {name: 'John', age: 37},
        {name: 'Sally', age: 29},
      ],
      isProduction: false,
      speed: 150,
      config: {test: 'foo'},
      123: undefined,
      options: [true, false],
      random: [1],
    },
    expected: [
      {
        coords: [1, 2],
        people: {
          name: 'John',
          age: 37,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: true,
        random: 1,
      },
      {
        coords: [1, 2],
        people: {
          name: 'John',
          age: 37,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: false,
        random: 1,
      },
      {
        coords: [1, 2],
        people: {
          name: 'Sally',
          age: 29,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: true,
        random: 1,
      },
      {
        coords: [1, 2],
        people: {
          name: 'Sally',
          age: 29,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: false,
        random: 1,
      },
      {
        coords: [3, 4],
        people: {
          name: 'John',
          age: 37,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: true,
        random: 1,
      },
      {
        coords: [3, 4],
        people: {
          name: 'John',
          age: 37,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: false,
        random: 1,
      },
      {
        coords: [3, 4],
        people: {
          name: 'Sally',
          age: 29,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: true,
        random: 1,
      },
      {
        coords: [3, 4],
        people: {
          name: 'Sally',
          age: 29,
        },
        isProduction: false,
        speed: 150,
        config: {
          test: 'foo',
        },
        options: false,
        random: 1,
      },
    ],
  },
  {
    description: 'Permutations for a basic "2x4x3" permutable object',
    permutable: {
      name: ['Drew', 'Sam'],
      foo: [1, 2, 3, 4],
      bar: [1, 2, 3],
    },
    expected: [
      {
        name: 'Drew',
        foo: 1,
        bar: 1,
      },
      {
        name: 'Drew',
        foo: 1,
        bar: 2,
      },
      {
        name: 'Drew',
        foo: 1,
        bar: 3,
      },
      {
        name: 'Drew',
        foo: 2,
        bar: 1,
      },
      {
        name: 'Drew',
        foo: 2,
        bar: 2,
      },
      {
        name: 'Drew',
        foo: 2,
        bar: 3,
      },
      {
        name: 'Drew',
        foo: 3,
        bar: 1,
      },
      {
        name: 'Drew',
        foo: 3,
        bar: 2,
      },
      {
        name: 'Drew',
        foo: 3,
        bar: 3,
      },
      {
        name: 'Drew',
        foo: 4,
        bar: 1,
      },
      {
        name: 'Drew',
        foo: 4,
        bar: 2,
      },
      {
        name: 'Drew',
        foo: 4,
        bar: 3,
      },
      {
        name: 'Sam',
        foo: 1,
        bar: 1,
      },
      {
        name: 'Sam',
        foo: 1,
        bar: 2,
      },
      {
        name: 'Sam',
        foo: 1,
        bar: 3,
      },
      {
        name: 'Sam',
        foo: 2,
        bar: 1,
      },
      {
        name: 'Sam',
        foo: 2,
        bar: 2,
      },
      {
        name: 'Sam',
        foo: 2,
        bar: 3,
      },
      {
        name: 'Sam',
        foo: 3,
        bar: 1,
      },
      {
        name: 'Sam',
        foo: 3,
        bar: 2,
      },
      {
        name: 'Sam',
        foo: 3,
        bar: 3,
      },
      {
        name: 'Sam',
        foo: 4,
        bar: 1,
      },
      {
        name: 'Sam',
        foo: 4,
        bar: 2,
      },
      {
        name: 'Sam',
        foo: 4,
        bar: 3,
      },
    ],
  },
];
