import { omit } from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { createGetMetricType } from '../metrics';

import { metrics } from '../../webpack/metrics';

describe('getMetricType', () => {
  test('should return metric', () => {
    expect(omit(createGetMetricType(metrics)('totalSizeByTypeALL'), ['formatter'])).toEqual(
      omit(
        {
          label: 'Bundle Size',
          description: 'Sum of all assets.',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );

    expect(omit(createGetMetricType(metrics)('sizes.totalSizeByTypeJS'), ['formatter'])).toEqual(
      omit(
        {
          label: 'JS',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );
  });

  test('should return fallback metric for partial matches', () => {
    expect(
      omit(createGetMetricType(metrics)('sizes', METRIC_TYPE_FILE_SIZE), ['formatter']),
    ).toEqual(
      omit(
        {
          label: 'sizes',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );
  });

  test('should return fallback metric', () => {
    expect(
      omit(createGetMetricType(metrics)('/assets/main.js', METRIC_TYPE_FILE_SIZE), ['formatter']),
    ).toEqual(
      omit(
        {
          label: '/assets/main.js',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );
  });
});
