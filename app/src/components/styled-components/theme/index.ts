
interface IBorderColors {
  default: string;
  focus: string;
}

export interface ITheme {
  background: string;
  border: IBorderColors;
  shadow: string;
  submit: string;
  text: string;
  invertedText: string;
}

const Theme: ITheme = {
  background: '#eee',
  border: {
    default: '#e6e6e6',
    focus: '#bababa',
  },
  invertedText: '#fafafa',
  shadow: 'rgba(180,180,180,0.3)',
  submit: '#0be881',
  text: '#333',
}

export default Theme;
