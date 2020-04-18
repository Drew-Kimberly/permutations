import {MapKeys, Permutable, Permutation} from './interfaces';

const isObjectLiteral = (obj: any): boolean =>
  obj === Object(obj) && obj.constructor === {}.constructor;

const incrementPermutationCountForValue = (
  currentCount: number,
  value: Array<any>
): number => currentCount * value.length;

const getTotalPermutationCount = (obj: Permutable): number =>
  Object.values(obj)
    .filter(val => Array.isArray(val) && val.length > 1)
    .reduce(incrementPermutationCountForValue, 1);

const permutationFn = (
  key: MapKeys,
  value: any,
  currentPermutations: Permutable[],
  sequenceLength: number
): Permutable[] => {
  let currentSequence = 0;
  return currentPermutations.map((permutation, idx) => {
    const newPermutations = {
      ...permutation,
      [key]: value[currentSequence % value.length],
    };

    if ((idx + 1) % sequenceLength === 0) {
      currentSequence++;
    }

    return newPermutations;
  });
};

const calculateSequenceLength = (
  value: any[],
  previousSequenceLength: number
): number => previousSequenceLength / value.length;

/**
 * Generates a list of permutations given an object.
 *
 * Permutations consist of all possible objects derived from properties with array values
 * within the provided object. That is, an object with 2 array properties each with a length of 3
 * would result in 9 (3*3) permutations.
 *
 * @param {Permutable} obj - The object used to generate permutations.
 *
 * @returns {Permutation[]} - The generated array of permutations.
 */
export const generatePermutations = (obj: Permutable): Permutation[] => {
  if (!isObjectLiteral(obj)) {
    throw new Error(`Invalid argument ${typeof obj}`);
  }

  const numPermutations = getTotalPermutationCount(obj);
  let sequenceLength: number;

  return Object.entries(obj).reduce(
    (currentPermutations: Permutable[], [key, value]) => {
      // Non-array values are exactly the same in each permutation.
      if (!Array.isArray(value)) {
        return currentPermutations.map(permutation => ({
          ...permutation,
          [key]: value,
        }));
      }

      // Empty array values should be ignored and are left out of the permutation objects.
      if (value.length === 0) {
        return currentPermutations;
      }

      // Arrays with only 1 value do not impact the number of permutations and therefore are exactly
      // the same in each permutation.
      if (value.length === 1) {
        return currentPermutations.map(permutation => ({
          ...permutation,
          [key]: value[0],
        }));
      }

      // Finally we have array values with multiple entries, which directly dictate how many permutations we'll have.
      if (value.length > 1) {
        sequenceLength = calculateSequenceLength(
          value,
          sequenceLength ?? numPermutations
        );
        return permutationFn(key, value, currentPermutations, sequenceLength);
      }

      return currentPermutations;
    },
    Array(numPermutations).fill({})
  );
};
