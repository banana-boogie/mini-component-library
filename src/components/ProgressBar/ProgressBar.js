/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const STYLES = {
  large: {
    height: '16',
    padding: '4',
    borderRadius: '8',
  },
  medium: {
    height: '12',
    padding: 0,
    borderRadius: '4',
  },
  small: {
    height: '8',
    padding: 0,
    borderRadius: '4',
  },
};
const ProgressBar = ({ value, size }) => {
  const styles = STYLES[size];

  if (!styles) {
    throw new Error('Missing styles');
  }

  return (
    <Wrapper
      style={{
        '--padding': styles.padding + 'px',
        '--borderRadius': styles.borderRadius + 'px',
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <BarWrapper>
        <Progress
          style={{ '--width': value + '%', '--height': styles.height + 'px' }}
          value={value}
        />
      </BarWrapper>
      <VisuallyHidden>{value}%</VisuallyHidden>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: 0px 2px 4px 0px ${COLORS.transparentGray35} inset;
  padding: var(--padding);
  border-radius: var(--borderRadius);
`;

const BarWrapper = styled.div`
  /* Trim off corners when progress is almost at 100 */
  overflow: hidden;
  border-radius: 4px;
`;

const Progress = styled.div`
  background-color: ${COLORS.primary};
  height: var(--height);
  width: var(--width);
  border-radius: 4px 0 0 4px;
`;

export default ProgressBar;
