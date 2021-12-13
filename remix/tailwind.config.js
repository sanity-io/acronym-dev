module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-13deg)" },
          "50%": { transform: "rotate(13deg)" }
        }
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out"
      },
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
    require('@tailwindcss/forms'),

  ]
};