module.exports = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "2rem",
          sm: "1rem",
          lg: "6rem",
          xl: "8rem",
          "2xl": "10rem",
        },
        center: true,
      },
      maxWidth: { "7xl": "80rem" },
      fontFamily: {
        custom: ["Rethink Sans", "sans-serif"],
      },
    },
  },
};
