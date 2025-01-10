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
      colors: {
        // 'Flat UI palette v1' https://flatuicolors.com/palette/defo
        turquoise: "##1abc9c",
        emerald: "#2ecc71",
        greenSea: "#16a085",
        nephritis: "#27ae60",
        peterRiver: "#3498db",
        belizeHole: "#2980b9",
        amethyst: "#9b59b6",
        wisteria: "#8e44ad",
        sunflower: "#f1c40f",
        carrot: "#e67e22",
        alizarin: "#e74c3c",
        orange: "#f39c12",
        pumpkin: "#d35400",
        pomegranate: "#c0392b",
        clouds: "#ecf0f1",
        concrete: "#95a5a6",
        silver: "#bdc3c7",
        asbestos: "#7f8c8d",
        midnightBlue: "#2c3e50",
        wetAsphalt: "#34495e",
      },
    },
  },
};
