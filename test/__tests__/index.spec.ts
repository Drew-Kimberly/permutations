import {generatePermutations, getPermutations} from '../../src';
import * as fixtures from '../__fixtures__';

describe('Test suite covering getPermutations()', () => {
  test.each(fixtures.invalidArgTestCases)(
    'An error is thrown when %s is provided as an arg',
    arg => {
      // @ts-ignore
      expect(() => getPermutations(arg)).toThrow();
    }
  );

  for (const testCase of fixtures.permutables) {
    test(testCase.description, () => {
      expect(getPermutations(testCase.permutable)).toEqual(testCase.expected);
    });
  }
});

describe('Test suite covering generatePermutations()', () => {
  test.each(fixtures.invalidArgTestCases)(
    'An error is thrown when %s is provided as an arg',
    arg => {
      // @ts-ignore
      const generator = generatePermutations(arg);
      expect(() => generator.next().value).toThrow();
    }
  );

  for (const testCase of fixtures.permutables) {
    test(testCase.description, () => {
      expect([...generatePermutations(testCase.permutable)]).toEqual(
        testCase.expected
      );
    });
  }
});

// const getNaturalNumberArrayUpTo = (limit: number) => [
//   ...Array(limit)
//     .fill('')
//     .map((val, idx) => idx + 1),
// ];
//
// describe('Performance Testing for getPermutations()', () => {
//   const testCases = getNaturalNumberArrayUpTo(6).map(String);
//   test.each(testCases)('Performance of 10^%s permutations', pow => {
//     const obj = [...Array(Number(6)).fill('')].reduce(
//       (prevObj, val, idx) => ({
//         ...prevObj,
//         [idx]: getNaturalNumberArrayUpTo(10),
//       }),
//       {}
//     );
//
//     const start = new Date().getTime();
//     getPermutations(obj);
//     const end = new Date().getTime() - start;
//     console.log(`Calculation of 10^${pow} permutations took ${end}ms`);
//   });
// });
//
// describe('Performance Testing for generatePermutations()', () => {
//   const testCases = getNaturalNumberArrayUpTo(7).map(String);
//   test.each(testCases)('Performance of 10^%s permutations', pow => {
//     const obj = [...Array(Number(pow)).fill('')].reduce(
//       (prevObj, val, idx) => ({
//         ...prevObj,
//         [idx]: getNaturalNumberArrayUpTo(10),
//       }),
//       {}
//     );
//
//     let permutationsGenerated = 0;
//     const start = new Date().getTime();
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     for (const permutation of generatePermutations(obj)) {
//       permutationsGenerated++;
//     }
//     const end = new Date().getTime() - start;
//
//     console.log(`Generated ${permutationsGenerated} permutations`);
//     console.log(`Calculation of 10^${pow} permutations took ${end}ms`);
//   });
// });
