import { blue, grey, red, yellow } from '@material-ui/core/colors';

export function hexToRgbA(hex: string, opacity = 1): string {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
  }
  throw new Error('Bad Hex');
}

export const STATUS_COLOR = {
  CONFIRMED: red[600],
  DEATHS: grey[800],
  DEATHS_CHART: grey[700],
  RECOVERED: yellow[500],
  HOSPITALIZED: blue['A400'],
  NEW_CONFIRMED: red[400],
  NEW_RECOVERED: yellow[300],
};
