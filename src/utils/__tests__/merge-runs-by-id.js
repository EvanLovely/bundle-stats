/* env jest/globals */
import mergeRunsById from '../merge-runs-by-id';

test('Merge runs by id', () => {
  const actual = mergeRunsById([
    {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'd',
    },
    {
      1: 'aa',
      2: 'bb',
      3: 'cc',
      5: 'ee',
      7: 'gg',
    },
    {
      1: 'aaa',
      2: 'bbb',
      3: 'ccc',
      6: 'fff',
      7: 'ggg',
    },
  ]);

  const expected = {
    1: {
      runs: ['a', 'aa', 'aaa'],
    },
    2: {
      runs: ['b', 'bb', 'bbb'],
    },
    3: {
      runs: ['c', 'cc', 'ccc'],
    },
    4: {
      runs: ['d', null, null],
    },
    5: {
      runs: [null, 'ee', null],
    },
    6: {
      runs: [null, null, 'fff'],
    },
    7: {
      runs: [null, 'gg', 'ggg'],
    },
  };

  expect(actual).toEqual(expected);
});