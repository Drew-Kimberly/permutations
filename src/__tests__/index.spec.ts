import {generatePermutations} from '../index';
import {Permutable, Permutation} from '../interfaces';

describe('Test suite covering generatePermutations()', () => {
  test.each([
    'Foo',
    123,
    true,
    false,
    undefined,
    null,
    [1, 2, 3],
    [{test: '123'}],
    new Date(),
  ])('An error is thrown when %s is provided as an arg', arg => {
    // @ts-ignore
    expect(() => generatePermutations(arg)).toThrow();
  });

  test('An empty object argument generates a single permutation of itself', () => {
    expect(generatePermutations({})).toEqual([{}]);
  });

  test('An object with no array parameters generates a single permutation of itself', () => {
    const obj: Permutable = {
      first: 'foo',
      second: 'bar',
      third: 'baz',
    };

    expect(generatePermutations(obj)).toEqual([obj]);
  });

  test('Empty array parameters are not included in the generated permutations list', () => {
    const obj: Permutable = {
      first: 'foo',
      second: [],
      third: 'baz',
    };
    const expected: Permutation[] = [
      {
        first: 'foo',
        third: 'baz',
      },
    ];

    expect(generatePermutations(obj)).toEqual(expected);
  });

  test('An object with all empty array parameters returns an empty object as its only permutation', () => {
    const obj: Permutable = {
      first: [],
      second: [],
      third: [],
    };

    expect(generatePermutations(obj)).toEqual([{}]);
  });

  test('Permutations for a basic "3x1" permutable object', () => {
    const obj: Permutable = {
      foo: [1, 2, 3],
      name: 'Drew',
    };

    const expected: Permutation[] = [
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
    ];

    expect(generatePermutations(obj)).toEqual(expected);
  });

  test('Permutations for a basic "2x2" permutable object are correctly calculated', () => {
    const obj: Permutable = {
      pilot: ['Han Solo', 'Lando Calrissian'],
      copilot: ['Chewbacca', 'Rey'],
      ship: 'Falcon',
      speed: '1.5c',
    };

    const expected: Permutation[] = [
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
    ];

    expect(generatePermutations(obj)).toEqual(expected);
  });

  test('Permutations for a basic "3x2" permutable object', () => {
    const obj: Permutable = {
      foo: [1, 2, 3],
      name: ['Drew', 'Sam'],
    };

    const expected: Permutation[] = [
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
    ];

    expect(generatePermutations(obj)).toEqual(expected);
  });

  test('Permutations for a complex "2x0x2x2x1" permutable object are correctly calculated', () => {
    const obj: Permutable = {
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
    };

    const expected: Permutation[] = [
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
    ];

    expect(generatePermutations(obj)).toEqual(expected);
  });

  test('Permutations for a basic "2x4x3" permutable object', () => {
    const obj: Permutable = {
      name: ['Drew', 'Sam'],
      foo: [1, 2, 3, 4],
      bar: [1, 2, 3],
    };

    const expected: Permutation[] = [
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
    ];

    expect(generatePermutations(obj)).toEqual(expected);
  });
});

// describe('Performance Testing', () => {
//   const getNaturalNumberArrayUpTo = (limit: number) => [
//     ...Array(limit)
//       .fill('')
//       .map((val, idx) => idx + 1),
//   ];
//
//   const testCases = getNaturalNumberArrayUpTo(6).map(val => val.toString());
//   test.each(testCases)('Performance of 10^%s permutations', pow => {
//     const obj: Permutable = [...Array(Number(pow)).fill('')].reduce(
//       (prevObj, val, idx) => ({
//         ...prevObj,
//         [idx]: getNaturalNumberArrayUpTo(10),
//       }),
//       {}
//     );
//
//     const start = new Date().getTime();
//     generatePermutations(obj);
//     const end = new Date().getTime() - start;
//     console.log(`Calculation of 10^${pow} permutations took ${end}ms`);
//   });
// });
