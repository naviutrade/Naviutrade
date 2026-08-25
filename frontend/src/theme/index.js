import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const navy = {
  900: '#05204F',
  800: '#072B67',
  700: '#0A3681',
  600: '#14479C',
  500: '#1F5BC0',
  400: '#4C82DB',
  300: '#85AAE9',
  200: '#BBD0F4',
  100: '#E3ECFB',
  50: '#F2F6FD',
};
const orange = {
  900: '#7A2C00',
  800: '#A83D00',
  700: '#D24E00',
  600: '#EE5800',
  500: '#FF5F03',
  400: '#FF8038',
  300: '#FFA771',
  200: '#FFCDAE',
  100: '#FFE8DA',
  50: '#FFF4EE',
};

const shelf = { boxShadow: '0 2px 0 0 var(--btn-shelf)' };
const keycap = {
  borderRadius: 'var(--r-control)',
  fontFamily: 'var(--f-body)',
  fontWeight: 600,
  border: '1px solid transparent',
  transition: 'transform 90ms var(--ease), box-shadow 90ms var(--ease), background-color 90ms var(--ease)',
  ...shelf,
  _active: { transform: 'translateY(2px)', boxShadow: 'none' },
  _focusVisible: { outline: '2px solid var(--accent)', outlineOffset: '3px', boxShadow: 'none' },
  _disabled: {
    bg: 'var(--panel-2)',
    color: 'var(--text-3)',
    borderColor: 'var(--border)',
    boxShadow: 'none',
    opacity: 0.75,
  },
};

const theme = extendTheme({
  config,
  colors: {
    navy,
    accent: orange,
    ink: {
      950: '#060B16',
      900: '#0E1729',
      800: '#1C2740',
    },
    rvslate: {
      700: '#33405C',
      600: '#4E5C7A',
      500: '#6B7997',
      400: '#93A0B8',
      300: '#BEC7D8',
      200: '#DDE3EE',
      100: '#EEF1F7',
      50: '#F7F9FC',
    },
  },
  components: {
    Button: {
      variants: {
        rvSolid: {
          ...keycap,
          '--btn-shelf': 'rgba(11,20,36,.28)',
          bg: 'var(--brand)',
          color: 'var(--brand-on)',
          borderColor: 'var(--brand)',
          _hover: { bg: 'var(--brand-hover)', _disabled: { bg: 'var(--panel-2)' } },
        },
        rvPrimary: {
          ...keycap,
          '--btn-shelf': 'rgba(11,20,36,.28)',
          bg: 'var(--brand)',
          color: 'var(--brand-on)',
          borderColor: 'var(--brand)',
          _hover: { bg: 'var(--brand-hover)', _disabled: { bg: 'var(--panel-2)' } },
        },
        rvAccent: {
          ...keycap,
          '--btn-shelf': 'rgba(122,44,0,.42)',
          bg: 'var(--accent)',
          color: 'var(--accent-on)',
          borderColor: 'var(--accent)',
          _hover: { bg: 'var(--accent-hover)', color: 'var(--accent-on)', _disabled: { bg: 'var(--panel-2)' } },
        },
        rvQuiet: {
          ...keycap,
          '--btn-shelf': 'var(--border)',
          bg: 'var(--bg)',
          color: 'var(--text)',
          borderColor: 'var(--control-border)',
          _hover: { bg: 'var(--panel-2)' },
        },
        rvSecondary: {
          ...keycap,
          '--btn-shelf': 'var(--border)',
          bg: 'var(--bg)',
          color: 'var(--text)',
          borderColor: 'var(--control-border)',
          _hover: { bg: 'var(--panel-2)' },
        },
        rvGhost: {
          ...keycap,
          '--btn-shelf': 'transparent',
          boxShadow: 'none',
          bg: 'transparent',
          color: 'var(--text-2)',
          _hover: { bg: 'var(--panel-2)', color: 'var(--text)' },
          _active: { transform: 'none' },
        },
        rvTertiary: {
          ...keycap,
          '--btn-shelf': 'transparent',
          boxShadow: 'none',
          bg: 'transparent',
          color: 'var(--text-2)',
          _hover: { bg: 'var(--panel-2)', color: 'var(--text)' },
          _active: { transform: 'none' },
        },
        rvDanger: {
          ...keycap,
          '--btn-shelf': 'rgba(120,8,26,.42)',
          bg: 'var(--bad)',
          color: '#fff',
          borderColor: 'var(--bad)',
          _hover: { filter: 'brightness(1.08)', _disabled: { bg: 'var(--panel-2)' } },
        },
      },
    },
  },
});

export default theme;
