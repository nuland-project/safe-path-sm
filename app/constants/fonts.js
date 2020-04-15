import { isPlatformiOS } from './../Util';

const fontFamily = {
  primaryBold: 'Helvetica',
  primaryBoldItalic: 'Helvetica',
  primaryExtraLight: 'Helvetica',
  primaryExtraLightItalic: 'Helvetica',
  primaryItalic: 'Helvetica',
  primaryLight: 'Helvetica',
  primaryLightItalic: 'Helvetica',
  primaryMedium: 'Helvetica',
  primaryMediumItalic: 'Helvetica',
  primaryRegular: isPlatformiOS() ? 'Helvetica' : 'Helvetica',
  primarySemiBold: 'Helvetica',
  primarySemiBoldItalic: 'Helvetica',
  primaryThin: 'Helvetica',
  primaryThinItalic: 'Helvetica',
};

export default fontFamily;
