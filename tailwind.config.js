module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      colors: {
        primary: "#0A5438",
        light: "#638B68",
        lighter: "#EBFFF1",
        pop: "#0007",
        initial: "#F2FEFA",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      spacing: {
        1: "4px",
      },
      backgroundImage: {
        homeimage: "url('../src/assets/homeimage.png')",
      },
      screens: {
        tall: { raw: "(min-height: 600px)" },
        // => @media (min-height: 800px) { ... }

        "4xl": "1950px",
      },
    },
  },
};
