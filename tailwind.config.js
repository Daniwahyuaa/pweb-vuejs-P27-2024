/** @type {import('tailwindcss').Config} */
export default {
  // Konfigurasi yang perlu ditambahkan:
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // notes: sesuaikan file path dengan kebutuhan kalian dan pastikan file path-nya benar
  theme: {
    extend: {
      colors: {
        navy: "#2F4156",
        teal: "#567C8D",
        sky: "#C8D9E6",
        beige: "#F5EFEB",
        },
        fontFamily: {
          DEFAULT: ["Poppins", "sans-serif"],
          playfair: ["Playfair Display", "serif"],
        },
    },
  },
  plugins: [],
};
