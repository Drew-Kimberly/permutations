import {
  ComplexPermutable,
  MapKeys,
  Permutable,
  Permutation,
  SplitPermutable,
} from './interfaces';

const isObjectLiteral = (obj: any): boolean =>
  obj === Object(obj) && obj.constructor === {}.constructor;

const incrementPermutationCountForValue = (
  currentCount: number,
  value: Array<any>
): number => currentCount * value.length;

const getTotalPermutationCount = (obj: ComplexPermutable): number =>
  Object.values(obj).reduce(incrementPermutationCountForValue, 1);

const permutationFn = (
  key: MapKeys,
  value: any,
  currentPermutations: Permutation[],
  sequenceLength: number
): Permutable[] => {
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
};

const calculateSequenceLength = (
  value: any[],
  previousSequenceLength: number
): number => previousSequenceLength / value.length;

/**
 * "Splits" a permutable object into 2 parts:
 *   1. A simple permutation object containing all simple key-value pairs of the object.
 *   2. A permutable object containing only multi-value array key-value pairs.
 *
 * In this case, "simple" refers to a key-value pair that is either present in every permutation or a
 * key-value pair that is present in no permutation.
 *
 * @param {Permutable} obj - Any permutable object.
 *
 * @returns {SplitPermutable} - The resultant object.
 */
const splitPermutableObject = (obj: Permutable): SplitPermutable => {
  return Object.entries(obj).reduce(
    (current: SplitPermutable, [key, value]) => {
      // Non-arrays are always added as-is to every permutation.
      if (!Array.isArray(value)) {
        return {
          ...current,
          permutation: {...current.permutation, [key]: value},
        };
      }

      // Empty arrays are excluded from permutations.
      if (value.length === 0) {
        return current;
      }

      // Arrays with a single value are always added to every permutation "unwrapped".
      if (value.length === 1) {
        return {
          ...current,
          permutation: {...current.permutation, [key]: value[0]},
        };
      }

      // Arrays with multiple values dictate the number of permutations and therefore are still
      // considered "permutable" as they need to undergo an algorithm.
      return {
        ...current,
        permutable: {...current.permutable, [key]: value},
      } as SplitPermutable;
    },
    {permutation: {}, permutable: {}}
  );
};

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

  const splitPermutable = splitPermutableObject(obj);
  const numPermutations = getTotalPermutationCount(splitPermutable.permutable);

  let sequenceLength: number;

  return Object.entries(splitPermutable.permutable).reduce(
    (currentPermutations: Permutation[], [key, value]) => {
      sequenceLength = calculateSequenceLength(
        value,
        sequenceLength ?? numPermutations
      );
      return permutationFn(key, value, currentPermutations, sequenceLength);
    },
    Array(numPermutations).fill(splitPermutable.permutation)
  );
};
