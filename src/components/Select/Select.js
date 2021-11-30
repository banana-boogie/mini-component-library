import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import Icon from '../Icon';
import { getDisplayedValue } from './Select.helpers';

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>

      <PresentationalSelect>
        {displayedValue}
        <IconWrapper style={{ '--size': 24 + 'px' }}>
          <Icon id="chevron-down" size="24" />
        </IconWrapper>
      </PresentationalSelect>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: max-content;
`;

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

/**
 * The idea behind presentational select is to keep the features from the native
 * select but allow custom styling by hiding the native select and doing our styling on top
 */
const PresentationalSelect = styled.div`
  background-color: ${COLORS.transparentGray15};
  padding: 12px 16px;
  padding-right: 52px;
  font-size: ${16 / 16}rem;
  color: ${COLORS.gray700};
  border-radius: 8px;
  border: none;

  /*
  The + sign is a sibling selector, meaning target 
  the element right beside it.
  */
  ${NativeSelect}:focus + & {
    /*
     The select loses it's focus ring because opacity is set to 0;
    */
    outline: 1px solid blue;
    outline: 5px auto -webkit-focus-ring-auto;
  }
  /**
   * This means that when you hover over the native select, the presentational select will be targeted
   * and the color will be applied.
   */
  ${NativeSelect}:hover + & {
    color: black;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  /**
   * The icon size is not actually 24px, on inspection you'll see the container for the icon 
   * sits in a 24px box. Centering the icon leaves 6px on each side as padding so the
   * icon needs to shift over by 10px to match the 16px padding from the design.
   */
  right: 10px;
  margin: auto;
  height: var(--size);
  width: var(--size);
  /* This pointer-events var ignores all clicks which means that the click will fallback 
   * to the select.
  */
  pointer-events: none;
`;

export default Select;
