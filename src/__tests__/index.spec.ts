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

  test('Permutations for a basic permutable object are correctly calculated', () => {
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

  test('Permutations for a complex permutable object are correctly calculated', () => {
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

    const expected: Permutation[] = [];

    expect(generatePermutations(obj)).toEqual(expected);
  });
});
