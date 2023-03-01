/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'msm': '350px',
        'xsm': { 'min': '350px', 'max': '639px' },
      },
      width: {
        '18': '4.5rem',
      },
      height: {
        '18': '4.5rem',
        '100': '28rem'
      },
      borderWidth: {
        DEFAULT: '1px',
        '1': '1px',
      },
      backgroundImage: {
        'logo': "url('/assets/images/logo.svg')",
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))'
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      },
      keyframes: {
        raise: {
          'from': { width: '12rem', height: 0 },
          'to': { width: '12rem', height: '8rem' },
        },
        turn: {
          '0%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        textInput: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, -3%)' },
        },
        textInputReverse: {
          '0%': { transform: 'translate(10px, -75%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        fade: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        fadeOut: {
          'from': { opacity: 1 },
          'to': { opacity: 0 },
        },
        bottomLeftToTopRight: {
          'from': { width: 0, height: 0 },
          'to': { width: '8rem', height: '2.75rem' },
        },
        loading: {
          '0%': { left: '-3.2%', top: '-12.5%' },
          '25%': { left: '96%', top: '-12.5%' },
          '50%': { left: '96%', top: '85.5%' },
          '75%': { left: '-3.2%', top: '85.5%' },
          '100%': { left: '-3.2%', top: '-12.5%' },
        },
        loadingMd: {
          '0%': { left: '-5.5%', top: '-15%' },
          '25%': { left: '95.5%', top: '-15%' },
          '50%': { left: '95.5%', top: '85.5%' },
          '75%': { left: '-5.5%', top: '85.5%' },
          '100%': { left: '-5.5%', top: '-15%' },
        },
        shrink: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.25)' },
          '100%': { visibility: 'invisible' },
        },
        raiseHeight: {
          'from': { height: 0 },
          'to': { height: 'auto' }
        },
        growWidth: {
          'from': { width: 0 },
          'to': { width: '48px' },
        },
        leftToRight: {
          'from': { left: 0 },
          'to': { left: '28px' },
        },
        rightToLeft: {
          'from': { left: '28px' },
          'to': { left: 0 },
        },
        slideDown: {
          'from': { top: '-300px', opacity: 0 },
          'to': { top: '80px', opacity: 1 },
        },
        slideTop: {
          'from': { top: '80px', opacity: 1 },
          'to': { top: '-300px', opacity: 0 },
        },
        slideTopSelect: {
          'from': { bottom: '-24rem', opacity: 0 },
          'to': { bottom: 48, opacity: 1 },
        },
        slideDownSelect: {
          'from': { bottom: 48, opacity: 1 },
          'to': { bottom: '-24rem', opacity: 0 },
        },
        slideFromLeft: {
          from: { right: '-100%' },
          to: { right: 32 },
        },
      },
      animation: {
        raise: 'raise 0.3s ease-in-out',
        turn: 'turn 0.3s ease-in-out',
        textInput: 'textInput 0.3s ease-in-out',
        textInputReverse: 'textInputReverse 0.3s ease-in-out',
        fade: 'fade 0.3s ease-in-out',
        fadeOut: 'fadeOut 1s ease-in-out',
        bottomLeftToTopRight: 'bottomLeftToTopRight 4.3s ease-in-out',
        loading: 'loading 5s ease-in-out infinite',
        loadingMd: 'loadingMd 5s ease-in-out infinite',
        shrink: 'shrink 2s ease-in-out',
        raiseHeight: 'raiseHeight 2s ease-in-out',
        leftToRight: 'leftToRight 0.3s linear',
        rightToLeft: 'rightToLeft 7s linear',
        growWidth: 'growWidth 7s linear',
        slideDown: 'slideDown 0.4s ease-out',
        slideTop: 'slideTop 0.4s ease-out',
        slideTopSelect: 'slideTopSelect 0.15s linear',
        slideDownSelect: 'slideDownSelect 0.15s linear',
        slideFromLeft: 'slideFromLeft 1s linear',
      },
      boxShadow: {
        'custom': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'button': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionProperty: {
        'height': 'height',
      },

    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}