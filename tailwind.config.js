/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F1EB',
          200: '#EBE5DC',
          300: '#DDD4C7',
          400: '#C9BBAA',
          500: '#B09E8A',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E3EBE3',
          200: '#C6D6C6',
          300: '#9FB9A0',
          400: '#759A77',
          500: '#557B57',
          600: '#426244',
          700: '#344C36',
          800: '#2A3C2C',
        },
        terracotta: {
          50: '#FAF4F0',
          100: '#F3E5DC',
          200: '#E7C7B5',
          300: '#D7A287',
          400: '#C27A59',
          500: '#A65A36',
          600: '#8A4526',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F8F4EC',
          200: '#F0E8D9',
          300: '#E5D8C0',
          400: '#D5C2A0',
        },
        clay: {
          700: '#4A3E39',
          800: '#362C27',
          900: '#241D1A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(85, 123, 87, 0.06), 0 2px 6px -1px rgba(54, 44, 39, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(85, 123, 87, 0.08), 0 4px 12px -2px rgba(54, 44, 39, 0.05)',
        'soft-xl': '0 20px 40px -6px rgba(85, 123, 87, 0.1), 0 8px 16px -3px rgba(54, 44, 39, 0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
