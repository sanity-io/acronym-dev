module.exports = {
  mode: "jit",
  purge: ["./app/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'serif'],
        // sans: ['verdana', 'sans-serif'],
        // serif: ['garamond', 'sans-serif'],
      },
      /* typography: {
        DEFAULT: {
          css: {
            color: '#FFF'
          },
        },
      } */
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ]
};