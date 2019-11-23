import { get, merge, set } from 'lodash';

import { SOURCE_PATHS } from '../config';
import { createSummary } from './create-summary';
import * as webpack from '../webpack';

const SOURCE_FNS = { webpack };
const GENERIC_PROPS = ['meta', 'warnings', 'metrics'];

/*
 * Create job from stats
 */
export const createJob = (source, baseline) => SOURCE_PATHS.reduce((agg, sourcePath) => {
  const rawData = get(source, sourcePath);

  if (!rawData) {
    return agg;
  }

  const sourceModule = SOURCE_FNS[sourcePath];

  if (!sourceModule) {
    return agg;
  }

  const extractedData = sourceModule.extract(rawData, baseline);
  const summary = createSummary(
    SOURCE_FNS[sourcePath].SUMMARY_METRIC_PATHS,
    get(baseline, `metrics.${sourcePath}`, {}),
    get(extractedData, 'metrics', {}),
  );

  return merge(
    {},
    agg,
    { rawData: set({}, sourcePath, rawData) },
    { summary: set({}, sourcePath, summary) },
    ...GENERIC_PROPS.map((genericPropName) => ({
      [genericPropName]: set({}, sourcePath, extractedData[genericPropName]),
    })),
  );
}, {});
