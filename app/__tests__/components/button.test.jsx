import React from 'react';
import { shallow, mount } from 'enzyme';

import Button, {
    StyledSpinner,
    StyledButton,
    Paddings,
    FontSizes,
    SpinnerPositions,
    getBackgroundColor,
    getTextColor,
    getPadding,
    getFontSize,
    getSpinnerPosition,
} from 'app/components/button';
import Theme from 'app/components/styleguide/theme';

let handleClick, wrapper;

describe('Button', () => {

// BUTTON RENDERS

    it('should render Button', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render StyledSpinner', () => {
        const wrapper = shallow(<StyledSpinner />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render StyledButton', () => {
        const wrapper = shallow(<StyledButton alignWith="left" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render loading Button', () => {
        const LoadingButton = shallow(<Button text="Hola!" loading={true} />);
        expect(LoadingButton.prop('disabled')).toBe(true);
    });

    it('should render Button with text', () => {
        const wrapper = shallow(<Button text="click me!" />);
        expect(wrapper).toMatchSnapshot();
    });
    

// BUTTON BACKGROUND COLOR

    it('should get background color for appearance `submit`', () => {
        const color = getBackgroundColor(Theme, 'submit');
        expect(color).toBe(Theme.submit);
    });

    it('should get background color for appearance `info`', () => {
        const color = getBackgroundColor(Theme, 'info');
        expect(color).toBe(Theme.info);
    });

    it('should get background color for appearance `neutral`', () => {
        const color = getBackgroundColor(Theme, 'neutral');
        expect(color).toBe(Theme.textDisabled);
    });

    it('should get background color for appearance `warning`', () => {
        const color = getBackgroundColor(Theme, 'warning');
        expect(color).toBe(Theme.errorDark);
    });

    it('should get background color for default appearance', () => {
        const color = getBackgroundColor(Theme);
        expect(color).toBe('transparent');
    });

// BUTTON FONT COLOR

    it('should get text color for appearance `submit`', () => {
        const color = getTextColor(Theme, 'submit');
        expect(color).toBe(Theme.invertedText);
    });

    it('should get text color for appearance `info`', () => {
        const color = getTextColor(Theme, 'info');
        expect(color).toBe(Theme.invertedText);
    });

    it('should get text color for appearance `neutral`', () => {
        const color = getTextColor(Theme, 'neutral');
        expect(color).toBe(Theme.invertedText);
    });

    it('should get text color for appearance `warning`', () => {
        const color = getTextColor(Theme, 'warning');
        expect(color).toBe(Theme.invertedText);
    });

    it('should get text color for default appearance', () => {
        const color = getTextColor(Theme);
        expect(color).toBe(Theme.text);
    });

// BUTTON PADDING

    it('should get padding for buttonSize `default`', () => {
        const padding = getPadding('default');
        expect(padding).toBe(Paddings.default);
    });

    it('should get padding for empty buttonSize', () => {
        const padding = getPadding();
        expect(padding).toBe(Paddings.default);
    });

    it('should get padding for buttonSize `mini`', () => {
        const padding = getPadding('mini');
        expect(padding).toBe(Paddings.mini);
    });

// BUTTON FONT-SIZE

    it('should get font-size for buttonSize `big`', () => {
        const fontSize = getFontSize('big');
        expect(fontSize).toBe(FontSizes.big);
    });

    it('should get font-size for buttonSize `mini`', () => {
        const fontSize = getFontSize('mini');
        expect(fontSize).toBe(FontSizes.mini);
    });

    it('should get font-size for buttonSize `default`', () => {
        const fontSize = getFontSize('default');
        expect(fontSize).toBe(FontSizes.default);
    });

    it('should get font-size for empty buttonSize', () => {
        const fontSize = getFontSize();
        expect(fontSize).toBe(FontSizes.default);
    });

// BUTTON SPINNER POSITION

    it('should get spinner position for buttonSize `mini`', () => {
        const position = getSpinnerPosition('mini');
        expect(position).toBe(SpinnerPositions.mini);
    });

    it('should get spinner position for buttonSize `default`', () => {
        const position = getSpinnerPosition('default');
        expect(position).toBe(SpinnerPositions.default);
    });

    it('should get spinner position for empty buttonSize', () => {
        const position = getSpinnerPosition();
        expect(position).toBe(SpinnerPositions.default);
    });

// BUTTON ONCLICK
    
    it('should run onClick', () => {
        const handleClick = jest.fn();
        const wrapper = shallow(<Button onClick={handleClick} />);
        wrapper.simulate('click');
        expect(handleClick).toHaveBeenCalled();
    });
});
