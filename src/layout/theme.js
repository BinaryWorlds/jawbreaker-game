import colors from './colors';
import fonts from './fonts';

const theme = {
  colors,
  fonts,
  mq: {
    phone: `@media (max-width:599px) and (orientation: portrait), (max-height:599px) and (orientation: landscape)`,
    phoneP: `@media (max-width:599px) and (orientation: portrait)`,
    phoneL: `@media (max-height:599px) and (orientation: landscape)`,
    portrait: `@media (orientation: portrait)`,
    landscape: `@media (orientation: landscape)`,
  },
};

export default theme;
