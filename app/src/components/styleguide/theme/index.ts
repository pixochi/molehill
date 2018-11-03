
interface IBorderColors {
  default: string;
  focus: string;
}

export interface ITheme {
  background: string;
  border: IBorderColors;
  shadow: string;
  shadowStrong: string;
  submit: string;
  text: string;
  textDisabled: string;
  invertedText: string;
  error: string;
  info: string;
}

const Theme: ITheme = {
  background: '#eee',
  border: {
    default: '#e6e6e6',
    focus: '#bababa',
  },
  invertedText: '#fafafa',
  shadow: 'rgba(180,180,180,0.3)',
  shadowStrong: 'rgba(50,50,50,0.7)',
  submit: '#0be881',
  text: '#333',
  textDisabled: 'rgba(120,120,120,0.70)',
  error: '#ff7676',
  info: '#5994df',
};

export default Theme;
