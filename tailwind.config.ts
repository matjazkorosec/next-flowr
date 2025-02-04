import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        base: {
          '0': '#ffffff',
          '5': '#f2f2f2',
          '12': '#e0e0e0',
          '25': '#bdbdbd',
          '50': '#828282',
          '75': '#4f4f4f',
          '100': '#000000',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        primaryLight: '#d3b9df',
        primaryFaded: '#ece1f1',
        warning: '#f4bd50',
        error: '#f45050',
        gray: {
          '25': '#f5f6f7',
          '50': '#dfe5ea',
          '75': '#949ea0',
          '90': '#334144',
        },
        peach: {
          '25': '#ecbcb3',
          '50': '#eaa79e',
          '75': '#df9186',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        ubuntu: ['Ubuntu', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        '2xs': [
          '10px',
          {
            lineHeight: '12px',
          },
        ],
      },
      backgroundImage: {
        'shoot-gradient': 'linear-gradient(270deg, #ecbcb3 0%, #eaa79e 100%)',
        'shoot-gradient-hover':
          'linear-gradient(270deg, #e8ada2 0%, #e6988e 100%)',
        'photo-shade':
          'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 89.5%)',
      },
      boxShadow: {
        header: '0 15px 30px rgba(0, 0, 0, 0.05)',
        'shoot-gradient': '0 15px 20px 0 rgba(234, 168, 159, 0.2)',
        'search-input': 'inset 0 4px 12px rgba(0, 0, 0, 0.3)',
        star: '0 5px 15px 0 rgba(0, 0, 0, .1)',
      },
      screens: {
        xs: '320px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: '3px',
      },
    },
  },
  // eslint-disable-next-line
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
