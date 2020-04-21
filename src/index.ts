import {
  Permutable,
  PermutableArray,
  PermutableArrayValue,
  Permutation,
  PermutationArray,
  PermutationArrayValue,
} from './interfaces';
import * as CartesianProductGenerator from 'power-cartesian-product';

const isObjectLiteral = (obj: any): boolean =>
  obj === Object(obj) && obj.constructor === {}.constructor;

const isNotEmptyArrayValue = ([, value]: PermutableArrayValue): boolean =>
  !Array.isArray(value) || value.length > 0;

/**
 * Maps a permutable object into a permutable array.
 *
 * Examples:
 *    {key: value} => [key, value]
 *
 * @param {Permutable} obj - The input object.
 *
 * @returns {PermutableArray} - The output array.
 */
const getPermutableArray = (obj: Permutable): PermutableArray =>
  Object.keys(obj).map(key => [key, obj[key]]);

/**
 * Returns the cartesian product (array of arrays) of a permutable array value.
 *
 * Examples:
 *   ['color', 'red'] => [['color', 'red']]
 *   ['color', ['red']] => [['color', 'red']]
 *   ['color', ['red', 'blue']] => [['color', 'red'], ['color', 'blue']]
 *
 * @param {PermutableArrayValue} - Input value destructured into key/value.
 *
 * @returns {PermutationArrayValue} - Permuted cartesian product array.
 */
const permutableArrayValueCartesianProduct = ([
  key,
  value,
]: PermutableArrayValue): PermutationArrayValue => {
  if (!Array.isArray(value)) {
    value = [value];
  }

  return value.map(val => [key, val]);
};

/**
 * Returns a generator that produces cartesian product values of the provided permutable object.
 *
 * Examples:
 *    {size: ['l', 'xl'], color: 'red'} => [[['size', 'l'], ['color', 'red']], [['size', 'xl'], ['color', 'red']]]
 *
 * @param {Permutable} obj - A permutable object.
 *
 * @returns {Generator<PermutationArray>} - Generator that produces cartesian products of the object in array form.
 */
const getCartesianProductGenerator = (
  obj: Permutable
): Generator<PermutationArray> =>
  new CartesianProductGenerator(
    getPermutableArray(obj)
      .filter(isNotEmptyArrayValue)
      .map(permutableArrayValueCartesianProduct)
  );

/**
 * Reduces a permutation array into a permutation object.
 *
 * Examples:
 *    [['color', 'red'], ['size', 'large'], ['price', 300]] => {color: 'red', size: 'large', price: 300}
 *
 * @param {PermutationArray} permutationArray - Permutation in array form.
 *
 * @returns {Permutation} - The permutation in object form.
 */
const reducePermutationArrayToPermutationObj = (
  permutationArray: PermutationArray
): Permutation =>
  permutationArray.reduce(
    (permutation: Permutation, [key, value]: PermutationArrayValue) => ({
      ...permutation,
      [key]: value,
    }),
    {}
  );

/**
 * Returns an iterable generator of all permutations for the provided permutable object.
 *
 * @param {Permutable} obj - The object to permute.
 *
 * @returns {Generator} - A generator that when iterated will return each permutation.
 */
export function* generatePermutations(obj: Permutable): Generator<Permutation> {
  if (!isObjectLiteral(obj)) {
    throw new Error(`Invalid argument ${typeof obj}`);
  }

  for (const arrayPermutation of getCartesianProductGenerator(obj)) {
    yield reducePermutationArrayToPermutationObj(arrayPermutation);
  }
}

/**
 * Returns an array of all permutations for the provided permutable object.
 *
 * @param {Permutable} obj - The object to permute.
 *
 * @returns {Permutation[]} - An array of all permutations.
 */
export const getPermutations = (obj: Permutable): Permutation[] => [
  ...generatePermutations(obj),
];
