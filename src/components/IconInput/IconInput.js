import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';

const STYLES = {
  // these numbers use an implcit grid - all spacing is multiple of 4 pixels
  // if you use these multiples of 4 - you ensure there is a consistent overall look.
  small: {
    fontSize: 14,
    iconSize: 16,
    height: 24,
    borderThickness: 1,
  },
  large: {
    fontSize: 18,
    iconSize: 24,
    height: 36,
    borderThickness: 2,
  },
};

// NOTE: delegated is used to note that these fields are delegated to wherever they're used
const IconInput = ({ label, icon, width = 250, size, ...delegated }) => {
  const styles = STYLES[size];

  if (!styles) {
    throw new Error(
      `The size: ${size} you have selected does not exist on this component`
    );
  }

  return (
    <Wrapper>
      <VisuallyHidden>{label}</VisuallyHidden>
      <IconWrapper style={{ '--size': styles.iconSize + 'px' }}>
        <Icon id={icon} size={styles.iconSize}></Icon>
      </IconWrapper>
      <TextInput
        {...delegated}
        style={{
          '--width': width + 'px',
          '--height': styles.height / 16 + 'rem',
          '--fontSize': styles.fontSize / 16 + 'rem',
          '--borderThickness': styles.borderThickness + 'px',
        }}
      ></TextInput>
    </Wrapper>
  );
};

// Normally we want to wrap inputs using a label
// Label will set the focus on the input,
// if you click on the label - focus will direct to the input.
// The container will grow as it needs - thanks to block display.
const Wrapper = styled.label`
  display: block;
  position: relative; // used because we want to position the icon within this wrapper
  color: ${COLORS.gray700}; // this is used so that the children inherit the colors - like the icon

  &:hover {
    color: ${COLORS.black};
  }
`;

const TextInput = styled.input`
  // normally we use px, but in this case we want the input box to scale with the text inside
  height: var(--height);
  width: var(--width);
  border: none;
  border-bottom: var(--borderThickness) ${COLORS.black} solid;
  padding-left: var(
    --height
  ); // we want the icon to take up a square - so it's the same as the height
  color: inherit;
  font-weight: 700;
  font-size: var(--fontSize);

  &::placeholder {
    color: ${COLORS.gray500};
    font-weight: 400;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: var(--size);
  width: var(--size);
`;
export default IconInput;
