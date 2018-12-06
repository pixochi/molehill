import React, { LabelHTMLAttributes } from 'react';

import styled, { css } from 'app/components/styleguide';
import { s2 } from 'app/components/styleguide/spacing';

import { Flex } from 'app/components/styleguide/layout';
import { Body, BaseProps } from 'app/components/styleguide/text';

const checboxCSS = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 50%;
`;

export const CheckboxContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
`;

export const VisualCheckbox = styled.div<{checked: boolean}>`
  ${checboxCSS}

  z-index: 1;
  border: 2px solid ${props => props.theme.border.default};
  background: ${props => props.theme.invertedText};

  ${props => props.checked && css`
    &:after {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      background: ${props => props.theme.info};
      border-radius: 50%;
      margin: 0 auto;
      margin-top: 5px;
    }
  `}

`;

export const ActualCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  ${checboxCSS}

  z-index: 2;
  opacity: 0;
  width: 30px;
  height: 30px;
`;

const Lable = styled(Body)<LabelHTMLAttributes<any> & BaseProps>`

`;

export interface ICheckboxProps {
  id: string;
  value: any;
  name?: string;
  label?: string;
}

const Checkbox: React.SFC<ICheckboxProps> = (props) => {

  const {
    name,
    label,
    id,
    value,
    ...rest
  } = props;

  return (
    <Flex align="center">
      <CheckboxContainer>
        <ActualCheckbox name={name} id={id} value={value} checked={value} {...rest} />
        <VisualCheckbox checked={value} />
      </CheckboxContainer>
      {label && (
        <Lable marginLeft={s2} clickable as="label" htmlFor={id}>{label}</Lable>
      )}
    </Flex>
  );
};

export default Checkbox;
