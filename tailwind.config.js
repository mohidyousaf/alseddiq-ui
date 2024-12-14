import tailwindLogical from 'tailwindcss-logical';
import corePlugin from './src/@core/tailwind/plugin';
//repdeploy

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'],
  safelist: [
    'text-primary',
    'bg-primary',
    'text-secondary',
    'bg-secondary',
  ],
  
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [tailwindLogical, corePlugin],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#7367F0',
          light: '#8F85F3',
          dark: '#675DD8',
          lighterOpacity: 'rgba(115, 103, 240, 0.08)',
          lightOpacity: 'rgba(115, 103, 240, 0.16)',
          mainOpacity: 'rgba(115, 103, 240, 0.24)',
          darkOpacity: 'rgba(115, 103, 240, 0.32)',
          darkerOpacity: 'rgba(115, 103, 240, 0.38)'
        },
        secondary: {
          main: '#808390',
          light: '#999CA6',
          dark: '#737682',
          contrastText: '#FFF',
          lighterOpacity: 'rgba(128, 131, 144, 0.08)',
          lightOpacity: 'rgba(128, 131, 144, 0.16)',
          mainOpacity: 'rgba(128, 131, 144, 0.24)',
          darkOpacity: 'rgba(128, 131, 144, 0.32)',
          darkerOpacity: 'rgba(128, 131, 144, 0.38)'
        },
        error: {
          main: '#FF4C51',
          light: '#FF7074',
          dark: '#E64449',
          contrastText: '#FFF',
          lighterOpacity: 'rgba(255, 76, 81, 0.08)',
          lightOpacity: 'rgba(255, 76, 81, 0.16)',
          mainOpacity: 'rgba(255, 76, 81, 0.24)',
          darkOpacity: 'rgba(255, 76, 81, 0.32)',
          darkerOpacity: 'rgba(255, 76, 81, 0.38)'
        },
        warning: {
          main: '#FF9F43',
          light: '#FFB269',
          dark: '#E68F3C',
          contrastText: '#FFF',
          lighterOpacity: 'rgba(255, 159, 67, 0.08)',
          lightOpacity: 'rgba(255, 159, 67, 0.16)',
          mainOpacity: 'rgba(255, 159, 67, 0.24)',
          darkOpacity: 'rgba(255, 159, 67, 0.32)',
          darkerOpacity: 'rgba(255, 159, 67, 0.38)'
        },
        info: {
          main: '#00BAD1',
          light: '#33C8DA',
          dark: '#00A7BC',
          contrastText: '#FFF',
          lighterOpacity: 'rgba(0, 186, 209, 0.08)',
          lightOpacity: 'rgba(0, 186, 209, 0.16)',
          mainOpacity: 'rgba(0, 186, 209, 0.24)',
          darkOpacity: 'rgba(0, 186, 209, 0.32)',
          darkerOpacity: 'rgba(0, 186, 209, 0.38)'
        },
        success: {
          main: '#28C76F',
          light: '#53D28C',
          dark: '#24B364',
          contrastText: '#FFF',
          lighterOpacity: 'rgba(40, 199, 111, 0.08)',
          lightOpacity: 'rgba(40, 199, 111, 0.16)',
          mainOpacity: 'rgba(40, 199, 111, 0.24)',
          darkOpacity: 'rgba(40, 199, 111, 0.32)',
          darkerOpacity: 'rgba(40, 199, 111, 0.38)'
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.9)',
          secondary: 'rgba(0, 0, 0, 0.7)',
          disabled: 'rgba(0, 0, 0, 0.4)'
        },
        divider: 'rgba(0, 0, 0, 0.12)',
        background: {
          light: '#FFFFFF',
          default: '#F8F7FA',
          dark: '#25293C',
          paper: '#FFFFFF'
        },
        action: {
          active: 'rgba(0, 0, 0, 0.6)',
          hover: 'rgba(0, 0, 0, 0.06)',
          selected: 'rgba(0, 0, 0, 0.08)',
          disabled: 'rgba(0, 0, 0, 0.3)',
          disabledBackground: 'rgba(0, 0, 0, 0.16)',
          focus: 'rgba(0, 0, 0, 0.1)'
        },
        custom: {
          bodyBg: '#F8F7FA',
          chatBg: '#F3F2F5',
          greyLightBg: '#FAFAFA',
          inputBorder: 'rgba(0, 0, 0, 0.22)',
          tableHeaderBg: '#FFFFFF',
          tooltipText: '#FFFFFF',
          trackBg: '#F1F0F2'
        },
        darkCustom: {
          bodyBg: '#25293C',
          chatBg: '#202534',
          greyLightBg: '#353A52',
          inputBorder: 'rgba(0, 0, 0, 0.22)',
          tableHeaderBg: '#2F3349',
          tooltipText: '#2F3349',
          trackBg: '#3A3F57'
        },
        alert: {
          error: '#FF4C51',
          warning: '#FF9F43',
          info: '#00BAD1',
          success: '#28C76F',
          errorBg: 'rgba(255, 76, 81, 0.16)',
          warningBg: 'rgba(255, 159, 67, 0.16)',
          infoBg: 'rgba(0, 186, 209, 0.16)',
          successBg: 'rgba(40, 199, 111, 0.16)'
        },
        avatar: {
          defaultBg: '#EEEDF0'
        },
        snackbar: {
          bg: '#2F2B3D',
          text: '#FFFFFF'
        },
        switch: {
          default: '#FFFFFF',
          disabled: '#FFFFFF'
        },
        tooltip: {
          bg: '#2F2B3D'
        },
        tableCell: {
          border: 'rgba(0, 0, 0, 0.12)'
        }
      }
    }
  }
}

export default config;
