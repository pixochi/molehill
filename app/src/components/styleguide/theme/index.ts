
interface IBorderColors {
  default: string;
  focus: string;
}

export interface ITheme {
  primary: string;
  background: string;
  border: IBorderColors;
  shadow: string;
  shadowStrong: string;
  submit: string;
  submitLight: string;
  submitDark: string;
  text: string;
  textDisabled: string;
  invertedText: string;
  error: string;
  errorLight: string;
  errorDark: string;
  info: string;
}

const Theme: ITheme = {
  primary: '#14c505',
  background: '#fcfcfc',
  border: {
    default: '#e6e6e6',
    focus: '#bababa',
  },
  invertedText: '#fefefe',
  shadow: 'rgba(180,180,180,0.3)',
  shadowStrong: 'rgba(50,50,50,0.7)',
  submit: '#14c505',
  submitLight: '#58d52c',
  submitDark: '#0b9100',
  text: '#333',
  textDisabled: 'rgba(120,120,120,0.70)',
  error: '#ca3232',
  errorLight: '#ff004b',
  errorDark: '#c80f0f',
  info: '#5994df',
};

export default Theme;
