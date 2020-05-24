import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Tooltip } from '../../ui';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

export const SummaryItem = ({
  className,
  size,
  id,
  data,
  loading,
  showDelta,
  showMetricDescription,
  inline,
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getGlobalMetricType(id);
  const runInfo = getMetricRunInfo(metric, current, baseline);
  const showMetricDescriptionTooltip = showMetricDescription && metric?.description;

  const rootClassName = cx(
    css.root,
    className,
    css[size],
    inline && css.inline,
    showMetricDescriptionTooltip && css.showMetricDescription,
  );

  return (
    <div className={rootClassName}>
      <Tooltip
        as="h3"
        className={css.title}
        title={
          showMetricDescriptionTooltip && (
            <div className={css.helpTooltip}>
              <h4 className={css.helpTooltipTitle}>{metric.label}</h4>
              <p className={css.helpTooltipDescription}>{metric.description}</p>
            </div>
          )
        }
      >
        {metric.label}
      </Tooltip>

      {!loading ? (
        <Metric
          className={css.currentMetric}
          value={current}
          formatter={metric.formatter}
        />
      ) : (
        <span className={cx(css.currentMetric, css.loading)} />
      )}

      {!loading ? (
        showDelta && (
          <Delta
            className={css.delta}
            displayValue={runInfo.displayDeltaPercentage}
            deltaType={runInfo.deltaType}
          />
        )
      ) : (
        <span className={cx(css.delta, css.loading)} />
      )}
    </div>
  );
};

SummaryItem.defaultProps = {
  className: '',
  data: null,
  size: 'medium',
  loading: false,
  showMetricDescription: false,
  showDelta: true,
  inline: false,
};

SummaryItem.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Size modifier */
  size: PropTypes.oneOf(['medium', 'large']),

  /** Metric id */
  id: PropTypes.string.isRequired,

  /** Loading flag */
  loading: PropTypes.bool,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Show description */
  showMetricDescription: PropTypes.bool,

  /** Show delta */
  showDelta: PropTypes.bool,

  /** Inline flag */
  inline: PropTypes.bool,
};
